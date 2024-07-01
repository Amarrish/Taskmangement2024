import React, { useEffect, useState, useContext } from 'react';
import { tasksearchApi } from '../../Services/Allapi';
import {  useNavigate } from 'react-router-dom';
import { usertaskContext } from '../../Context/Context';

const Searchpage = () => {
    const [searchkey, setSearchkey] = useState("");
    const [alltask, setAlltask] = useState([]);
    const { setUsertask } = useContext(usertaskContext);
    const navigate = useNavigate();

    // search function handles
    const handlesubmit = async () => {
        const token = sessionStorage.getItem("token");
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        const result = await tasksearchApi(searchkey, reqHeader);
        console.log(result);
        if (result.status === 200) {
            setAlltask(result.data);
        } else {
            alert(result.data.response);
        }
    };

    // navigate to viewpage
    const handleViewTask = (task) => {
        setUsertask(task);
        navigate(`/task/viewpage/${task._id}`);
    };

    useEffect(() => {}, [searchkey, alltask]);

    return (
        <div className='w-100' style={{ height: '100%' }}>
            <div className="search text-center">
                <input
                    onChange={e => setSearchkey(e.target.value)}
                    value={searchkey}
                    style={{
                        border: "1px solid grey",
                        outline: "none",
                        borderRadius: "15px",
                    }}
                    className="m-2 p-1"
                    type="text"
                    placeholder="Find your task..."
                />
                <button onClick={handlesubmit} style={{ border: "none", outline: "none" }}>
                    <i
                        className="fa-solid fa-magnifying-glass fa-xl"
                        style={{ color: "#0149c6" }}
                    ></i>
                </button>
            </div>
            <hr />
            <div className='mt-2 w-100 d-flex flex-wrap justify-content-center'style={{height:'100vh', overflowY: 'scroll' }}>
                {alltask.map((task) => (
                    <div className="card p-4 border text-center m-2" style={{ width: '200px',height:'250px' }} key={task._id}>
                        <h5>{task.taskname}</h5>
                        <h5>{task.taskdate}</h5>
                        <p>Task completion: {task.taskprogress}%</p>
                        <button className='m-2 border border-none p-2 bg-dark text-white' onClick={() => handleViewTask(task)}>View</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Searchpage;
