import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";
import axios from "axios";
import { axiosURL } from "./settings/url";
import { useDispatch } from "react-redux";
import { setLogin } from "./state/user";
import { useEffect } from "react";
import PropertyDetail from "./components/Properties/PropertyDetail";
import CreateProperty from "./components/CreateProperty";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${axiosURL}/api/users/me`, { withCredentials: true })
      .then((resp) => dispatch(setLogin(resp.data)))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/create-property" element={<CreateProperty />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
