import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key_here";

class AuthService {
  constructor(modelOrModels) {
    this.User = modelOrModels?.User || modelOrModels;
  }

  async register(email, password, name) {
    try {
      // Validate that the user does not exist
      const existingUser = await this.User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error("Email is already registered");
      }

      // Create user (hash is done in the beforeCreate model hook)
      const user = await this.User.create({ email, password, name });
      
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        message: "Registration successful",
      };
    } catch (error) {
      throw new Error(`Registration error: ${error.message}`);
    }
  }

  async login(email, password) {
    try {
      const user = await this.User.findOne({ where: { email } });
      if (!user) {
        throw new Error("Incorrect email or password");
      }

      // Compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Incorrect email or password");
      }

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        SECRET_KEY,
        { expiresIn: "30m" }
      );

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        token,
        message: "Login successful",
      };
    } catch (error) {
      throw new Error(`Login error: ${error.message}`);
    }
  }

  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      return decoded;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }

  async logout() {
    // If you use refresh tokens in DB, you can invalidate them here
    return { message: "Logout successful" };
  }
}

export default AuthService;
