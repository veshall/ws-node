import bcrypt from "bcrypt";
import { User } from "../models/user-models";

// import types
import type { Request, Response } from "express";

class UserController {
	static async register(req: Request, res: Response) {
		try {
			// Check if the username is provided in the req body
			if (!req.body?.username) {
				return res.status(400).send({
					message: "Username is not provided",
				});
			}

			const { username, password } = req.body;

			// find if user already exists...
			const existingUser = await User.findOne({ username });

			if (existingUser) {
				return res.status(409).send({
					message: "username already exists!",
				});
			}

			const passwordHashed = await bcrypt.hash(password, 10);

			const newUser = new User({
				username,
				password: passwordHashed,
			});

			await newUser.save();

			return res.status(201).send({
				message: "User Registered!",
				user: {
					username: newUser.username,
					createdAt: newUser.createdAt,
				},
			});
		} catch (error: any) {
			// Handle any errors and respond with a 500 error
			return res.status(500).json({ error: error.message });
		}
	}

	// static async login(req, res) {}
}

export default UserController;
