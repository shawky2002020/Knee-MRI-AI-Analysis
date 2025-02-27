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

const upload = multer({ storage,fileFilter }).fields([
  { name: 'scan', maxCount: 1 }, // Field name is 'file'
  { name: 'metadata', maxCount: 1 }, // Field name is 'metadata'
]);;

export default upload;
