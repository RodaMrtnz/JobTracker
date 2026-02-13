import User from "../models/User.js";
import UserService from "../services/userService.js";
import UserController from "../controllers/userController.js";
import AuthService from "../services/authService.js";
import AuthController from "../controllers/authController.js";

const userService = new UserService(User);
const userController = new UserController(userService);

const authService = new AuthService(User);
const authController = new AuthController(authService);


export {
    userController,
    authController,
};
