import { CircleIcon, LightningBoltIcon } from "@radix-ui/react-icons";
import { Button } from "@repo/ui";
import { NodeViewWrapper } from "@tiptap/react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import ANSIToHTML from "ansi-to-html";
import { useState } from "react";
import { getWebContainerInstance } from "../../../../app/libs/web-container";
import { templates } from "../templates";

const ANSIConverter = new ANSIToHTML();

export function WebContainerEditor() {
	const [code, setCode] = useState(templates[0].content);
	const [output, setOutput] = useState<string[]>([]);
	const [isRunning, setIsRunning] = useState(false);

	async function handleEvaluateCode() {
		setIsRunning(true);

		const webContainer = await getWebContainerInstance();

		await webContainer.mount({
			"index.js": {
				file: {
					contents: code,
				},
			},
			"package.json": {
				file: {
					contents: `
            {
              "name": "example-app",
              "type": "module",
              "dependencies": {
                "chalk": "latest",
                "isomorphic-fetch": "latest"
              },
              "scripts": {
                "start": "node index.js"
              }
            }
          `.trim(),
				},
			},
		});

		const install = await webContainer.spawn("pnpm", ["i"], {
			// output: false,
		});

		setOutput(["🔥 Installing dependencies!"]);

		install.output.pipeTo(
			new WritableStream({
				write(data) {
					setOutput((state) => [...state, ANSIConverter.toHtml(data)]);
				},
			}),
		);

		await install.exit;

		setOutput((state) => [
			...state,
			"---------",
			"🚀 Running the application!",
		]);

		const start = await webContainer.spawn("pnpm", ["start"]);

		start.output.pipeTo(
			new WritableStream({
				write(data) {
					setOutput((state) => [...state, ANSIConverter.toHtml(data)]);
				},
			}),
		);

		setIsRunning(false);
	}

	function handleStopEvaluation() {
		setIsRunning(false);
	}

	return (
		<NodeViewWrapper className="not-prose flex flex-row">
			<CodeEditor
				value={code}
				language="js"
				placeholder="Please enter JS code."
				onChange={(event) => setCode(event.target.value)}
				minHeight={80}
				padding={20}
				spellCheck={false}
				className="text-sm bg-[#21202e] font-monospace rounded w-full"
			/>
			<div
				className="bg-black p-5 min-h-[64px] rounded mt-2 text-sm relative w-full"
				contentEditable={false}
				spellCheck={false}
			>
				{output.length > 0 ? (
					<div className="font-monospace text-xs leading-loose text-white">
						{output.map((line) => {
							return (
								// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
								<p key={line} dangerouslySetInnerHTML={{ __html: line }} />
							);
						})}
					</div>
				) : (
					<span className="text-zinc-400">
						Click on run to evaluate the code.
					</span>
				)}

				<div className="absolute right-4 top-4">
					{isRunning ? (
						<Button
							onClick={handleStopEvaluation}
							contentEditable={false}
							disabled
							className="text-xs bg-zinc-500 rounded px-3 py-2 flex items-center gap-1 text-white  hover:bg-zinc-600"
						>
							<CircleIcon
								// size={14}
								className="animate-spin font-bold text-white"
							/>
							Stop running
						</Button>
					) : (
						<Button
							onClick={handleEvaluateCode}
							contentEditable={false}
							className="gap-1"
							// className="text-xs bg-emerald-500 rounded px-3 py-2 flex items-center gap-1 text-white font-semibold hover:bg-emerald-600"
						>
							<LightningBoltIcon
							//  weight="bold"
							//  color="#FFF"
							// size={14}
							/>
							Run code
						</Button>
					)}
				</div>
			</div>
		</NodeViewWrapper>
	);
}

WebContainerEditor.displayName = "WebContainerEditor";
