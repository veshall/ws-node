import bcrypt from "bcrypt";
import fs from "node:fs";
import nodemailer from "nodemailer";
import { User } from "../models/user-models";

// import types
import type { NextFunction, Request, Response } from "express";
import { isEmpty } from "lodash";

const register = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	try {
		// Check if the username is provided in the req body
		if (!req.body?.username) {
			return res.status(400).send({
				message: "Username is not provided",
			});
		}

		const { username, password, email } = req.body;

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
			email,
		});

		await newUser.save();

		// sending mail for confirmation...
		const htmlTemplate = await fs.readFileAsync("", "utf-8");

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: "vishalpaliwal51@gmail.com",
				pass: "Vishal24365@1234",
				clientId: process.env.OAUTH_CLIENTID,
				clientSecret: process.env.OAUTH_CLIENT_SECRET,
				refreshToken: process.env.OAUTH_REFRESH_TOKEN,
			},
		} as nodemailer.TransportOptions);

		const mail = async (payload: any) => {
			try {
				let resp: any = {};
				if (!isEmpty(payload)) {
					resp = transporter.sendMail(payload, (err, info) => {
						if (err) return err;
						console.log("mail sent");
						return info;
					});
					return resp;
				}
			} catch (error: any) {
				console.log("mail failed");
				return error.message;
			}
		};

		const mailOptions = {
			from: "vishal.paliwal@woodenstreet.com",
			to: email,
			subject: "Welcome to WoodenStreet!",
			text: "Thank you for registering...:)",
		};

		await mail(mailOptions);

		return res.status(201).send({
			message: "User Registered!",
			user: {
				username: newUser.username,
				createdAt: newUser.createdAt,
			},
		});
	} catch (error: any) {
		// Handle any errors and respond with a 500 error
		// return res.status(500).json({ error: error.message });
		next(error);
	}
};

// static async login(req: Request, res: Response) {
// 	try {
// 		if (!req.body?.username || !req.body?.password) {
// 			return res.status(400).send({
// 				message: "Credintials are incomplete!",
// 			});
// 		}
// 	} catch (error) {}
// }

export { register };
