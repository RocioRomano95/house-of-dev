import React, { useState } from "react";
//import useInput from "../hooks/useInput";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosURL } from "../../settings/url";
import { useDispatch, useSelector } from "react-redux";
import { setLogOut } from "../../state/user";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); //con este hook puedo traer la informacion del usuario
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchClick = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .get(`${axiosURL}/api/users/logout`, { withCredentials: true })
      .then((res) => {
        console.log("LOGOUT", res.data);
        dispatch(setLogOut({}));
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div style={{ height: "120px", width: "100vw" }}>
      <Navbar expand="lg" className="custom-navbar">
        <Navbar.Brand href="#home" className="mr-auto custom-svg-container">
          <svg
            width="107"
            height="34"
            viewBox="0 0 107 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.5H0.5V2V31.97V32.47H1H7.57H8.07V31.97V19.69H19.805V31.97V32.47H20.305H26.92H27.42V31.97V2V1.5H26.92H20.305H19.805V2V13.11H8.07V2V1.5H7.57H1Z"
              fill="#F7F3EE"
              stroke="#F7F3EE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M32.8218 25.0003C31.506 22.4971 30.8619 19.6482 30.8619 16.48C30.8619 13.2835 31.5053 10.4193 32.8218 7.91472C34.1384 5.40995 36.0114 3.4539 38.4296 2.06747C40.8518 0.678722 43.6381 0 46.7569 0C49.8459 0 52.6154 0.678791 55.0351 2.06503C57.4527 3.42 59.3268 5.34505 60.6446 7.82001C61.963 10.296 62.6069 13.1321 62.6069 16.3C62.6069 19.525 61.9642 22.4175 60.6495 24.9506L60.6471 24.9553C59.3315 27.4581 57.4612 29.4268 55.048 30.8425L55.0393 30.8476C52.6186 32.2355 49.8477 32.915 46.7569 32.915C43.6661 32.915 40.8953 32.2354 38.4746 30.8475C36.0585 29.4623 34.1726 27.5091 32.8265 25.0091L32.8218 25.0003ZM51.889 22.8985C53.1986 21.3531 53.9019 19.2482 53.9019 16.48C53.9019 14.6804 53.5789 13.1349 52.9617 11.8199L52.9565 11.8089L52.9516 11.7977C52.3641 10.4624 51.5306 9.48766 50.4606 8.82526L50.4487 8.81788L50.4369 8.81017C49.3833 8.11631 48.1677 7.76 46.7569 7.76C45.3463 7.76 44.1113 8.11636 43.0227 8.81618L43.0175 8.81952C41.9725 9.48219 41.1327 10.4619 40.5124 11.8086C39.9214 13.1267 39.6119 14.6764 39.6119 16.48C39.6119 18.282 39.9208 19.8305 40.5108 21.1478C41.1304 22.4647 41.9735 23.4528 43.0319 24.1498C44.0825 24.8416 45.3121 25.2 46.7569 25.2C48.9431 25.2 50.6172 24.4299 51.8827 22.9061L51.889 22.8985ZM65.5214 32.3018V0.382988L66.4982 0.360271C67.8001 0.329992 69.7145 0.314999 72.2364 0.314999C74.7836 0.314999 76.6961 0.329935 77.9685 0.360125C81.0335 0.392296 83.745 1.01888 86.0705 2.27678C88.4277 3.50556 90.2502 5.27758 91.5155 7.5792C92.8111 9.88106 93.4414 12.5439 93.4414 15.535C93.4414 18.8053 92.717 21.7272 91.238 24.2691C89.7913 26.807 87.7313 28.7825 85.0819 30.1874C82.4597 31.5939 79.4345 32.2974 76.0353 32.3299C74.9706 32.3601 73.3872 32.375 71.2914 32.375C69.1595 32.375 67.5578 32.36 66.4929 32.3296L65.5214 32.3018ZM76.0164 31.33C79.2864 31.3 82.1514 30.625 84.6114 29.305C87.1014 27.985 89.0214 26.14 90.3714 23.77C91.7514 21.4 92.4414 18.655 92.4414 15.535C92.4414 12.685 91.8414 10.195 90.6414 8.065C89.4714 5.935 87.7914 4.3 85.6014 3.16C83.4414 1.99 80.8914 1.39 77.9514 1.36C76.6914 1.33 74.7864 1.315 72.2364 1.315C69.7164 1.315 67.8114 1.33 66.5214 1.36V31.3299C67.5714 31.3599 69.1614 31.375 71.2914 31.375C73.3914 31.375 74.9664 31.36 76.0164 31.33ZM82.7793 9.98711L82.7722 9.97997C81.546 8.72865 79.7093 8.03 77.0964 8.03H74.0464V24.66H75.9714C78.7964 24.66 80.9014 23.8419 82.4133 22.304C83.9269 20.7643 84.7364 18.6105 84.7364 15.715C84.7364 13.1034 84.0382 11.246 82.7793 9.98711ZM73.0464 25.66V7.03H77.0964C79.8864 7.03 82.0164 7.78 83.4864 9.28C84.9864 10.78 85.7364 12.925 85.7364 15.715C85.7364 18.805 84.8664 21.235 83.1264 23.005C81.3864 24.775 79.0014 25.66 75.9714 25.66H73.0464ZM100.42 33.86C98.8819 33.86 97.5361 33.2805 96.4277 32.1721C95.3423 31.0867 94.7848 29.7532 94.7848 28.225C94.7848 26.6738 95.3373 25.3233 96.4277 24.2329C97.5361 23.1245 98.8819 22.545 100.42 22.545C101.979 22.545 103.331 23.1187 104.418 24.2388C105.504 25.3281 106.055 26.6766 106.055 28.225C106.055 29.7505 105.499 31.0819 104.418 32.1662C103.331 33.2864 101.979 33.86 100.42 33.86ZM103.705 31.465C104.605 30.565 105.055 29.485 105.055 28.225C105.055 26.935 104.605 25.84 103.705 24.94C102.805 24.01 101.71 23.545 100.42 23.545C99.1598 23.545 98.0648 24.01 97.1348 24.94C96.2348 25.84 95.7848 26.935 95.7848 28.225C95.7848 29.485 96.2348 30.565 97.1348 31.465C98.0648 32.395 99.1598 32.86 100.42 32.86C101.71 32.86 102.805 32.395 103.705 31.465ZM38.9719 29.98C41.2219 31.27 43.8169 31.915 46.7569 31.915C49.6969 31.915 52.2919 31.27 54.5419 29.98C56.7919 28.66 58.5319 26.83 59.7619 24.49C60.9919 22.12 61.6069 19.39 61.6069 16.3C61.6069 13.27 60.9919 10.6 59.7619 8.29C58.5319 5.98 56.7919 4.195 54.5419 2.935C52.2919 1.645 49.6969 1 46.7569 1C43.7869 1 41.1769 1.645 38.9269 2.935C36.6769 4.225 34.9369 6.04 33.7069 8.38C32.4769 10.72 31.8619 13.42 31.8619 16.48C31.8619 19.51 32.4769 22.195 33.7069 24.535C34.9669 26.875 36.7219 28.69 38.9719 29.98ZM52.6519 23.545C51.1819 25.315 49.2169 26.2 46.7569 26.2C45.1369 26.2 43.7119 25.795 42.4819 24.985C41.2519 24.175 40.2919 23.035 39.6019 21.565C38.9419 20.095 38.6119 18.4 38.6119 16.48C38.6119 14.56 38.9419 12.865 39.6019 11.395C40.2919 9.895 41.2519 8.755 42.4819 7.975C43.7419 7.165 45.1669 6.76 46.7569 6.76C48.3469 6.76 49.7569 7.165 50.9869 7.975C52.2469 8.755 53.2069 9.895 53.8669 11.395C54.5569 12.865 54.9019 14.56 54.9019 16.48C54.9019 19.42 54.1519 21.775 52.6519 23.545Z"
              fill="#F7F3EE"
            />
          </svg>
        </Navbar.Brand>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Buscar"
            className={`mr-sm-2 rounded-pill custom-input ${
              isSearchExpanded ? "expanded" : ""
            }`}
            onClick={handleSearchClick}
          />
        </Form>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link className="navbar-link" href="#alquiler">
              Alquiler
            </Nav.Link>
            <Nav.Link className="navbar-link" href="#venta">
              En venta
            </Nav.Link>
            <Nav.Link className="navbar-link" href="#citas">
              Mis citas
            </Nav.Link>
            <Nav.Link className="navbar-link" href="#favoritos">
              Favoritos
            </Nav.Link>
            <Nav.Link className="navbar-link" href="#perfil">
              Mi perfil
            </Nav.Link>
          </Nav>
          {user.email ? (
            <Form inline className="ml-auto">
              <Link to="/logout">
                <Button
                  variant="outline-Info rounded-pill"
                  className="btn-logout"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </Button>
              </Link>
              {/*   <h4>{user.name}</h4> */}
            </Form>
          ) : (
            <Form inline className="ml-auto">
              <Link to="/login">
                <Button
                  variant="outline-Info rounded-pill"
                  className="btn-login"
                  type="submit"
                >
                  Iniciar sesión
                </Button>
              </Link>
            </Form>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
