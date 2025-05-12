import MriScan from "../../models/MriScan.mjs";

export const getDiagnosisDistribution = async (req, res) => {
  try {
    // First get the raw distribution from MongoDB
    const diagnosisDistribution = await MriScan.aggregate([
      {
        $group: {
          _id: "$result.status", // Assuming status field contains the diagnosis
          count: { $sum: 1 },
        },
      },
    ]);

    // Create a structured response with all categories
    const response = {
      normal: 0,
      acl: 0,
      meniscus: 0,
      "acl and meniscus": 0,
      total: 0
    };

    // Fill in the counts from the aggregation results
    diagnosisDistribution.forEach(item => {
      if (item._id && response.hasOwnProperty(item._id.toLowerCase())) {
        response[item._id.toLowerCase()] = item.count;
      }
      response.total += item.count;
    });

    // Calculate percentages
    const percentages = {
      normal: Math.round((response.normal / response.total) * 100) || 0,
      acl: Math.round((response.acl / response.total) * 100) || 0,
      meniscus: Math.round((response.meniscus / response.total) * 100) || 0,
      aclAndMeniscus: Math.round((response["acl and meniscus"] / response.total) * 100) || 0
    };

    res.status(200).json({
      counts: response,
      percentages: percentages
    });
  } catch (error) {
    console.error("Error getting diagnosis distribution:", error);
    res.status(500).json({ message: "Failed to get diagnosis distribution", error: error.message });
  }
};

/**
 * Get the number of scans for each user
 * Returns an array of users with their scan counts
 */
export const getUserScanCounts = async (req, res) => {
  try {
    // Aggregate scans by user ID
    const userScanCounts = await MriScan.aggregate([
      {
        $group: {
          _id: "$userId",
          count: { $sum: 1 },
          userName: { $first: "$metadata.name" }
        }
      },
      {
        $sort: { count: -1 } // Sort by count in descending order
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          userName: 1,
          count: 1
        }
      }
    ]);

    // If you need to populate with more user details, you could use a lookup

    res.status(200).json({
      success: true,
      userScanCounts: userScanCounts,
      totalUsers: userScanCounts.length
    });
  } catch (error) {
    console.error("Error getting user scan counts:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to get user scan counts", 
      error: error.message 
    });
  }
};


