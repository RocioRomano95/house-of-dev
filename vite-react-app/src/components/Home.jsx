import React from "react";
import NavBar from "./Navbar/NavBar";
import Cards from "./Cards/Cards";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const user = useSelector((state) => state.user);
  return (
    <>
      <NavBar />
      {user.is_admin ? (
        <>
          <h3 className=" mr-auto" style={{ textTransform: "uppercase" }}>
            Propiedades
          </h3>
          <div>
            <Link to="/create-property">Agregar propiedad</Link>
          </div>
        </>
      ) : (
        <></>
      )}
      <Cards />
    </>
  );
}

export default Home;
