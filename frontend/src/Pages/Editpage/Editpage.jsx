import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usertaskContext } from "../../Context/Context";
import { taskeditAPI } from "../../Services/Allapi";
import { useNavigate } from "react-router-dom";

const Editpage = () => {
  const { usertask } = useContext(usertaskContext);
   const navigate = useNavigate();
  const [taskinfos, setTaskinfos] = useState({
    id:usertask._id,
    taskname: usertask.taskname || '',
    taskdate: usertask.taskdate || '',
    taskinfo: usertask.taskinfo || '',
    taskprogress: usertask.taskprogress || ''
  });

  useEffect(() => {
    setTaskinfos((prev) => ({
      ...prev,
      taskprogress: usertask.taskprogress
    }));
  }, [usertask.taskprogress]);

  const handlesubmit = async(e) => {
    e.preventDefault();
    const {id, taskname, taskdate, taskinfo, taskprogress } = taskinfos;
   try {
    if (!taskname || !taskdate || !taskinfo || taskprogress === '') {
      toast('Please fill all fields');
    } else {
      const token = sessionStorage.getItem('token')
      const reqbody = new FormData()
        reqbody.append("taskname",taskname)
        reqbody.append("taskdate",taskdate)
        reqbody.append("taskinfo",taskinfo)
        reqbody.append("taskprogress",taskprogress)
        const reqHeader = {"Content-Type":"application/json", 'Authorization':`Bearer ${token}`}

          const result = await taskeditAPI(id,reqbody,reqHeader)
          if(result.status===200){
            toast('Saved successfully')
            navigate('/landingpage')
          }else{
            console.log(result);
            alert(result.response.data)
          }
    }
   } catch (error) {
    
   }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
      setTaskinfos({ ...taskinfos, taskprogress: value });
    } else {
      toast.error('Please enter a value between 0 and 100');
    }
  };

  return (
    <div className="w-100 d-flex m-auto justify-content-center">
      <div className="form w-50 m-4 border">
        <Form noValidate onSubmit={handlesubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Let's Put Your Task</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="task name..."
                name="taskname"
                value={taskinfos.taskname}
                onChange={e => setTaskinfos({ ...taskinfos, taskname: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Task Deadline</Form.Label>
              <Form.Control
                required
                type="date"
                placeholder="Deadline"
                name="taskdeadline"
                value={taskinfos.taskdate}
                onChange={e => setTaskinfos({ ...taskinfos, taskdate: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Goals of Task</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Specify your Team members and Goals"
                style={{ height: "100px" }}
                name="taskinfo"
                value={taskinfos.taskinfo}
                onChange={e => setTaskinfos({ ...taskinfos, taskinfo: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Work progress</Form.Label>
              <div className="d-flex mb-2">
                <input
                  type="number"
                  placeholder="Task completion %"
                  className="p-1"
                  style={{ outline: "none" }}
                  name="taskprogress"
                  value={taskinfos.taskprogress}
                  onChange={handleInputChange}
                  min={0}
                  max={100}
                />
              </div>
              <ProgressBar className="mb-3" animated now={taskinfos.taskprogress || 0} label={`${taskinfos.taskprogress}%`} />
            </Form.Group>

            <button
              className="p-1 m-1 bg-success text-white m-auto w-50 text-center"
              style={{ outline: "none", border: "none" }}
              type="submit"
            >
              Save task
            </button>
            <ToastContainer position="top-center" />
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Editpage;
