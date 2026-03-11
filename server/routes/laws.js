import express from 'express';
import Law from '../models/Law.js';

const router = express.Router();

// GET all laws
router.get('/', async (req, res) => {
  try {
    const laws = await Law.find().select('slug title category icon overview');
    res.json(laws);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single law by slug
router.get('/:slug', async (req, res) => {
  try {
    const law = await Law.findOne({ slug: req.params.slug });
    if (!law) return res.status(404).json({ message: 'Law not found' });
    res.json(law);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
