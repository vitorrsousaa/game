import { Button } from "@repo/ui";
import { useNavigate } from "react-router-dom";
import viteLogo from "/vite.svg";

export function Home() {
	const navigate = useNavigate();

	function clickAttack() {
		localStorage.setItem("@condition", "attack");
		navigate("/battle");
	}

	function clickDefense() {
		localStorage.setItem("@condition", "defense");
		navigate("/battle");
	}

	return (
		<div className="mt-8 items-center space-y-4">
			<div className="flex w-full justify-center text-3xl font-bold gap-2">
				<a href="https://vitejs.dev" target="_blank" rel="noreferrer">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				Vite + React
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
		</div>
	);
}
