import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "tu_clave_secreta_aqui";

class AuthService {
  constructor(modelOrModels) {
    this.User = modelOrModels?.User || modelOrModels;
  }

  async register(email, password, name) {
    try {
      // Validar que no exista el usuario
      const existingUser = await this.User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error("El email ya está registrado");
      }

      // Crear usuario (el hash se hace en el hook beforeCreate del modelo)
      const user = await this.User.create({ email, password, name });
      
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        message: "Registro exitoso",
      };
    } catch (error) {
      throw new Error(`Error en registro: ${error.message}`);
    }
  }

  async login(email, password) {
    try {
      const user = await this.User.findOne({ where: { email } });
      if (!user) {
        throw new Error("Email o contraseña incorrectos");
      }

      // Comparar contraseña
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Email o contraseña incorrectos");
      }

      // Generar JWT
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
        message: "Login exitoso",
      };
    } catch (error) {
      throw new Error(`Error en login: ${error.message}`);
    }
  }

  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      return decoded;
    } catch (error) {
      throw new Error("Token inválido o expirado");
    }
  }

  async logout() {
    // Si usas refresh tokens en BD, puedes invalidarlos aquí
    return { message: "Logout exitoso" };
  }
}

export default AuthService;
