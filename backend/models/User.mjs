import { db } from "../config/serverConfig.mjs";
import bcrypt from "bcryptjs";
import { QueryBuilder, SingleQueryBuilder } from "../utils/firebaseModel.mjs";

class User {
  constructor(data) {
    this.id = data.id || data._id || null;
    this.name = data.name;
    this.email = data.email ? data.email.toLowerCase() : "";
    this.role = data.role || "user";
    this.password = data.password || "";
    this.aiAccess = data.aiAccess !== undefined ? data.aiAccess : true;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    this.lastLogin = data.lastLogin || null;
    this.loginCount = data.loginCount || 0;
    this.isGoogleUser = data.isGoogleUser || false;
  }

  get _id() {
    return this.id;
  }

  static find(filter = {}) {
    return new QueryBuilder(db.ref("users"), filter, User);
  }

  static findOne(filter = {}) {
    if (filter._id) {
      filter.id = filter._id;
      delete filter._id;
    }
    return new SingleQueryBuilder(db.ref("users"), filter, User);
  }

  static async findById(id) {
    if (!id) return null;
    const snapshot = await db.ref("users").child(id).once("value");
    if (snapshot.exists()) {
      return new User({ id, ...snapshot.val() });
    }
    return null;
  }

  static async findByIdAndUpdate(id, update, options = {}) {
    if (!id) return null;
    const ref = db.ref("users").child(id);
    const snapshot = await ref.once("value");
    if (snapshot.exists()) {
      const current = snapshot.val();
      const updated = { ...current, ...update, updatedAt: new Date().toISOString() };
      await ref.update(updated);
      return new User({ id, ...updated });
    }
    return null;
  }

  static async updateOne(query, update) {
    const id = query._id || query.id;
    if (id) {
      const fields = update.$set || update;
      await db.ref("users").child(id).update({
        ...fields,
        updatedAt: new Date().toISOString()
      });
      return { nModified: 1 };
    }
    return { nModified: 0 };
  }

  static async countDocuments(filter = {}) {
    const snapshot = await db.ref("users").once("value");
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
          if (val !== fVal) { match = false; break; }
        }
      }
      if (match) count++;
    }
    return count;
  }

  static async findByIdAndDelete(id) {
    if (!id) return null;
    const ref = db.ref("users").child(id);
    const snapshot = await ref.once("value");
    if (snapshot.exists()) {
      const deleted = new User({ id, ...snapshot.val() });
      await ref.remove();
      return deleted;
    }
    return null;
  }

  async save() {
    const ref = db.ref("users");
    const userData = {
      name: this.name,
      email: this.email,
      role: this.role,
      password: this.password,
      aiAccess: this.aiAccess,
      createdAt: this.createdAt,
      updatedAt: new Date().toISOString(),
      lastLogin: this.lastLogin ? new Date(this.lastLogin).toISOString() : null,
      loginCount: this.loginCount,
      isGoogleUser: this.isGoogleUser
    };
    if (this.id) {
      await ref.child(this.id).update(userData);
    } else {
      const newRef = ref.push();
      this.id = newRef.key;
      await newRef.set(userData);
    }
    return this;
  }

  canLoginWithPassword() {
    return !this.isGoogleUser && this.password;
  }

  async comparePassword(candidatePassword) {
    if (this.isGoogleUser) return false;
    return await bcrypt.compare(candidatePassword, this.password);
  }

  isLinkedAccount() {
    return this.isGoogleUser && this.password;
  }
}

export default User;