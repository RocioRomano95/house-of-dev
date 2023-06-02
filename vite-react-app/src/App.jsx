import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import NavBar from "./components/Navbar/NavBar";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
