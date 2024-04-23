import http from "node:http";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import express, { type Express } from "express";
import morgan from "morgan";

const database = ["1", "2"];

export const createServer = () => {
	const app = express();
	app
		.disable("x-powered-by")
		.use(morgan("dev"))
		.use(urlencoded({ extended: true }))
		.use(json())
		.use(cors());

	app.get("/teste", (req, res) => {
		database.push("3");
		return res.json({ message: database });
	});

	const server = http.createServer(app);

	return server;
};
