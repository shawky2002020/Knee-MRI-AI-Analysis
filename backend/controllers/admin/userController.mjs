import User from "../../models/User.mjs";

export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select("-password");
  
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
  
