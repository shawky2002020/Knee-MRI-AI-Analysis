import { db } from "../config/serverConfig.mjs";

function getNestedValue(obj, path) {
  if (!obj || !path) return undefined;
  const parts = path.split(".");
  let current = obj;
  for (const part of parts) {
    current = current ? current[part] : undefined;
  }
  return current;
}

export class QueryBuilder {
  constructor(ref, filter = {}, modelClass) {
    this.ref = ref;
    this.filter = filter;
    this.modelClass = modelClass;
    this._select = null;
    this._sort = null;
    this._limit = null;
    this._skip = null;
    this._lean = false;
  }

  select(fields) {
    this._select = fields;
    return this;
  }

  sort(sortObj) {
    this._sort = sortObj;
    return this;
  }

  limit(num) {
    this._limit = num;
    return this;
  }

  skip(num) {
    this._skip = num;
    return this;
  }

  lean() {
    this._lean = true;
    return this;
  }

  async then(onfulfilled, onrejected) {
    try {
      const snapshot = await this.ref.once("value");
      let results = [];
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (const key of Object.keys(data)) {
          const item = { id: key, _id: key, ...data[key] };
          let match = true;
          // Apply simple filter logic
          for (const [fKey, fVal] of Object.entries(this.filter)) {
            const itemVal = getNestedValue(item, fKey);
            if (fVal && fVal.$regex) {
              const regex = new RegExp(fVal.$regex, fVal.$options || '');
              if (!regex.test(itemVal)) {
                match = false;
                break;
              }
            } else if (fVal && (fVal.$gte || fVal.$lte || fVal.$gt || fVal.$lt)) {
              const val = new Date(itemVal);
              if (fVal.$gte && val < new Date(fVal.$gte)) { match = false; break; }
              if (fVal.$lte && val > new Date(fVal.$lte)) { match = false; break; }
              if (fVal.$gt && val <= new Date(fVal.$gt)) { match = false; break; }
              if (fVal.$lt && val >= new Date(fVal.$lt)) { match = false; break; }
            } else {
              const checkVal = fVal ? fVal.toString() : null;
              const currentVal = itemVal ? itemVal.toString() : null;
              if (currentVal !== checkVal) {
                match = false;
                break;
              }
            }
          }
          if (match) {
            results.push(item);
          }
        }
      }

      // Apply sorting
      if (this._sort) {
        const sortKeys = Object.keys(this._sort);
        results.sort((a, b) => {
          for (const key of sortKeys) {
            const dir = this._sort[key];
            const valA = a[key];
            const valB = b[key];
            if (valA < valB) return dir === -1 ? 1 : -1;
            if (valA > valB) return dir === -1 ? -1 : 1;
          }
          return 0;
        });
      }

      // Apply skip & limit
      if (this._skip) {
        results = results.slice(this._skip);
      }
      if (this._limit) {
        results = results.slice(0, this._limit);
      }

      // Map to model class unless lean() is set
      if (!this._lean && this.modelClass) {
        results = results.map(item => new this.modelClass(item));
      }

      return onfulfilled(results);
    } catch (err) {
      if (onrejected) return onrejected(err);
      throw err;
    }
  }
}

export class SingleQueryBuilder extends QueryBuilder {
  async then(onfulfilled, onrejected) {
    try {
      return await super.then(results => {
        const result = results.length > 0 ? results[0] : null;
        return onfulfilled(result);
      }, onrejected);
    } catch (err) {
      if (onrejected) return onrejected(err);
      throw err;
    }
  }
}

