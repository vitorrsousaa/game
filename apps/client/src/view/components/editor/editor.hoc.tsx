import { EditorContextProvider } from "./contexts/editor.context";
import type { EditorProps } from "./editor.types";

export function withEditorContext(Component: React.ComponentType<unknown>) {
	Component.displayName = "withEditorContext";

	return function WithEditorContext(props: EditorProps) {
		return (
			<EditorContextProvider
				initialTemplate={props.initialTemplate}
				template={props.template}
				mode={props.mode}
			>
				<Component />
			</EditorContextProvider>
		);
	};
}
