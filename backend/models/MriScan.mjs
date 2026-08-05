import { db } from "../config/serverConfig.mjs";
import { QueryBuilder, SingleQueryBuilder } from "../utils/firebaseModel.mjs";

function getNestedValue(obj, path) {
  if (!obj || !path) return undefined;
  const parts = path.split(".");
  let current = obj;
  for (const part of parts) {
    current = current ? current[part] : undefined;
  }
  return current;
}

class MriScan {
  constructor(data) {
    this.id = data.id || data._id || null;
    this.userId = data.userId ? data.userId.toString() : null;
    this.metadata = data.metadata || { name: "", age: 0, gender: "", viewed: false };
    this.result = data.result || { status: "", acl_prob: 0, meniscus_prob: 0 };
    this.mri_scan = data.mri_scan || "";
    this.heat_map = data.heat_map || "";
    this.report = data.report || "";
    this.createdAt = data.createdAt ? new Date(data.createdAt).toISOString() : new Date().toISOString();
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt).toISOString() : new Date().toISOString();
  }

  get _id() {
    return this.id;
  }

  static find(filter = {}) {
    if (filter.userId) {
      filter.userId = filter.userId.toString();
    }
    return new QueryBuilder(db.ref("mriScans"), filter, MriScan);
  }

  static findOne(filter = {}) {
    if (filter._id) {
      filter.id = filter._id;
      delete filter._id;
    }
    if (filter.userId) {
      filter.userId = filter.userId.toString();
    }
    return new SingleQueryBuilder(db.ref("mriScans"), filter, MriScan);
  }

  static async findById(id) {
    if (!id) return null;
    const snapshot = await db.ref("mriScans").child(id).once("value");
    if (snapshot.exists()) {
      return new MriScan({ id, ...snapshot.val() });
    }
    return null;
  }

  static async findByIdAndUpdate(id, update, options = {}) {
    if (!id) return null;
    const ref = db.ref("mriScans").child(id);
    const snapshot = await ref.once("value");
    if (snapshot.exists()) {
      const current = snapshot.val();
      const updated = { ...current, ...update, updatedAt: new Date().toISOString() };
      await ref.update(updated);
      return new MriScan({ id, ...updated });
    }
    return null;
  }

  static async updateOne(query, update) {
    const id = query._id || query.id;
    if (id) {
      const fields = update.$set || update;
      await db.ref("mriScans").child(id).update({
        ...fields,
        updatedAt: new Date().toISOString()
      });
      return { nModified: 1 };
    }
    return { nModified: 0 };
  }

  static async deleteOne(query) {
    const id = query._id || query.id;
    if (id) {
      await db.ref("mriScans").child(id).remove();
      return { deletedCount: 1 };
    }
    return { deletedCount: 0 };
  }

  static async countDocuments(filter = {}) {
    const snapshot = await db.ref("mriScans").once("value");
    if (!snapshot.exists()) return 0;
    const data = snapshot.val();
    let count = 0;
    for (const key of Object.keys(data)) {
      const item = data[key];
      let match = true;
      for (const [fKey, fVal] of Object.entries(filter)) {
        if (fVal && fVal.$regex) {
          const regex = new RegExp(fVal.$regex, fVal.$options || '');
          if (!regex.test(item[fKey])) { match = false; break; }
        } else if (fVal && (fVal.$gte || fVal.$lte || fVal.$gt || fVal.$lt)) {
          const val = new Date(item[fKey]);
          if (fVal.$gte && val < new Date(fVal.$gte)) { match = false; break; }
          if (fVal.$lte && val > new Date(fVal.$lte)) { match = false; break; }
          if (fVal.$gt && val <= new Date(fVal.$gt)) { match = false; break; }
          if (fVal.$lt && val >= new Date(fVal.$lt)) { match = false; break; }
        } else {
          const val = fKey === '_id' || fKey === 'id' ? key : item[fKey];
          const checkVal = fVal ? fVal.toString() : null;
          const itemVal = val ? val.toString() : null;
          if (itemVal !== checkVal) { match = false; break; }
        }
      }
      if (match) count++;
    }
    return count;
  }

  static async findByIdAndDelete(id) {
    if (!id) return null;
    const ref = db.ref("mriScans").child(id);
    const snapshot = await ref.once("value");
    if (snapshot.exists()) {
      const deleted = new MriScan({ id, ...snapshot.val() });
      await ref.remove();
      return deleted;
    }
    return null;
  }

  static async aggregate(pipeline) {
    const snapshot = await db.ref("mriScans").once("value");
    let data = [];
    if (snapshot.exists()) {
      const val = snapshot.val();
      data = Object.keys(val).map(key => ({ id: key, _id: key, ...val[key] }));
    }

    for (const stage of pipeline) {
      if (stage.$match) {
        const match = stage.$match;
        data = data.filter(item => {
          for (const [key, val] of Object.entries(match)) {
            if (val && val.$in) {
              const inArr = val.$in.map(id => id.toString());
              if (!item[key] || !inArr.includes(item[key].toString())) return false;
            } else {
              const itemVal = item[key] ? item[key].toString() : null;
              const checkVal = val ? val.toString() : null;
              if (itemVal !== checkVal) return false;
            }
          }
          return true;
        });
      } else if (stage.$group) {
        const group = stage.$group;
        const grouped = {};
        for (const item of data) {
          let groupId = null;
          if (typeof group._id === "string" && group._id.startsWith("$")) {
            const fieldName = group._id.substring(1);
            groupId = getNestedValue(item, fieldName);
          }
          const groupStr = groupId ? groupId.toString() : "null";
          if (!grouped[groupStr]) {
            grouped[groupStr] = { _id: groupId };
            for (const [key, expr] of Object.entries(group)) {
              if (key === "_id") continue;
              if (expr && expr.$sum === 1) {
                grouped[groupStr][key] = 0;
              } else if (expr && expr.$first) {
                grouped[groupStr][key] = null;
              }
            }
          }
          
          for (const [key, expr] of Object.entries(group)) {
            if (key === "_id") continue;
            if (expr && expr.$sum === 1) {
              grouped[groupStr][key]++;
            } else if (expr && expr.$first) {
              if (grouped[groupStr][key] === null) {
                let firstVal = null;
                if (typeof expr.$first === "string" && expr.$first.startsWith("$")) {
                  const path = expr.$first.substring(1);
                  firstVal = getNestedValue(item, path);
                } else {
                  firstVal = expr.$first;
                }
                grouped[groupStr][key] = firstVal;
              }
            }
          }
        }
        data = Object.values(grouped);
      } else if (stage.$sort) {
        const sort = stage.$sort;
        data.sort((a, b) => {
          for (const [key, dir] of Object.entries(sort)) {
            if (a[key] < b[key]) return dir === -1 ? 1 : -1;
            if (a[key] > b[key]) return dir === -1 ? -1 : 1;
          }
          return 0;
        });
      } else if (stage.$limit) {
        data = data.slice(0, stage.$limit);
      } else if (stage.$lookup) {
        const lookup = stage.$lookup;
        if (lookup.from === "users") {
          for (const item of data) {
            const userId = item._id ? item._id.toString() : null;
            if (userId) {
              const userSnap = await db.ref("users").child(userId).once("value");
              if (userSnap.exists()) {
                item[lookup.as] = [{ _id: userId, id: userId, ...userSnap.val() }];
              } else {
                item[lookup.as] = [];
              }
            } else {
              item[lookup.as] = [];
            }
          }
        }
      } else if (stage.$unwind) {
        const unwind = stage.$unwind;
        const unwound = [];
        const fieldName = unwind.startsWith("$") ? unwind.substring(1) : unwind;
        for (const item of data) {
          const arr = item[fieldName];
          if (Array.isArray(arr) && arr.length > 0) {
            for (const subItem of arr) {
              unwound.push({ ...item, [fieldName]: subItem });
            }
          }
        }
        data = unwound;
      } else if (stage.$project) {
        const project = stage.$project;
        data = data.map(item => {
          const newItem = {};
          for (const [key, val] of Object.entries(project)) {
            if (val === 1) {
              newItem[key] = item[key];
            } else if (val === 0) {
              delete newItem[key];
            } else if (typeof val === "string" && val.startsWith("$")) {
              const path = val.substring(1).split(".");
              let currentVal = item;
              for (const p of path) {
                currentVal = currentVal ? currentVal[p] : undefined;
              }
              newItem[key] = currentVal;
            }
          }
          const hasInclusions = Object.values(project).some(val => val === 1 || (typeof val === "string" && val.startsWith("$")));
          if (hasInclusions && project._id !== 0 && item._id !== undefined) {
            newItem._id = item._id;
          }
          if (project._id === 0) {
            delete newItem._id;
          }
          return newItem;
        });
      }
    }

    return data;
  }

  async save() {
    const ref = db.ref("mriScans");
    const scanData = {
      userId: this.userId,
      metadata: this.metadata,
      result: this.result,
      mri_scan: this.mri_scan,
      heat_map: this.heat_map,
      report: this.report,
      createdAt: this.createdAt,
      updatedAt: new Date().toISOString()
    };
    if (this.id) {
      await ref.child(this.id).update(scanData);
    } else {
      const newRef = ref.push();
      this.id = newRef.key;
      await newRef.set(scanData);
    }
    return this;
  }
}

export default MriScan;