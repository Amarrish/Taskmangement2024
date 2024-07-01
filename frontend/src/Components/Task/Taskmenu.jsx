import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { taskaddApi, taskdeleteAPI, taskgetApi } from "../../Services/Allapi";
import { usertaskContext } from "../../Context/Context";

const Taskmenu = () => {
  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [token,setToken] =useState('')
  const [loading, setLoading] = useState(false);
  const [alltasks,setAlltasks] = useState([])
  const {setUsertask} = useContext(usertaskContext)

  const [taskinfos,setTaskinfos] = useState({
    taskname:'',
    taskdate:'',
    taskinfo:'',
    taskprogress:'0',
    userId:''
  })

  useEffect(()=>{
    if(localStorage.getItem("existinguser") && sessionStorage.getItem("token")){
      setTaskinfos({...taskinfos,userId:JSON.parse(localStorage.getItem("existinguser"))._id});
      setToken(sessionStorage.getItem("token"))
    }
  },[])



  // Add task
  const handlesubmit =async(e)=>{
    e.preventDefault();
    const {taskname, taskdate, taskinfo, taskprogress, userId} = taskinfos
    console.log(taskinfos);
   try {
    if(!taskname || !taskdate || !taskinfo || !taskprogress || !userId){
      toast('Please fill all fields')
  }
  else{
   const reqbody = new FormData();
   reqbody.append("taskname",taskname)
   reqbody.append("taskdate",taskdate)
   reqbody.append("taskinfo",taskinfo)
   reqbody.append("taskprogress",taskprogress)
   reqbody.append("userId",userId)

   const reqHeader = {"Content-Type":"application/json", 'Authorization':`Bearer ${token}`}

    const response = await taskaddApi(reqbody,reqHeader)
    if(response.status===200){
      toast(`${response.data.taskname} task added successfully`);
      setTaskinfos({ taskname:'',taskdate:'',taskinfo:'',taskprogress:'0'})
      setLoading(false)
      handleClose()
      console.log(response);
    }
  }
   } catch (error) {
    console.log(error.response.data);
    console.log('Task Add error',error);
   }
  }


  // Get AllTask API
  const getalltaskapi =async()=>{
    try {
      const reqHeader = {"Content-Type":"application/json",'Authorization':`Bearer ${token}`}
      const res = await taskgetApi(reqHeader)
      if(res.status===200){
        setAlltasks(res.data)
      }
    } catch (error) {
      console.log(error.res.data);
      console.log(error);
    }
  }


  // deletetask
  const handledelete = async (e,taskId)=>{
    e.preventDefault()
    const reqHeader = {
      "Content-Type":"application/json", 'Authorization':`Bearer ${token}`
    }
  
    const result = await taskdeleteAPI(taskId,reqHeader)
    if(result.status===200){
      alert('successfully deleted')
      getalltaskapi()
    }
    else{
      alert(result.response.data)
      console.log(result);
    }
  }

  useEffect(()=>{
    if(token){
      getalltaskapi();
    }
  },[token,alltasks])

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <Row>
        <Col sm={12} md={3} lg={3}>
          <div className="border" style={{ height: "100%" }}>
            <h4 className="bg-info p-2">Task Management</h4>

            <div className="addtask m-2 text-center">
              <button
                onClick={handleShow}
                className="bg-success text-white p-2"
                style={{ border: "none", outline: "none" }}
              >
                Add New Task
              </button>
              <>
                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Add New Task</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={handlesubmit}>
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Let's Put Your Task</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="task name..."
                            name="taskname"
                            onChange={e=>setTaskinfos({...taskinfos,taskname:e.target.value})}
                          />
                        </Form.Group>

                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Task Deadline</Form.Label>
                          <Form.Control
                            type="date"
                            placeholder="deadline"
                            name="taskdeadline"
                            onChange={e=>setTaskinfos({...taskinfos,taskdate:e.target.value})}
                          />
                        </Form.Group>

                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Goals of Task</Form.Label>
                          <Form.Control
                            as="textarea"
                            placeholder="Specify your Team members and Goals"
                            style={{ height: "100px" }}
                            name="task"
                            onChange={e=>setTaskinfos({...taskinfos,taskinfo:e.target.value})}
                          />
                        </Form.Group>

                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Work progress</Form.Label>
                          <div>
                            <input
                              type="text"
                              placeholder="Intially completion 0%"
                              disabled
                              className="p-1"
                              style={{ outline: "none" }}
                              name="progress"
                              onChange={e=>setTaskinfos({...taskinfos,taskname:e.target.value})}
                            />
                            {/* <button className="p-1 m-1 bg-primary text-white" style={{ outline:'none',border:'none'}}>Add</button> */}
                          </div>
                          <ProgressBar animated now={0} label={`${0}%`} />
                        </Form.Group>

                        <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button type="submit" variant="primary">{loading?"Adding...":"Add My Task"}</Button>
                    <ToastContainer position="top-center" />
                  </Modal.Footer>
                      </Row>
                    </Form>
                  </Modal.Body>
                </Modal>
              </>
            </div>
            <hr />
            <div className="text-center">
           <Link to={'/searchpage'}>
           <button
                className="bg-success text-white p-2"
                style={{ border: "none", outline: "none" }}
              >
                Find My Task
              </button>
           </Link>
            </div>
            <hr />
          </div>
        </Col>

        <Col sm={12} md={8} lg={8}>
          <Table striped>
                <>
                <thead>
                  <tr className="text-center">
                    <th>No:</th>
                    <th>Task Name</th>
                    <th>Task View</th>
                    <th>Task Edit</th>
                    <th>Remove Task</th>
                  </tr>
                </thead>
                <tbody>
                {
              alltasks.map((mytask,index)=>(
                  <tr className="text-center">
                    <td>{index+1}</td>
                    <td>{mytask.taskname}</td>
                    <td>
                      <Link onClick={()=>setUsertask(mytask)} to={`/task/viewpage/${mytask._id}`}>
                        <i
                          class="fa-regular fa-eye"
                          style={{ color: "#0b4ec1" }}
                        ></i>
                      </Link>
                    </td>
                    <td>
                      <Link onClick={()=>setUsertask(mytask)} to={`/task/editpage/${mytask._id}`}>
                        <i
                          class="fa-regular fa-pen-to-square"
                          style={{ color: "#0b4ec1" }}
                        ></i>
                      </Link>
                    </td>
                    <td>
                      <i onClick={(e)=> handledelete(e,mytask._id)} class="fa-solid fa-trash" style={{ color: "#db0000" }}></i>
                    </td>
                
                  </tr>
                  ))
                }
                </tbody>
                </>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default Taskmenu;
