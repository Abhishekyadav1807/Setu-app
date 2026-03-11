import mongoose from 'mongoose';

const procedureSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  icon: { type: String, default: '📋' },
  purpose: { type: String, required: true },
  requiredDocuments: [String],
  steps: [{
    stepNumber: Number,
    title: String,
    description: String
  }],
  fees: { type: String },
  timeline: { type: String },
  officialLink: { type: String },
  tips: [String]
}, { timestamps: true });

export default mongoose.model('Procedure', procedureSchema);
