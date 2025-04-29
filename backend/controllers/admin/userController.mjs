import bcrypt from "bcryptjs";
import User from "../../models/User.mjs";

export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({role:'user'}).select("-password");
  
      res.status(200).json(users);
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

  export const changeAccess = async (req, res) => {
    const { userId, block } = req.body; 
    try {
      const user = await User.findByIdAndUpdate(userId, { aiAccess: block }, { new: true });
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: `User AI access ${block ? "blocked" : "unblocked"}` });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  //Delete User
  export const deleteUser = async (req, res) => {
    const id = req.query.id;
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
        role: "admin"
      });
  
      await newAdmin.save();
  
      res.status(201).json({ message: "Admin user created successfully", user: newAdmin });
    } catch (error) {
      res.status(500).json({ message: "Error creating admin user", error: error.message });
    }
  };
  
export const addRole=async (req,res)=>{
  try{
    const result = await User.updateMany(
      { role: { $exists: false } },
      { $set: { role: 'user' } }
    );
    res.status(200).json({ message: "Role added successfully", result });
  }catch(error){
    res.status(500).json({ message: "Error adding role", error: error.message });
  }
}