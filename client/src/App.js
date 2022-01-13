import "./App.css";
import TopNav from "./components/navbar/TopNav";
import SignIn from "./components/signin/SignIn";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainPage from "./components/mainPage/MainPage";

function App() {
	return (
		<>
			<TopNav/>
      <RouterComp/>
		</>
	);
}

function RouterComp () {
  return (
    <>
      <BrowserRouter>
				<Routes>
					<Route path="/" >
						<Route index element={<MainPage />} />
						<Route path="sign" element={<SignIn />}>
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
    </>
  )
}

export default App;
