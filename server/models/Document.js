import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['fir-draft', 'rti-application', 'legal-notice', 'consumer-complaint', 'rent-notice'] },
  formData: { type: mongoose.Schema.Types.Mixed, required: true },
  generatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Document', documentSchema);
