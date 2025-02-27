import Mri from "../models/MriScan.mjs";
import cloudinary from "../config/cloudinary.mjs";
import MriScan from "../models/MriScan.mjs";
export const uploadMri = async (req, res) => {
  try {
    const file = req.files["scan"][0];
    const id = req.user.id;
    let { metadata } = req.body;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    } else if (!metadata) {
      return res.status(400).json({ message: "No MetaData inserted" });
    }
    metadata = JSON.parse(metadata); // Parse metadata from request body

    // Convert buffer to base64 string
    const base64Image = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;

    // Upload to Cloudinary
    const cloudinary_Url = await cloudinary.uploader.upload(base64Image, {
      folder: "uploads",
      folder: `MRI_Images/user_${id}`, // Organize by user ID
      public_id: `scan_${Date.now()}`,
      // Timestamp-based filename
      resource_type: "image",
    });

    const newMri = await new MriScan({
      patientId: id,
      imageUrl: cloudinary_Url.secure_url,
      metadata: metadata,
    });
    newMri.save();

    res.json({ message: "MRI scan is saved successfully", mri: newMri });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

export const getMri = async (req, res) => {
  try {
    const id = req.user.id;
    if (!id) {
      res.status(404).json({message:"User not found"})
    }
    const patientScans = await Mri.find({ patientId: id }).select('-patientId');
    res.status(200).json({...patientScans})
  } catch (error) {
    res.status(400).json({message :'Failed to load the scans',err:error.message})
  }
};
