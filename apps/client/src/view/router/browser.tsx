import { ROUTES } from "@/config/routes";
import { Battle } from "@/pages/Battle";
import { Home } from "@/pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="*" element={<>Error page</>} />
				<Route path={ROUTES.HOME} element={<Home />} />
				<Route path={ROUTES.BATTLE} element={<Battle />} />
			</Routes>
		</BrowserRouter>
	);
}
