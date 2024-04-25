import { ThemeProvider } from "@repo/ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Router } from "./router/browser";

const queryClient = new QueryClient();

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider defaultTheme="dark">
					<Router />

					<Toaster />
				</ThemeProvider>
			</QueryClientProvider>
		</>
	);
}

export default App;
