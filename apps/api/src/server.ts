import http from "node:http";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import express, { type Express } from "express";
import morgan from "morgan";
import { io } from ".";
import { game } from "./game";

const database = [];

export const createServer = () => {
	const app = express();
	app
		.disable("x-powered-by")
		.use(morgan("dev"))
		.use(urlencoded({ extended: true }))
		.use(json())
		.use(cors());

	app.get("/teste", (req, res) => {
		io.emit("connection", game.getPlayers());

		return res.json({ message: game.getPlayers() });
	});

	app.post("/create-player", (req, res) => {
		game.setPlayer({
			socketId: Math.random().toString(),
			name: req.body.name,
		});

		console.log(game.getPlayers());

		io.emit("@players", game.getPlayers());

		res.json({ message: "ok" });
	});

	const server = http.createServer(app);

	return server;
};
