import "./App.css";
import TopNav from "./components/navbar/TopNav";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Blocks from "./components/blocks/Blocks";
import Signin from "./components/sign/Signin";
import Signup from "./components/sign/Signup";
import Mempool from "./components/mempool/Mempool";
import Transaction from "./components/transaction/Transaction";

function App() {
	return (
		<>
      <TopNav />
      <div className="main-contents-container">
        <Routes>
          <Route path="/" >
            <Route index element={<Home />}></Route>
            <Route path="blocks" element={<Blocks />} />
            <Route path="mempool" element={<Mempool />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </div>
		</>
	);
}

export default App;
