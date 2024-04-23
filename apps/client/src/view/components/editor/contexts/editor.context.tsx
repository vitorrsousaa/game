import { createContext } from "react";

type EditorContextValue = {
	initialTemplate?: string;
};

export const EditorContext = createContext<EditorContextValue | null>(null);

interface EditorContextProviderProps {
	children: React.ReactNode;
	initialTemplate?: string;
}

export function EditorContextProvider(props: EditorContextProviderProps) {
	const { initialTemplate, children } = props;

	return (
		<EditorContext.Provider value={{ initialTemplate }}>
			{children}
		</EditorContext.Provider>
	);
}
