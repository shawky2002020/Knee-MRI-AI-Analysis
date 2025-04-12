import mongoose from 'mongoose';

// Metadata schema definition
const MetadataSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    trim: true
  },
  view_type: {
    type: String,
    required: true,
    trim: true
  },
  fileType: {
    type: String,
    enum: ['dicom', 'jpeg', 'png', 'jpg'],
    required: true,
    lowercase: true
  }
}, { _id: false }); // Prevent creating ObjectId for this subdocument

// Result schema definition
const ResultSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    trim: true
  },
  acl_prob: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  },
  meniscus_prob: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  }
}, { _id: false }); // Prevent creating ObjectId for this subdocument

// Main AI Analysis schema
const AIAnalysisSchema = new mongoose.Schema({
  // Use a single ObjectId for the document
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    immutable: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  metadata: {
    type: MetadataSchema,
    required: true
  },
  result: {
    type: ResultSchema,
    required: true
  },
  mri_scan: {
    type: String,
    required: true,
    trim: true
  },
  heat_map: {
    type: String,
    required: true,
    trim: true
  },
  report: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Create indexes for frequently queried fields
AIAnalysisSchema.index({ userId: 1, createdAt: -1 });

const MriScan = mongoose.model('MriScan', AIAnalysisSchema);

export default MriScan;