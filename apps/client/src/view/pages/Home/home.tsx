import { Button } from "@repo/ui";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import socketIo from "socket.io-client";

export function Home() {
	const inputRef = useRef<HTMLInputElement>(null);

	const { isPending, mutateAsync } = useMutation({
		mutationKey: ["@create-players"],
		mutationFn: async () => {
			axios.post("http://localhost:5001/create-player", {
				name: inputRef.current?.value,
			});
		},
	});

	const navigate = useNavigate();

	async function startGame() {
		console.log(inputRef.current?.value);

		await mutateAsync();

		navigate("/lobby");
	}

	return (
		<>
			<div className="h-full flex items-center justify-center">
				<main className="flex-1 px-10 flex flex-col gap-4 items-center py-16 max-w-3xl mx-auto border-blue-100 border rounded-2xl shadow">
					<h1>Capture the test</h1>
					{isPending && "carregando...."}

					<input
						ref={inputRef}
						placeholder="nick name"
						className="text-black"
					/>

					<div className="flex gap-2">
						<Button variant={"secondary"}>Share</Button>
						<Button onClick={startGame}>Start game</Button>
					</div>
				</main>
			</div>
		</>
	);
}
