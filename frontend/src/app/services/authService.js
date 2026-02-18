const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const getConnectionError = () =>
  `Cannot connect to API (${API_BASE_URL}). Make sure backend is running.`;

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
        return { success: false, error: error.error || "Login failed" };
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
      return { success: false, error: getConnectionError() };
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
        return { success: false, error: error.error || "Registration failed" };
      }

      const data = await response.json();
      return { 
        success: true, 
        user: {
          id: data.id,
          email: data.email,
          name: data.name,
        },
        message: data.message || "Registration successful"
      };
    } catch (error) {
      console.error("authService.register:", error);
      return { success: false, error: getConnectionError() };
    }
  },

  async getProfile(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return { success: false, error: error.error || "Could not load profile" };
      }

      const data = await response.json();
      return { success: true, user: data };
    } catch (error) {
      console.error("authService.getProfile:", error);
      return { success: false, error: getConnectionError() };
    }
  },

  async updateProfile(updateData, token) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const error = await response.json();
        return { success: false, error: error.error || "Could not update profile" };
      }

      const data = await response.json();
      return {
        success: true,
        user: {
          id: data.id,
          email: data.email,
          name: data.name,
          token,
        },
        message: data.message || "Profile updated",
      };
    } catch (error) {
      console.error("authService.updateProfile:", error);
      return { success: false, error: getConnectionError() };
    }
  },
};

export default authService;