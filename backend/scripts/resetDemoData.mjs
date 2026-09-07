import { seedDemoData } from './seedDemoData.mjs';

console.log('Resetting ACLyze AI demo database...');
seedDemoData()
  .then(() => {
    console.log('Demo database reset and seeded successfully.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Reset error:', err);
    process.exit(1);
  });
