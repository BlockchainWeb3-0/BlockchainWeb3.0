import "./App.css";
import TopNav from "./components/navbar/TopNav";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Blocks from "./components/blocks/Blocks";
import Signin from "./components/sign/Signin";
import Signup from "./components/sign/Signup";
import Mining from "./components/mining/Mining";
import Mempool from "./mempool/Mempool";
import UTXO from "./components/utxo/UTXO";
import Yourkey from "./components/yourkey/Yourkey";

function App() {
    return (
        <>
            <TopNav />
            <div className="main-contents-container">
                <Routes>
                    <Route path="/">
                        <Route index element={<Home />}></Route>
                        <Route path="blocks" element={<Blocks />} />
                        <Route path="mining" element={<Mining />} />
                        <Route path="mempool" element={<Mempool />} />
                        <Route path="utxo" element={<UTXO />} />
                        <Route path="signin" element={<Signin />} />
                        <Route path="signup" element={<Signup />} />
                        <Route path="yourkey" element={<Yourkey />} />
                    </Route>
                </Routes>
            </div>
        </>
    );
}

export default App;
