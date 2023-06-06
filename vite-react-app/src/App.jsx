import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home";
import Login from "./components/Login";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
    <Routes>
       <Route path="/" element={<Home/>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
   
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
