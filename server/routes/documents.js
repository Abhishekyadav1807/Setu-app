import express from 'express';
import Document from '../models/Document.js';

const router = express.Router();

// POST generate document - saves form data and returns it for PDF generation on client
router.post('/generate', async (req, res) => {
  try {
    const { type, formData } = req.body;
    if (!type || !formData) {
      return res.status(400).json({ message: 'Type and formData are required' });
    }

    const doc = new Document({ type, formData });
    await doc.save();

    res.json({
      message: 'Document generated successfully',
      document: doc
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all generated documents
router.get('/', async (req, res) => {
  try {
    const docs = await Document.find().sort({ generatedAt: -1 }).limit(50);
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
