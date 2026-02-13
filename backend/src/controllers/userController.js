class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async getProfile(req, res) {
    try {
      const userId = req.user.id; // Se obtiene del middleware de autenticación
      const user = await this.userService.getUserById(userId);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const { email, name } = req.body;

      if (!email && !name) {
        return res.status(400).json({ error: "Proporciona al menos un campo para actualizar" });
      }

      const result = await this.userService.updateUser(userId, { email, name });
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
        return res.status(400).json({ error: "Todos los campos de contraseña son requeridos" });
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: "Las nuevas contraseñas no coinciden" });
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
      const result = await this.userService.deleteUser(userId);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default UserController;
