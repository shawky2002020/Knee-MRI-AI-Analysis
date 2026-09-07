import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultDbPath = path.join(__dirname, '../data/demo_db.json');

class LocalDbAdapter {
  constructor(filePath = defaultDbPath) {
    this.filePath = filePath;
    this.data = {
      users: {},
      mriScans: {},
      notifications: {}
    };
    this.ensureDir();
    this.load();
  }

  ensureDir() {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  load() {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf8');
        this.data = JSON.parse(raw);
        if (!this.data.users) this.data.users = {};
        if (!this.data.mriScans) this.data.mriScans = {};
        if (!this.data.notifications) this.data.notifications = {};
      } else {
        this.save();
      }
    } catch (err) {
      console.error('Error loading local DB file:', err);
    }
  }

  save() {
    try {
      this.ensureDir();
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.error('Error saving local DB file:', err);
    }
  }

  generateId() {
    return 'demo_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 8);
  }

  ref(collectionName) {
    if (!this.data[collectionName]) {
      this.data[collectionName] = {};
    }
    const collection = this.data[collectionName];
    const adapter = this;

    return {
      child(id) {
        return {
          async once(event) {
            const val = collection[id] ? JSON.parse(JSON.stringify(collection[id])) : null;
            return {
              exists: () => val !== null && val !== undefined,
              val: () => val
            };
          },
          async set(val) {
            collection[id] = JSON.parse(JSON.stringify(val));
            adapter.save();
            return Promise.resolve();
          },
          async update(updateData) {
            if (!collection[id]) collection[id] = {};
            Object.assign(collection[id], JSON.parse(JSON.stringify(updateData)));
            adapter.save();
            return Promise.resolve();
          },
          async remove() {
            delete collection[id];
            adapter.save();
            return Promise.resolve();
          }
        };
      },

      push() {
        const newId = adapter.generateId();
        return {
          key: newId,
          async set(val) {
            collection[newId] = JSON.parse(JSON.stringify(val));
            adapter.save();
            return Promise.resolve();
          }
        };
      },

      async once(event) {
        const val = JSON.parse(JSON.stringify(collection));
        const keys = Object.keys(val);
        return {
          exists: () => keys.length > 0,
          val: () => val,
          numChildren: () => keys.length
        };
      },

      async remove() {
        adapter.data[collectionName] = {};
        adapter.save();
        return Promise.resolve();
      }
    };
  }
}

export const localDb = new LocalDbAdapter();
export default localDb;
