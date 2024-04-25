import { log } from "@repo/logger";
import socketm, { Server } from "socket.io";
import { game } from "./game";
import { createServer } from "./server";

const port = process.env.PORT || 5001;
const server = createServer();

export const io = new Server({
	...server,
	cors: {
		origin: ["http://localhost:5173"],
	},
});

io.on("connection", (socket) => {
	// biome-ignore lint/style/useTemplate: <explanation>
	console.log("socket-id:", socket.id);
});

io.listen(5001);
