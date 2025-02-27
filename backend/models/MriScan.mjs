import mongoose from 'mongoose';

const metaData = new mongoose.Schema({
  type:{
    type:String,
    required:true
  },
  view:{
    type:String,
    required:true
  },
  fileType: {
    type: String,
    enum: ['dicom', 'jpeg', 'png', 'jpg'], // Use `enum` to restrict values
    required: true
  }
})



const MriScanSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  metadata: {
    type: metaData,
    of: String,
    required: true
  },
  imageUrl:{
    type:String,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const MriScan = mongoose.model('MriScan', MriScanSchema);

export default MriScan;