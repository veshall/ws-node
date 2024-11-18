import { config as dotenvConfig } from "dotenv";
import { app } from "./app";
import connectDB from "./db/mongodb";

dotenvConfig();

connectDB()
	.then(() => {
		app.listen(process.env.PORT || 8080, () => {
			console.log(`Server is running at port : ${process.env.PORT}`);
		});
	})
	.catch((error) => {
		console.log("ERROR: ", error);
		throw error;
	});
