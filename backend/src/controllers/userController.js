class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async getProfile(req, res) {
    try {
      const userId = req.user.id; // Obtained from auth middleware
      const user = await this.userService.getUserById(userId);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const updateData = req.body;

      if (!updateData.name) {
        return res.status(400).json({ error: "Name is required to update" });
      }

      const result = await this.userService.updateUser(userId, updateData);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async changePassword(req, res) {
    try {
      const userId = req.user.id;
      const { oldPassword, newPassword, confirmPassword } = req.body;

      if (!oldPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({ error: "All password fields are required" });
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: "New passwords do not match" });
      }

      const result = await this.userService.changePassword(userId, oldPassword, newPassword);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deleteProfile(req, res) {
    try {
      const userId = req.user.id;
      const { password } = req.body;

      if (!password) {
        return res.status(400).json({ error: "Password is required to delete the account" });
      }

      const result = await this.userService.deleteUser(userId, password);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default UserController;
