import React from "react";
import NavBar from "./Navbar/NavBar";
import Cards from "./Cards/Cards";
import { useSelector } from "react-redux";

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
        </>
      ) : (
        <></>
      )}
      <Cards />
    </>
  );
}

export default Home;
