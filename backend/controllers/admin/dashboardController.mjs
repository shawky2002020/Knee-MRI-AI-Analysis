import User from "../../models/User.mjs";
export default class dashboardController {
  static async index(req, res) {
    const users = await User.find({});
    res.render("admin/dashboard", { users });
  }
  static async delete(req, res) {
    const user = await User.findByIdAndDelete(req.params.id);
    res.redirect("/admin/dashboard");
  }
}
