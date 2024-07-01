import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const Homesection = () => {
  return (
    <div className="container w-100">
      <Row>
        <Col sm={12} md={6} lg={6}>
          <div className="leftsection p-2 ">
            <p>
              Task management is the process of handling a task through its life
              cycle, including planning, testing, tracking, and reporting. It
              helps in managing individual tasks within a project, ensuring that
              deadlines are met, and resources are utilized efficiently.
            </p>

            <Link to={"/loginpage"}>
              <button
                className="p-2 bg-primary text-white"
                style={{
                  outline: "none",
                  border: "none",
                  borderRadius: "5px",
                  fontWeight: "600",
                }}
              >
                Get Started{" "}
                <i
                  class="fa-solid fa-right-to-bracket fa-lg"
                  style={{ color: "#ffff" }}
                ></i>
              </button>
            </Link>
          </div>
        </Col>

        <Col sm={12} md={6} lg={6}>
          <img
            className="img-fluid p-2"
            src="https://i.pinimg.com/originals/d3/75/32/d37532cb923a7a124a7fee1a89806da5.gif"
            alt=""
          />
        </Col>
      </Row>
    </div>
  );
};

export default Homesection;
