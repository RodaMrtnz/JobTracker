import User from "../models/User.js";
import UserService from "../services/userService.js";
import UserController from "../controllers/userController.js";
import AuthService from "../services/authService.js";
import AuthController from "../controllers/authController.js";
import Application from "../models/Application.js";
import Company from "../models/Company.js";
import Status from "../models/Status.js";
import ApplicationService from "../services/applicationServices.js";
import ApplicationController from "../controllers/applicationController.js";
import CompaniesService from "../services/companiesServices.js";
import CompaniesController from "../controllers/companiesController.js";


const userService = new UserService(User);
const userController = new UserController(userService);

const authService = new AuthService(User);
const authController = new AuthController(authService);

const applicationService = new ApplicationService({ Application, Company, Status });
const applicationController = new ApplicationController(applicationService);

const companiesService = new CompaniesService({ Company });
const companiesController = new CompaniesController(companiesService);


export {
    userController,
    authController,
    applicationController,
    companiesController,
};
