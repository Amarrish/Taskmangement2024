import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="Footer-container">
      <Container className="">
        <Row className="w-100 align-items-center">
          <Col sm={12} md={6} lg={4}>
            <ul>
              <li>Home</li>
              <li>Contact</li>
              <li>Map</li>
            </ul>
          </Col>

          <Col sm={12} md={6} lg={4}>
            <ul>
              <li>Tasks</li>
              <li>Services</li>
              <li>Ads</li>
              <li>Related Links</li>
            </ul>
          </Col>

          <Col sm={12} md={6} lg={4}>
            <ul>
              <li>Email</li>
              <li>
                {" "}
                <input placeholder="Type your Email" />
                <button>Subscribe</button>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <hr className="Footer-hr" />
      <p style={{ textAlign: "center", fontSize: "12px" }}>
        2024 &copy; Copyright All right reserved
      </p>
    </div>
  );
};

export default Footer;
