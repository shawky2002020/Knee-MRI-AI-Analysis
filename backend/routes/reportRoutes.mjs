import express from 'express';


const router = express.Router();
router.use(express.json());

// Define your routes here
router.get('/', (req, res) => {
  res.send('Admin route');
});

export default router;