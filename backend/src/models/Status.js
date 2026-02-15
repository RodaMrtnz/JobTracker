import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Status = sequelize.define("Status", 
    {
        name: {
            type: DataTypes.ENUM("rejected", "accepted", "applied", "interviewing", "offer"),
            allowNull: false,
            unique: true,
            primaryKey: true,
     },
     color: {
                type: DataTypes.ENUM("red", "green", "blue", "yellow", "white"),
                // red = rejected, green = accepted, blue = applied, yellow = interviewing, white = offer
                allowNull: false,
            },
    });

export default Status;
