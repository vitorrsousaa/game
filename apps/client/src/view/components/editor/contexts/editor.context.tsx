import { createContext } from "react";

type EditorContextValue = {
	initialTemplate?: string;
	template?: {
		name: string;
		content: string;
		test: string;
	};
	mode: "attack" | "defense";
};

export const EditorContext = createContext<EditorContextValue | null>(null);

interface EditorContextProviderProps {
	children: React.ReactNode;
	initialTemplate?: string;
	mode: "attack" | "defense";
	template?: {
		name: string;
		content: string;
		test: string;
	};
}

export function EditorContextProvider(props: EditorContextProviderProps) {
	const { initialTemplate, children, mode, template } = props;

	return (
		<EditorContext.Provider value={{ initialTemplate, mode, template }}>
			{children}
		</EditorContext.Provider>
	);
}
