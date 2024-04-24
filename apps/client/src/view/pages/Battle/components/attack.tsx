import { Editor } from "@/components/editor";
import { templates } from "@/components/editor/templates";

export function Attack() {
	return (
		<div>
			<h1>attack</h1>
			<span>
				Você deve escrever código nessa função com intuito de fazer a função
				quebrar
			</span>{" "}
			<br />
			<span>
				Para testar se esta quebrando, você pode clicar no botão ao lado para
				executar a função
			</span>
			<Editor template={templates[0]} mode="attack" />
		</div>
	);
}
