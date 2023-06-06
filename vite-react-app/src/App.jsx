import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home";
import Login from "./components/Login/Login";
import axios from "axios";
import { axiosURL } from "./settings/url";
import { useDispatch } from "react-redux";
import { setLogin } from "./state/user";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${axiosURL}/api/users/me`, { withCredentials: true })
      .then((resp) => dispatch(setLogin(resp.data)))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
