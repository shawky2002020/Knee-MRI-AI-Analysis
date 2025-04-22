import MriScan from "../models/AIAnalysis.mjs";
import * as helpers from "../utils/helper.mjs";

// Helper function to generate time filter based on timeRange

export const getAllScans = async (req, res) => {
  try {
    const id = req.user.id;
    if (!id) {
      return res.status(404).json({ message: "User not found" });
    }

    // Paging parameters
    const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
    const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 10;
    const skip = (page - 1) * limit;

    const timeFilter = helpers.getTimeFilter(req.query.timeRange);
    const filter = { userId: id, ...timeFilter };

    const total = await MriScan.countDocuments(filter);
    const patientScans = await MriScan.find(filter)
      .select("-patientId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      scans: patientScans,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalScans: total
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to load the scans", err: error.message });
  }
};

export const getScanByName = async (req, res) => {
  try {
    const id = req.user.id;
    const scanName = req.params.name;

    if (!id) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!scanName) {
      return res.status(400).json({ message: "Scan name is required" });
    }

    const timeFilter = helpers.getTimeFilter(req.query.timeRange);
    const filter = { 
      userId: id,
      "metadata.name": { $regex: scanName, $options: "i" },
      ...timeFilter
    };

    const scan = await MriScan.find(filter);

    if (!scan || scan.length === 0) {
      return res.status(404).json({ message: "Scan not found" });
    }

    res.status(200).json({ scan });
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch scan", err: error.message });
  }
};

export const deleteMri = async (req, res) => {
  try {
    const id = req.user.id;
    const scanId = req.params.scanId;
    if (!id) {
      return res.status(404).json({ message: "User not found" });
    }
    const deletedScan = await MriScan.findOneAndDelete({ userId: id, _id: scanId });
    if (!deletedScan) {
      return res.status(404).json({ message: "Scan not found or not authorized" });
    }
    res.status(200).json({ message: "Scan deleted successfully", scan: deletedScan });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete the scan", err: error.message });
  }
};

export const updateName = async (req, res) => {
    try {
        await MriScan.updateMany(
            {},
            [
                {
                    $set: {
                        "metadata.name": "Shawky Ahmad SHawky",
                        "metadata.age": "22",
                        "metadata.gender": "male"
                    }
                }
            ]
        );
        res.status(200).json({ 'message': 'success' });
    }
    catch (error) {
        res.status(400).json({ 'message': 'failed', error: error.message });
    }
}