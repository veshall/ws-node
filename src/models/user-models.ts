import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
	{
		username: {
			type: String,
			require: true,
			unique: true,
			trim: true,
			index: true,
		},
		password: {
			type: String,
			require: ["Password is required!"],
		},
		email: {
			type: String,
			unique: true,
			trim: true,
		},
	},
	{ timestamps: true }
);

export const User = mongoose.model("User", userSchema);
