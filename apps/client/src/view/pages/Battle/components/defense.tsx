import { Editor } from "@/components/editor";
import { templates } from "@/components/editor/templates";

export function Defense() {
	return (
		<div>
			<h1>defense</h1>
			<span>Você deve escrever os testes para essa função</span> <br />
			<span>
				Para testar se esta quebrando, você pode clicar no botão ao lado para
				executar a função
			</span>
			<Editor
				initialTemplate={templates[0].test}
				mode="defense"
				template={templates[0]}
			/>
		</div>
	);
}
