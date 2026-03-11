import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  eligibility: { type: String, required: true },
  benefits: { type: String, required: true },
  requiredDocuments: [String],
  officialWebsite: { type: String },
  description: { type: String }
}, { timestamps: true });

export default mongoose.model('Scheme', schemeSchema);
