import cloudinary from "../config/cloudinary.mjs";
import MriScan from "../models/AIAnalysis.mjs";
import dotenv from 'dotenv';
import FormData from 'form-data';

// Configure dotenv to load environment variables
dotenv.config();
export const process_Mri = async (req, res) => {
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
    const base64Data = file.buffer.toString('base64');
    
    // Send image to AI model API endpoint
    const modelResponse = await fetch(`${process.env.BASE_AI_URL}/process_mri`, {
      method: 'POST',
      body: JSON.stringify({
        file: base64Data,  // Send just the base64 data without the data URL prefix
        file_type: file.mimetype,  // Send the mimetype separately
        view_type: metadata.view_type,
        user_id: id.toString()
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

// Log request data for debugging
console.log('Sending to AI model:', {
  url: `${process.env.BASE_AI_URL}/process_mri`,
  view_type: metadata.view_type,
  user_id: id
});

// Enhanced error handling
if (!modelResponse.ok) {
  const errorText = await modelResponse.text();
  console.error('AI model response error:', {
    status: modelResponse.status,
    statusText: modelResponse.statusText,
    body: errorText
  });
  throw new Error(`AI model processing failed: ${modelResponse.status} ${modelResponse.statusText}. Details: ${errorText}`);
}

const aiResults = await modelResponse.json();



    const newMri = await new MriScan({
      userId: id,
      metadata: metadata,
      result: aiResults.result,
      report: aiResults.report,
      mri_scan: aiResults.mri_scan,
      heat_map: aiResults.heat_map
    });
    newMri.save();
    console.log(newMri);
    

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
    const patientScans = await MriScan.find({ userId: id }).select('-patientId');
    res.status(200).json({...patientScans})
  } catch (error) {
    res.status(400).json({message :'Failed to load the scans',err:error.message})
  }
};
