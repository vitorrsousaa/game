import { log } from "@repo/logger";
import { Server } from "socket.io";
import { createServer } from "./server";

const port = process.env.PORT || 5001;
const server = createServer();

export const io = new Server(server);

io.on("connection", (socket) => {
	// biome-ignore lint/style/useTemplate: <explanation>
	console.log("socket-id:", socket.id);
});

server.listen(port, () => {
	log(`api running on ${port}`);
});
