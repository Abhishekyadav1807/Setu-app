import mongoose from 'mongoose';

const lawSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  icon: { type: String, default: '⚖️' },
  overview: { type: String, required: true },
  keySections: [{
    section: String,
    title: String,
    description: String
  }],
  examples: [{
    title: String,
    scenario: String,
    outcome: String
  }],
  useCases: [{
    title: String,
    description: String
  }],
  importantLinks: [{
    label: String,
    url: String
  }]
}, { timestamps: true });

export default mongoose.model('Law', lawSchema);
