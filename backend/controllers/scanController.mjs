import MriScan from "../models/AIAnalysis.mjs";
import * as helpers from "../utils/helper.mjs";

export const getAllScans = async (req, res) => {
  try {
    const id = req.user.id;
    if (!id) {
      return res.status(404).json({ message: "User not found" });
    }

    const { page, limit, skip } = helpers.getPaginationParams(req.query);
    const timeFilter = helpers.getTimeFilter(req.query.timeRange);

    // Build dynamic filter
    const filter = { userId: id, ...timeFilter };

    // Name filter (partial match, case-insensitive)
    if (req.query.name && req.query.name.trim() !== "") {
      filter["metadata.name"] = { $regex: req.query.name, $options: "i" };
    }

    // Status filter (case-insensitive, matches result.status)
    if (req.query.status && req.query.status.trim() !== "") {
      filter["result.status"] = req.query.status.toLowerCase();
    }

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
      totalScans: total,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to load the scans", err: error.message });
  }
};

export const updateViewed = async (req, res) => {
  try {
    const id = req.user.id;
    if (!id) {
      return res.status(404).json({ message: "User not found" });
    }
    const scanId = req.params.scanId;
    const scan = await MriScan.updateOne({_id:scanId}, [
      {
        $set: {
          "metadata.viewed": true,
        },
      },
    ]); 
    res.status(200).json({ message: "Scan updated successfully",scan });
  } 
  catch (error) {
    res.status(400).json({ message: "Failed to update the scan", err: error.message }); 
  }
}

export const deleteMri = async (req, res) => {
  try {
    const id = req.user.id;
    const scanId = req.params.scanId;
    if (!id) {
      return res.status(404).json({ message: "User not found" });
    }
    const deletedScan = await MriScan.findOneAndDelete({
      userId: id,
      _id: scanId,
    });
    if (!deletedScan) {
      return res
        .status(404)
        .json({ message: "Scan not found or not authorized" });
    }
    res
      .status(200)
      .json({ message: "Scan deleted successfully", scan: deletedScan });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to delete the scan", err: error.message });
  }
};

export const updateName = async (req, res) => {
  try {
    await MriScan.updateMany({}, [
      {
        $set: {
          "metadata.name": "Shawky Ahmad SHawky",
          "metadata.age": "22",
          "metadata.gender": "male",
        },
      },
    ]);
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: "failed", error: error.message });
  }
};


export const lowercaseResultStatus = async (req, res) => {
  try {
    const result = await MriScan.updateMany(
      { "result.status": { $exists: true, $type: "string" } },
      [
        {
          $set: {
            "result.status": { $toLower: "$result.status" }
          }
        }
      ]
    );
    res.status(200).json({ message: "All result.status fields lowercased", modifiedCount: result.modifiedCount });
  } catch (error) {
    res.status(400).json({ message: "Failed to lowercase result.status", error: error.message });
  }
};


// export const getScanByName = async (req, res) => {
//   try {
//     const id = req.user.id;
//     const scanName = req.params.name;

//     if (!id) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (!scanName) {
//       return res.status(400).json({ message: "Scan name is required" });
//     }

//     const timeFilter = helpers.getTimeFilter(req.query.timeRange);
//     const { page, limit, skip } = helpers.getPaginationParams(req.query);

//     const filter = {
//       userId: id,
//       "metadata.name": { $regex: scanName, $options: "i" },
//       ...timeFilter,
//     };

//     const scans = await MriScan.find(filter)
//       .select("-patientId")
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     if (!scans || scans.length === 0) {
//       return res.status(404).json({ message: "Scans not found" });
//     }

//     res.status(200).json({ scans });
//   } catch (error) {
//     res.status(400).json({ message: "Failed to fetch scan", err: error.error });
//   }
// };

// export const getScanByStatus = async (req, res) => {
//   try {
//     const id = req.user.id;
//     const status = req.params.status.toLowerCase();

//     if (!id) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (!status) {
//       return res.status(400).json({ message: "Status parameter is required" });
//     }

//     // Validate status value
//     const validStatuses = ["normal", "acl", "meniscus","acl and meniscus"];
//     if (!validStatuses.includes(status)) {
//       return res
//         .status(400)
//         .json({
//           message: "Invalid status. Must be 'normal', 'acl', or 'meniscus'",
//         });
//     }

//     const timeFilter = helpers.getTimeFilter(req.query.timeRange);
    
//     const filter = {
//       userId: id,
//       "result.status": status, 
//       ...timeFilter,
//     };

//     const { page, limit, skip } = helpers.getPaginationParams(req.query);
//     const total = await MriScan.countDocuments(filter);
//     const scans = await MriScan.find(filter)
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     if (!scans || scans.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No scans found with this status" });
//     }

//     res.status(200).json({
//       scans,
//       page,
//       limit,
//       totalPages: Math.ceil(total / limit),
//       totalScans: total,
//     });
//   } catch (error) {
//     res
//       .status(400)
//       .json({ message: "Failed to fetch scans", err: error.message });
//   }
// };
