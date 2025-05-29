import bcrypt from "bcryptjs";
import User from "../../models/User.mjs";
import { getPaginationParams, getTimeFilter } from "../../utils/helper.mjs";
import MriScan from "../../models/MriScan.mjs";
import {notifyUser,Notification} from "../../services/notificationService.mjs";
class usersResponse {
  constructor(success, message, Users, totalUsers, page, limit) {
    this.success = success;
    this.message = message;
    this.users = Users;
    this.page = page;
    this.limit = limit;
    this.totalPages = Math.ceil(totalUsers / limit);
    this.totalUsers = totalUsers;
  }
}
export const getAllUsers = async (req, res) => {
  try {
    const { page, limit, skip } = getPaginationParams(req.query);
    const timeFilter = getTimeFilter(req.query.timeRange);

    // Build dynamic filter
    const filter = { ...timeFilter };

    // Name filter (partial match, case-insensitive)
    if (req.query.name && req.query.name.trim() !== "") {
      filter["name"] = { $regex: req.query.name, $options: "i" };
    }
    const usersCount = await User.countDocuments(filter);
    const users = await User.find(filter)
      .select("-password")
      .limit(limit)
      .skip(skip);
    res
      .status(200)
      .json(
        new usersResponse(
          true,
          "Users found successfully",
          users,
          usersCount,
          page,
          limit
        )
      );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user
export const getUser = async (req, res) => {
  let { email } = req.body;
  try {
    email = email.toLowerCase();

    const userFound = await User.findOne({ email: email }).select("-password");
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User found successfully", user: userFound });
  } catch (error) {
    res.status(400).json({ message: "error ocuured", error: error.message });
  }
};

// Update User
export const updateUser = async (req, res) => {
  const { _id, name, email, password, aiAccess } = req.body;
  try {
    if (!_id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const u =await User.findOne({_id});
    if (u.aiAccess === false && aiAccess === true) {
      
      notifyUser(
        _id,
        "access-enabeled",
        new Notification({
          title:"AI Access Granted",
         message: "Your AI access has been granted. You can now use the AI to diagnose your scans.",
        type: "success",
        }
        )
      );
    }
    else if (u.aiAccess === true && aiAccess === false) {
      notifyUser(
        _id,
        "access-disabeled",
        new Notification({
          title:"AI Access Blocked",
         message: "Your AI access has been revoked. You will no longer be able to use the AI to diagnose your scans.",
        type: "warning",
        }
        )
      );
    }
   
    const user = await User.updateOne(
      { _id },
      {
        $set: {
          name,
          email,
          password,
          aiAccess,
        },
      }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!aiAccess === null) {
      if (aiAccess === "true") {
          
      }
    }
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create User
export const createUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    email = email.toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating admin user", error: error.message });
  }
};
export const addRole = async (req, res) => {
  const { userId, role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: `User role updated to ${role}` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserScanCounts = async (req, res) => {
  try {
    const scanCounts = await MriScan.aggregate([
      {
        $group: {
          _id: "$userId",
          scanCount: { $sum: 1 },
        },
      },
      {
        $sort: { scanCount: -1 },
      },
      {
        $limit: 5,
      },
    ]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const changeAccess = async (req, res) => {
  const { userId, block } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { aiAccess: block },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res
      .status(200)
      .json({ message: `User AI access ${block ? "blocked" : "unblocked"}` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Delete User
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(id).select("-password");

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(400).json({ message: "error ocuured", error: error.message });
  }
};

export const createAdminUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    email = email.toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin user
    const newAdmin = new User({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();

    res
      .status(201)
      .json({ message: "Admin user created successfully", user: newAdmin });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating admin user", error: error.message });
  }
};

////
export const getUserStats = async (req, res) => {
  try {
    // Get time range from query params (default to last 30 days)
    const timeRange = req.query.timeRange || "30days";
    const timeFilter = getTimeFilter(timeRange);

    // Get new users (users created within the time range)
    const newUsersCount = await User.countDocuments(timeFilter);

    // Get active users (users who logged in within the time range)
    const activeUsersFilter = {};
    if (timeFilter.createdAt) {
      activeUsersFilter.lastLogin = timeFilter.createdAt;
    }
    const activeUsersCount = await User.countDocuments(activeUsersFilter);

    // Get total users count
    const totalUsersCount = await User.countDocuments();

    // Get scan count for each user
    const scanCounts = await MriScan.aggregate([
      {
        $group: {
          _id: "$userId",
          scanCount: { $sum: 1 },
        },
      },
      {
        $sort: { scanCount: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    // Get user details for the most active users based on scan count
    const userIds = scanCounts.map((item) => item._id);
    const mostActiveUsers = await User.find({
      _id: { $in: userIds },
    })
      .select("name email role lastLogin loginCount")
      .lean();

    // Combine user details with scan counts
    const mostActiveUsersWithScans = mostActiveUsers.map((user) => {
      const scanData = scanCounts.find(
        (item) => item._id?.toString() === user._id?.toString()
      );
      return {
        ...user,
        scanCount: scanData ? scanData.scanCount : 0,
      };
    });

    // Sort by scan count (highest first)
    mostActiveUsersWithScans.sort((a, b) => b.scanCount - a.scanCount);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers: totalUsersCount,
        activeUsers: activeUsersCount,
        newUsers: newUsersCount,
        timeRange: timeRange,
      },
      mostActiveUsers: mostActiveUsersWithScans,
    });
  } catch (error) {
    console.error("Error getting user stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get user statistics",
      error: error.message,
    });
  }
};
