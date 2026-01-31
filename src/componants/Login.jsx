import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const location = useLocation();
  const from=location.state?.from||"/";
  const handleLogin = async () => {
    try {
      const res = await axios.post(import.meta.env.VITE_SERVER_URL + "/auth/login", { emailId, password }, { withCredentials: true });
      localStorage.setItem("isLoggedIn","true")
      dispatch(addUser(res?.data?.data))
    navigate(from,{replace:true})
    } catch (error) {
      dispatch(removeUser(null))
      console.log(error)
    }
  }
  return (

    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card bg-gray-400 text-shadow-gray-950 max-w-sm w-full items-center">
        <div className="card-body">
          <h2 className="card-title">Login Page</h2>
          <label className="label text-cyan-950">Email</label>
          <input type="email" className="input" placeholder="EmailId" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
          <label className="label text-cyan-950">Password</label>
          <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="card-actions justify-end">
            <button className="btn" onClick={handleLogin}>Login</button>
          </div>
          <button className="btn outline m-10 mb-1" onClick={() => navigate("/signup")}>Don't have Account! SignUp</button>
        </div>

      </div></div>
  )
}

export default Login