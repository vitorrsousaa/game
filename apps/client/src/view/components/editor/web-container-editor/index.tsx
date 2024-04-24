import { CircleIcon, LightningBoltIcon } from "@radix-ui/react-icons";
import { Button, ScrollArea } from "@repo/ui";
import { NodeViewWrapper } from "@tiptap/react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import ANSIToHTML from "ansi-to-html";
import { useState } from "react";
import { getWebContainerInstance } from "../../../../app/libs/web-container";
import { useEditorContext } from "../contexts/editor.context.hook";

const ANSIConverter = new ANSIToHTML();

export function WebContainerEditor() {
	const { template, mode } = useEditorContext();
	const condition = localStorage.getItem("@condition");

	const [code, setCode] = useState(template?.content || "");
	const [testCode, setTestCode] = useState(template?.test || "");
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
			"index.test.js": {
				file: {
					contents: testCode,
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
								"vitest": "latest",
								"@vitest/spy": "latest"
              },
              "scripts": {
                "start": "node index.js",
								"test": "vitest run"
              }
            }
          `.trim(),
				},
			},
			"vitest.config.js": {
				file: {
					contents: `
					import { defineConfig } from 'vitest/config';

					export default defineConfig({
						test:{
							// Add your test files here
							reporters: ['basic'],
							globals: true,
							files: ['**/*.test.js'],
						}
					});
					`,
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

		const start =
			mode === "attack"
				? await webContainer.spawn("pnpm", ["start"])
				: await webContainer.spawn("pnpm", ["test"]);

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
		<NodeViewWrapper className="not-prose flex flex-row gap-2">
			<CodeEditor
				value={mode === "attack" ? code : testCode}
				language="js"
				placeholder="Please enter JS code."
				onChange={(event) =>
					mode === "attack"
						? setCode(event.target.value)
						: setTestCode(event.target.value)
				}
				minHeight={80}
				padding={20}
				spellCheck={false}
				className="text-sm bg-[#21202e] font-monospace rounded w-1/2"
			/>
			<div
				className="bg-black p-5 min-h-[64px] rounded mt-2 text-sm relative w-1/2"
				contentEditable={false}
				spellCheck={false}
			>
				<ScrollArea>
					<div className="max-h-80">
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
					</div>
				</ScrollArea>

				<div className="absolute right-4 top-4">
					{isRunning ? (
						<Button
							onClick={handleStopEvaluation}
							contentEditable={false}
							disabled
							className="text-xs bg-zinc-500 rounded px-3 py-2 flex items-center gap-1 text-white  hover:bg-zinc-600"
						>
							<CircleIcon className="animate-spin text-white" />
							Stop running
						</Button>
					) : (
						<Button
							onClick={handleEvaluateCode}
							contentEditable={false}
							className="gap-1"
							// className="text-xs bg-emerald-500 rounded px-3 py-2 flex items-center gap-1 text-white font-semibold hover:bg-emerald-600"
						>
							<LightningBoltIcon />
							Run code
						</Button>
					)}
				</div>
			</div>
		</NodeViewWrapper>
	);
}

WebContainerEditor.displayName = "WebContainerEditor";
