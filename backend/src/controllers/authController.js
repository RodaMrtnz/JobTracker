class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async register(req, res) {
    try {
      const { email, password, name } = req.body;

      // Validar campos requeridos
      if (!email || !password || !name) {
        return res.status(400).json({ error: "Email, contraseña y nombre son requeridos" });
      }

      const result = await this.authService.register(email, password, name);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email y contraseña son requeridos" });
      }

      const result = await this.authService.login(email, password);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  async logout(req, res) {
    try {
      const result = await this.authService.logout();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async verifyToken(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      
      if (!token) {
        return res.status(401).json({ error: "Token no provisto" });
      }

      const decoded = this.authService.verifyToken(token);
      return res.status(200).json({ valid: true, user: decoded });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default AuthController;
