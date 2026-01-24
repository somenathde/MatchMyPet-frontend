import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleLogin = async () => {
    try {
      const res = await axios.post(import.meta.env.VITE_SERVER_URL + "/auth/login", { emailId, password }, { withCredentials: true });
      localStorage.setItem("isLoggedIn","true")
      dispatch(addUser(res.data.user))
     navigate("/")
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className='min-h-screen flex items-center  mx-auto'>
      <div className="card bg-gray-400 text-shadow-gray-950 w-96 items-center">
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