import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { loginAPi } from "../../Services/Allapi";

const Loginpage = () => {
  const [loading,setLoading] = useState(false)
  const [userinfo, setUserinfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  // login submit
  const handlesubmit = async(e) => {
    e.preventDefault();
    const { email, password } = userinfo;
   try {
    if (!email || !password) {
      toast("Please fill the form completely")
    } else {
      setLoading(true)
      const response = await loginAPi(userinfo)
      if(response.status===200){
        localStorage.setItem("existinguser",JSON.stringify(response.data.existinguser))
        sessionStorage.setItem("token",response.data.token)
        navigate('/landingpage');
        setUserinfo({email: '',password: ''})
        setLoading(false)
        console.log(response);
      }
      else{
        toast(response.response.error)
        setLoading(false)
      }
    }
   } catch (error) {
    toast.error(error.response.data);
      console.log('Login error',error);
      setLoading(false)
   }
  }

  return (
    <div className="container w-100 d-flex justify-content-center">
      <div
        className="loginform border p-4 justify-content-center m-5"
        style={{ borderRadius: "5px", backgroundColor: "#d2edfa" }}
      >
        <h3 className="text-center">User Login</h3>

        <form className="w-100" onSubmit={handlesubmit}>
          <div className="form-group row m-3 align-items-center">
            <label className="col-sm-4 col-form-label text-right">
              Email:
            </label>
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
                Sign In
              </button>
              <ToastContainer position="top-center" />
            </div>
          </div>
        </form>

        <p className="text-center">
          If you don't have an account,{" "}
          <Link to={"/registerpage"}>Register Here</Link>
        </p>
      </div>

      
    </div>
  );
};

export default Loginpage;
