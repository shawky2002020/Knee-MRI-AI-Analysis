import mongoose from 'mongoose';

// Scan Metadata schema definition
const ScanMetadataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true
  },
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
  },
  viewed: {
    type: Boolean,
    default: false
  }
}, { _id: false }); // Prevent creating ObjectId for this subdocument

// Diagnostic Result schema definition
const DiagnosticResultSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
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

// Main MRI Scan schema
const MriScanSchema = new mongoose.Schema({
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
    type: ScanMetadataSchema,
    required: true
  },
  result: {
    type: DiagnosticResultSchema,
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
MriScanSchema.index({ userId: 1, createdAt: -1 });

const MriScan = mongoose.model('MriScan', MriScanSchema);

export default MriScan;