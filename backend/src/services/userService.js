import bcrypt from "bcrypt";

class UserService {
  constructor(modelOrModels) {
    this.User = modelOrModels?.User || modelOrModels;
    this.Application = modelOrModels?.Application;
  }

  async getUserById(userId) {
    try {
      const user = await this.User.findByPk(userId);
      
      if (!user) {
        throw new Error("User not found");
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  async updateUser(userId, updateData) {
    try {
      const user = await this.User.findByPk(userId);

      if (!user) {
        throw new Error("User not found");
      }

      // Do not allow changing id or email (email is the primaryKey)
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
        message: "User updated successfully",
      };
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async changePassword(userId, oldPassword, newPassword) {
    try {
      const user = await this.User.findByPk(userId);

      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        throw new Error("Current password is incorrect");
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();

      return { message: "Password updated successfully" };
    } catch (error) {
      throw new Error(`Error changing password: ${error.message}`);
    }
  }

  async deleteUser(userId, password) {
    try {
      const user = await this.User.findByPk(userId);

      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Incorrect password");
      }

      const transaction = await this.User.sequelize.transaction();

      try {
        if (this.Application) {
          await this.Application.destroy({ where: { userId }, transaction });
        }

        await user.destroy({ transaction });

        await transaction.commit();
      } catch (innerError) {
        await transaction.rollback();
        throw innerError;
      }

      return { message: "User deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

export default UserService;
