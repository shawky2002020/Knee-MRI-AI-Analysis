import multer from "multer";
import path from "path";


const allowedExtensions = ['.jpg', '.jpeg', '.png', '.dicom'];

const storage = multer.memoryStorage(); // Store file in memory

// File filter to restrict file types
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPG, JPEG, PNG, and DICOM files are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
}).fields([
  { name: 'scan', maxCount: 1 },  // For single scan uploads
  { name: 'sagittal', maxCount: 15 },  // For sagittal view
  { name: 'coronal', maxCount: 15 },  // For coronal view
  { name: 'axial', maxCount: 15 }     // For axial view
]);


export default upload;
