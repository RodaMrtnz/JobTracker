import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Application = sequelize.define("Application", 
    {   id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
        companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Companies",
            key: "id",
        },
    },
        position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
        technology: {
        type: DataTypes.STRING,
        allowNull: false,
    },
        description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
        jobLink: {
        type: DataTypes.STRING,
        allowNull: false,
    },
        
    statusName: {
        type: DataTypes.ENUM("rejected", "accepted", "applied", "interviewing", "offer"),
        allowNull: false,
        references: {
            model: "Statuses",
            key: "name",
        },
    },
    userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: "Users",
        key: "id",
    },
    },

});

export default Application;