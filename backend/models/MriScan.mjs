import mongoose from 'mongoose';

const MriScanSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  scanData: {
    type: Buffer,
    required: true
  },
  metadata: {
    type: Map,
    of: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const MriScan = mongoose.model('MriScan', MriScanSchema);

export default MriScan;