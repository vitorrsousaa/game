import { ThemeProvider } from "@repo/ui";
import { Toaster } from "react-hot-toast";
import { Router } from "./router/browser";

function App() {
	return (
		<>
			<ThemeProvider defaultTheme="dark">
				<Router />

				<Toaster />
			</ThemeProvider>
		</>
	);
}

export default App;
