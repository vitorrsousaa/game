import { Attack } from "./components/attack";
import { Defense } from "./components/defense";

export function Battle() {
	const condition = localStorage.getItem("@condition");

	/**
	 * O que um atacante faz ?
	 * Ele precisa escrever código que vai fazer a função quebrar
	 */

	/**
	 * O que um defensor faz ?
	 * Ele precisa escrever testes para a função
	 */

	return (
		<div>
			<h1>battle</h1>

			{condition === "attack" && <Attack />}
			{condition === "defense" && <Defense />}
		</div>
	);
}
