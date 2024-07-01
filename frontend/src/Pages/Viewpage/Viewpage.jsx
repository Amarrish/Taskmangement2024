import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { usertaskContext } from "../../Context/Context";

const Viewpage = () => {
  const { usertask } = useContext(usertaskContext);
  const { id } = useParams();

  if (!usertask || usertask._id !== id) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container w-100 justify-content-center d-flex">
      <div className="taskviewcard border m-4 p-4 w-75">
        <h1 className="text-center">{usertask.taskname}</h1>
        <hr />
        <div className="date mt-4">
          <h5>Deadline: {usertask.taskdate}</h5>
        </div>
        <div className="taskinfo mt-4">
          <h5>{usertask.taskinfo}</h5>
        </div>
        <div className="workprogress mt-4">
          <h5>Work progress:</h5>
          <ProgressBar animated now={usertask.taskprogress} label={`${usertask.taskprogress}%`} />
        </div>
        <p className="mt-4">
          If you need to update anything press here{" "}
          <Link to={`/task/editpage/${id}`}>
            <i className="fa-regular fa-pen-to-square" style={{ color: "#0b4ec1" }}></i>
          </Link>
        </p>
        <p>or</p>
        <p className="mt-4">
          Goto landingpage{" "}
          <Link to="/landingpage">
            <i className="fa-solid fa-right-to-bracket fa-sm" style={{ color: "#0b4ec1" }}></i>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Viewpage;
