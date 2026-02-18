import AuthService from "../services/authService.js";

const authService = new AuthService({});

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader?.startsWith("Bearer ")
  ? authHeader.split(" ")[1]
  : null;

    if (!token) {
      return res.status(401).json({ error: "Token no provisto" });
    }

    const decoded = authService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};
