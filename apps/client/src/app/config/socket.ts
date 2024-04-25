import socketIo, { io } from "socket.io-client";

export const socket = io("http://localhost:5001");

export const socket2 = socketIo("http://localhost:5001", {
	transports: ["websocket"],
});
