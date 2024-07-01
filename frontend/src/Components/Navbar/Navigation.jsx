import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    localStorage.removeItem('existingUser');
    setIsLoggedIn(false);
    navigate('/');
  };

  useEffect(() => {
    if (localStorage.getItem("existinguser") && sessionStorage.getItem("token")) {
      setIsLoggedIn(true);
    } 
  });


  return (
    <Navbar
      expand="lg"
      className="border"
      style={{ backgroundColor: "#d1d1d1" }}
    >
      <Container>
        <Navbar.Brand className="text-Black d-flex align-items-center">
          <i
            className="fa-solid fa-list-check fa-bounce fa-lg m-2"
            style={{ color: "#0045bd" }}
          ></i>
          <Link style={{ textDecoration: "none" }} to={"/"}>
            <h5>Task Notify</h5>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        
            <Nav className="ms-auto">
              <Nav.Link
                className="text-black border rounded"
                style={{ fontWeight: "600" }}
              >
                {isLoggedIn?
                (<Link onClick={handleLogout} style={{ textDecoration: "none" }} to={"/loginpage"}>
                  Signout{" "}
                  <i
                    className="fa-solid fa-right-to-bracket fa-sm"
                    style={{ color: "#003ca3" }}
                  ></i>
                </Link>)
                :
                (
                  <Link style={{ textDecoration: "none" }} to={"/loginpage"}>
                  Signin{" "}
                  <i
                    className="fa-solid fa-right-to-bracket fa-sm"
                    style={{ color: "#003ca3" }}
                  ></i>
                </Link>
                )}
              </Nav.Link>
            </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
