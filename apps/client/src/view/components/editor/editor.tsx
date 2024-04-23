import StarterKit from "@tiptap/starter-kit";

import "./styles/placeholder.css";

import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorBlock } from "./plugins/editor-block";

import { EditorContent, useEditor } from "@tiptap/react";
import { withEditorContext } from "./editor.hoc";
import { TrailingNode } from "./plugins/trailing-node";

function EditorComponent() {
	const editor = useEditor({
		editorProps: {
			attributes: {
				class: "prose prose-invert focus:outline-none",
			},
		},
		extensions: [
			Document.extend({
				content: "editorBlock",
			}),
			StarterKit.configure({
				codeBlock: false,
				document: false,
			}),
			Placeholder.configure({
				placeholder: ({ node }) => {
					if (node.type.name === "heading") {
						return "Untitled";
					}

					if (node.type.name === "editorBlock") {
						return "";
					}

					return "Type '/' to see commands...";
				},
			}),
			EditorBlock,
			TrailingNode,
		],
		content: "",
	});

	return <EditorContent editor={editor} />;
}

export const Editor = withEditorContext(EditorComponent);
