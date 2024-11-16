import express from "express";

const app = express();

// Middleware...
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes imports...
import userRoutes from "./routes/user-routes";

app.use("/", userRoutes);

export { app };
