import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import axios from "axios";
import { axiosURL } from "./settings/url";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "./state/user";
import { useEffect } from "react";
import PropertyDetail from "./components/Properties/PropertyDetail";
import CreateProperty from "./components/CreateProperty";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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

        <Route
          path="/create-property"
          element={
            user.is_admin ? <CreateProperty /> : <div>No tienes permisos </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
