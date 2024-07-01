import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerApi } from "../../Services/Allapi";

const Registerpage = () => {
  const [loading,setLoading] = useState(false)
  const [userinfo, setUserinfo] = useState({
    email: '',
    username:'',
    password: ''
  });

  const navigate = useNavigate()
  // register
  const handlesubmit = async(e) => {
    e.preventDefault();
    const { email, username, password } = userinfo;
   try {
    if (!email || !username || !password) {
      toast("Please fill the form completely")
    } else {
     const response = await registerApi(userinfo);
     setLoading(true)
     if(response.status===200){
        toast(`${response.data.username} is successfully Registered`);
        setLoading(false);
        navigate('/loginpage');
        setUserinfo({email: '',username:'',password: ''})
     }else{
      toast(response.response.data)
     }
    }
   } catch (error) {
      toast.error(error.response.data);
      console.log('Register error',error);
      setLoading(false)
   }
  }
  return (
    <div className="container w-100 d-flex justify-content-center">
      <div
        className="loginform border p-4 justify-content-center m-5"
        style={{ borderRadius: "5px", backgroundColor: "#d2edfa" }}
      >
        <h3 className="text-center">User Register</h3>

        <form className="w-100" onSubmit={handlesubmit}>
          <div className="form-group row m-3 align-items-center">
            <label className="col-sm-4 col-form-label text-right">Email:</label>
            <div className="col-sm-8">
              <input
                type="email"
                className="form-control"
                style={{ border: "none", outline: "none", padding: "2px" }}
                name="useremail"
                value={userinfo.email}
                onChange={e => setUserinfo({ ...userinfo, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group row m-3 align-items-center">
            <label className="col-sm-4 col-form-label text-right">
              Username:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                style={{ border: "none", outline: "none", padding: "2px" }}
                name="username"
                value={userinfo.username}
                onChange={e => setUserinfo({ ...userinfo, username: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group row m-3 align-items-center">
            <label className="col-sm-4 col-form-label text-right">
              Password:
            </label>
            <div className="col-sm-8">
              <input
                type="password"
                className="form-control"
                style={{ border: "none", outline: "none", padding: "2px" }}
                name="userpassword"
                value={userinfo.password}
                onChange={e => setUserinfo({ ...userinfo, password: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group row text-center">
            <div className="col-sm-12">
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  border: "none",
                  outline: "none",
                  padding: "4px",
                  borderRadius: "2px",
                }}
              >
                {loading?"Registering...":"Register"}
              </button>
              <ToastContainer position="top-center" />
            </div>
          </div>
        </form>

        <p className="text-center">
          If Already have an account, <Link to={"/loginpage"}>Login Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Registerpage;
