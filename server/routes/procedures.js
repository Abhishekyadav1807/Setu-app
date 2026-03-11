import express from 'express';
import Procedure from '../models/Procedure.js';

const router = express.Router();

// GET all procedures
router.get('/', async (req, res) => {
  try {
    const procedures = await Procedure.find().select('slug title icon purpose timeline');
    res.json(procedures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single procedure by slug
router.get('/:slug', async (req, res) => {
  try {
    const procedure = await Procedure.findOne({ slug: req.params.slug });
    if (!procedure) return res.status(404).json({ message: 'Procedure not found' });
    res.json(procedure);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
