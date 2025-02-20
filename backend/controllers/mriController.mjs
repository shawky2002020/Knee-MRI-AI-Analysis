import cloudinary from "../config/cloudinary.mjs";
import MriScan from "../models/MriScan.mjs";
export const uploadMri =async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const id = req.user.id
    const {name} = req.body
    
    // Convert buffer to base64 string
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    // Upload to Cloudinary
    const cloudinary_Url = await cloudinary.uploader.upload(base64Image, {
      folder: "uploads",
      folder: `MRI_Images/user_${id}`, // Organize by user ID
      public_id: `scan_${Date.now()}`,
       // Timestamp-based filename
      resource_type: "image",
    });

    const newMri = await new MriScan({patientId:id,imageUrl:cloudinary_Url.secure_url,metadata:{type:'Mri',confidence:'good'}});
    newMri.save()

    res.json({ newMri });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};


