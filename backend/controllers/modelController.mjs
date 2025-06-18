import MriScan from "../models/MriScan.mjs";
import User from "../models/User.mjs";
import dotenv from "dotenv";
import  {notifyUser ,Notification } from "../services/notificationService.mjs";
import notification from "../models/notifications.mjs";

// Configure dotenv to load environment variables
dotenv.config();

// Original function for processing a single MRI scan
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
    const base64Data = file.buffer.toString("base64");

    // Send image to AI model API endpoint
    const modelResponse = await fetch(
      `${process.env.BASE_AI_URL}/process_mri`,
      {
        method: "POST",
        body: JSON.stringify({
          file: base64Data, // Send just the base64 data without the data URL prefix
          file_type: file.mimetype, // Send the mimetype separately
          view_type: metadata.view_type,
          user_id: id.toString(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Enhanced error handling
    if (!modelResponse.ok) {
      const errorText = await modelResponse.text();
      console.error("AI model response error:", {
        status: modelResponse.status,
        statusText: modelResponse.statusText,
        body: errorText,
      });
      throw new Error(
        `AI model processing failed: ${modelResponse.status} ${modelResponse.statusText}. Details: ${errorText}`
      );
    }

    const aiResults = await modelResponse.json();

    const newMri = await new MriScan({
      userId: id,
      metadata: metadata,
      result: aiResults.result,
      report: aiResults.report,
      mri_scan: aiResults.mri_scan,
      heat_map: aiResults.heat_map,
    });
    newMri.save();
    console.log(newMri);

    res.json({ message: "MRI scan is saved successfully", mri: newMri });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

// New function for processing multiple MRI scans for different views
export const process_Multi_View_Mri = async (req, res) => {
  try {
    const id = req.user.id;
    let { metadata } = req.body;
    const user = await User.findOne({ _id: id });
    if (!user.aiAccess) {
      const newNoti = new Notification({
        "title": "Access Denied",
        "message": "Please Contact the ACLyze AI for access",
        "type": "error",
      });
       notifyUser(id,'access-notification',newNoti);
      res.status(403).json({ message: "Access Denied" });
      return;
    }
    // Check if files exist in the request
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Check if metadata exists
    if (!metadata) {
      return res.status(400).json({ message: "No MetaData inserted" });
    }

    metadata = JSON.parse(metadata); // Parse metadata from request body

    // Initialize view type arrays
    const sagittalFiles = req.files["sagittal"] || [];
    const coronalFiles = req.files["coronal"] || [];
    const axialFiles = req.files["axial"] || [];

    // Check if at least one file is uploaded for any view
    if (
      sagittalFiles.length === 0 &&
      coronalFiles.length === 0 &&
      axialFiles.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "No files uploaded for any view" });
    }

    // Prepare data structure for AI model
    const requestData = {
      sagittal: [],
      coronal: [],
      axial: [],
      user_id: id.toString(),
    };

    // Process sagittal files
    for (const file of sagittalFiles) {
      const base64Data = file.buffer.toString("base64");
      requestData.sagittal.push(base64Data);
    }

    // Process coronal files
    for (const file of coronalFiles) {
      const base64Data = file.buffer.toString("base64");
      requestData.coronal.push(base64Data);
    }

    // Process axial files
    for (const file of axialFiles) {
      const base64Data = file.buffer.toString("base64");
      requestData.axial.push(base64Data);
    }

    // Send data to AI model API endpoint
    const modelResponse = await fetch(
      `${process.env.BASE_AI_URL}/process_multiview_mri`,
      {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Enhanced error handling
    if (!modelResponse.ok) {
      const errorText = await modelResponse.text();
      console.error("AI model response error:", {
        status: modelResponse.status,
        statusText: modelResponse.statusText,
        body: errorText,
      });
      throw new Error(
        `AI model processing failed: ${modelResponse.status} ${modelResponse.statusText}. Details: ${errorText}`
      );
    }

    const aiResults = await modelResponse.json();

    // Create new MRI scan record
    const newMri = await new MriScan({
      userId: id,
      metadata: metadata,
      result: aiResults.result,
      report: aiResults.report,
      mri_scan: aiResults.mri_scan,
      heat_map: aiResults.heat_map,
    });

    await newMri.save();
    console.log(newMri);

    res.json(newMri);
  } catch (error) {
    console.error("Multi-view upload error:", error);
    res
      .status(500)
      .json({ message: "Multi-view upload failed", error: error.message });
  }
};
