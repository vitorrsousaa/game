export interface EditorProps {
	initialTemplate?: string;
	mode: "attack" | "defense";
	template?: {
		name: string;
		content: string;
		test: string;
	};
}
