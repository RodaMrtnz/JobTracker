import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Company = sequelize.define("Company", 
    {   id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
        name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
        industry: {
        type: DataTypes.STRING,
        allowNull: false,
    },

});

export default Company;