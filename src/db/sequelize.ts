import { Sequelize } from "sequelize";
import { config } from "../config";

export const sequelize = new Sequelize(
	config.database.database,
	config.database.username,
	config.database.password,
	{
		dialect: "mysql",
		host: config.database.host,
	}
);

try {
	sequelize.authenticate();
	console.log("Connection has been established successfully.");
} catch (error) {
	console.error("Unable to connect to the database:", error);
}
