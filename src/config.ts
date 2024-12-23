export const config = {
	port: process.env.PORT || 5454,
	database: {
		host: process.env.DB_HOST || "localhost",
		port: process.env.DB_PORT || 3306,
		username: process.env.DB_USERNAME || "root",
		password: process.env.DB_PASSWORD || "",
		database: process.env.DB_NAME || "database",
	},
	jwtSecret: process.env.JWT_SECRET || "secret",
};
