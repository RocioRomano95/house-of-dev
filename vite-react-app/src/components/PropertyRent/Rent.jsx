import React, { useEffect, useState } from "react";
import axios from "axios";
import { axiosURL } from "../../settings/url";

const Rent = () => {
  const [filterProperities, setFilterProperities] = useState([]);

  useEffect(() => {
    axios
      .get(`${axiosURL}/api/properties`)
      .then((properties) => {
        console.log("PROPIEDADES PARA RENTAR", properties);
        setFilterProperities(properties.data);
      })
      .catch((err) => console.log(err));
  }, []);

  /* return (
    
  )*/
};

export default Rent;
