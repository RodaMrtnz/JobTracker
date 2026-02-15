
import { sequelize } from "../config/db.js";
import User from "./User.js";
import Company from "./Company.js";
import Application from "./Application.js";
import Status from "./Status.js";

User.hasMany(Application, { foreignKey: "userId" });
Application.belongsTo(User, { foreignKey: "userId" });

Company.hasMany(Application, { foreignKey: "companyId" });
Application.belongsTo(Company, { foreignKey: "companyId" });

Status.hasMany(Application, { foreignKey: "statusName", sourceKey: "name" });
Application.belongsTo(Status, { foreignKey: "statusName", targetKey: "name" });

export { sequelize, User, Company, Application, Status };

