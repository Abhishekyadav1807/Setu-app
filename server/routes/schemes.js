import express from 'express';
import Scheme from '../models/Scheme.js';

const router = express.Router();

// GET all schemes with optional search and category filter
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};
    if (category && category !== 'All') filter.category = category;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { eligibility: { $regex: search, $options: 'i' } },
        { benefits: { $regex: search, $options: 'i' } }
      ];
    }
    const schemes = await Scheme.find(filter);
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET scheme categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Scheme.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single scheme by slug
router.get('/:slug', async (req, res) => {
  try {
    const scheme = await Scheme.findOne({ slug: req.params.slug });
    if (!scheme) return res.status(404).json({ message: 'Scheme not found' });
    res.json(scheme);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
