import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Application = sequelize.define("Application", 
    {   id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
        companyId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "Company",
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
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "Status",
            key: "name",
        },
    },
});

export default Application;