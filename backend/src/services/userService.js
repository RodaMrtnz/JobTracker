import bcrypt from "bcrypt";

class UserService {
  constructor(modelOrModels) {
    this.User = modelOrModels?.User || modelOrModels;
  }

  async getUserById(userId) {
    try {
      const user = await this.User.findByPk(userId);
      
      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    } catch (error) {
      throw new Error(`Error al obtener usuario: ${error.message}`);
    }
  }

  async updateUser(userId, updateData) {
    try {
      const user = await this.User.findByPk(userId);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      // No permitir cambiar id ni email (email es la primaryKey)
      delete updateData.id;
      delete updateData.email;

      if (updateData.name) {
        user.name = updateData.name;
      }

      await user.save();

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        message: "Usuario actualizado exitosamente",
      };
    } catch (error) {
      throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
  }

  async changePassword(userId, oldPassword, newPassword) {
    try {
      const user = await this.User.findByPk(userId);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        throw new Error("Contraseña actual incorrecta");
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();

      return { message: "Contraseña actualizada exitosamente" };
    } catch (error) {
      throw new Error(`Error al cambiar contraseña: ${error.message}`);
    }
  }

  async deleteUser(userId) {
    try {
      const user = await this.User.findByPk(userId);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      await user.destroy();

      return { message: "Usuario eliminado exitosamente" };
    } catch (error) {
      throw new Error(`Error al eliminar usuario: ${error.message}`);
    }
  }
}

export default UserService;
