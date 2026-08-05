import { db } from "../config/serverConfig.mjs";
import { QueryBuilder, SingleQueryBuilder } from "../utils/firebaseModel.mjs";

class Notification {
  constructor(data) {
    this.id = data.id || data._id || null;
    this.userID = data.userID ? data.userID.toString() : null;
    this.title = data.title || "";
    this.message = data.message || "";
    this.type = data.type || "";
    this.read = data.read !== undefined ? data.read : false;
    this.reportID = data.reportID ? data.reportID.toString() : null;
    this.createdAt = data.createdAt ? new Date(data.createdAt).toISOString() : new Date().toISOString();
  }

  get _id() {
    return this.id;
  }

  static find(filter = {}) {
    if (filter.userID) {
      filter.userID = filter.userID.toString();
    }
    return new QueryBuilder(db.ref("notifications"), filter, Notification);
  }

  static findOne(filter = {}) {
    if (filter._id) {
      filter.id = filter._id;
      delete filter._id;
    }
    if (filter.userID) {
      filter.userID = filter.userID.toString();
    }
    return new SingleQueryBuilder(db.ref("notifications"), filter, Notification);
  }

  static async findById(id) {
    if (!id) return null;
    const snapshot = await db.ref("notifications").child(id).once("value");
    if (snapshot.exists()) {
      return new Notification({ id, ...snapshot.val() });
    }
    return null;
  }

  static async findByIdAndUpdate(id, update, options = {}) {
    if (!id) return null;
    const ref = db.ref("notifications").child(id);
    const snapshot = await ref.once("value");
    if (snapshot.exists()) {
      const current = snapshot.val();
      const updated = { ...current, ...update };
      await ref.update(updated);
      return new Notification({ id, ...updated });
    }
    return null;
  }

  static async deleteOne(query) {
    const id = query._id || query.id;
    if (id) {
      await db.ref("notifications").child(id).remove();
      return { deletedCount: 1 };
    }
    return { deletedCount: 0 };
  }

  static async deleteMany(query) {
    const ref = db.ref("notifications");
    const snapshot = await ref.once("value");
    if (snapshot.exists()) {
      const data = snapshot.val();
      let deletedCount = 0;
      for (const key of Object.keys(data)) {
        const item = data[key];
        let match = true;
        for (const [qKey, qVal] of Object.entries(query)) {
          const itemVal = item[qKey] ? item[qKey].toString() : null;
          const checkVal = qVal ? qVal.toString() : null;
          if (itemVal !== checkVal) {
            match = false;
            break;
          }
        }
        if (match) {
          await ref.child(key).remove();
          deletedCount++;
        }
      }
      return { deletedCount };
    }
    return { deletedCount: 0 };
  }

  async save() {
    const ref = db.ref("notifications");
    const notificationData = {
      userID: this.userID,
      title: this.title,
      message: this.message,
      type: this.type,
      read: this.read,
      reportID: this.reportID,
      createdAt: this.createdAt
    };
    if (this.id) {
      await ref.child(this.id).update(notificationData);
    } else {
      const newRef = ref.push();
      this.id = newRef.key;
      await newRef.set(notificationData);
    }
    return this;
  }
}

export default Notification;
