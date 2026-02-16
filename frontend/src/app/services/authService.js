const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const authService = {
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        return { success: false, error: error.error || "Error en login" };
      }

      const data = await response.json();
      return { 
        success: true, 
        user: {
          id: data.id,
          email: data.email,
          name: data.name,
          token: data.token
        }
      };
    } catch (error) {
      console.error("authService.login:", error);
      return { success: false, error: "Error de conexión" };
    }
  },

  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          name: userData.name,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        return { success: false, error: error.error || "Error al registrar" };
      }

      const data = await response.json();
      return { 
        success: true, 
        user: {
          id: data.id,
          email: data.email,
          name: data.name,
        }
      };
    } catch (error) {
      console.error("authService.register:", error);
      return { success: false, error: "Error al crear la cuenta" };
    }
  },
};

export default authService;