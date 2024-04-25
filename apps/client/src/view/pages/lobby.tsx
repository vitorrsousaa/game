import { socket2 } from "@/config/socket";
import { Button } from "@repo/ui";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Lobby() {
	const [players, setPlayers] = useState<{ name: string }[]>([]);

	const navigate = useNavigate();

	useLayoutEffect(() => {
		socket2.on("@players", (players: { name: string }[]) => {
			console.log(players);
			setPlayers(players);
		});
	}, []);

	function clickAttack() {
		localStorage.setItem("@condition", "attack");
		navigate("/battle");
	}

	function clickDefense() {
		localStorage.setItem("@condition", "defense");
		navigate("/battle");
	}

	return (
		<div className="h-full flex items-center justify-center">
			<main className="flex-1 px-10 flex flex-col gap-4 items-center py-16 max-w-3xl mx-auto border-blue-100 border rounded-2xl shadow">
				<h1>Capture the test</h1>

				{players.map((player) => (
					<span key={player.name}>{player.name}</span>
				))}

				<strong className="uppercase">players 1/5</strong>

				<div className="w-full h-full flex gap-2">
					<div className="bg-red-400 w-full rounded-lg p-2 flex flex-col items-center">
						<strong>Attack</strong>
					</div>
					<div className="bg-blue-400 w-full rounded-lg p-2 flex flex-col items-center">
						<strong>Defense</strong>
					</div>
				</div>

				<div className="flex w-full justify-center space-x-4">
					<ul className="items-center space-y-1 md:inline-flex md:space-x-1 md:space-y-0">
						<Button className="capitalize" onClick={clickAttack}>
							attack
						</Button>
						<Button
							className="capitalize"
							variant="secondary"
							onClick={clickDefense}
						>
							defense
						</Button>
					</ul>
				</div>
			</main>
		</div>
	);
}
