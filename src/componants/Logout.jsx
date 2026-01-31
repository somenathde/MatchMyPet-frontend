import { useEffect, useRef, useState } from 'react'
import api from '../api/axios'
import { useDispatch } from 'react-redux'
import { removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutStatus, setlogoutStatus] = useState("pending")
  const timeoutRef =  useRef(null);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout")
      setlogoutStatus("success")
      localStorage.removeItem("isLoggedIn")
    } catch (err) {
      setlogoutStatus("local")
      localStorage.removeItem("isLoggedIn")
    } finally {
      dispatch(removeUser())
      timeoutRef.current = setTimeout(() => {
        navigate("/login", { replace: true })
      }, 1500)
    }
  };


  useEffect(() => {
    handleLogout()
    return () => { if (timeoutRef) clearTimeout(timeoutRef.current) };
  }, []);


  return (
    <div>
      {logoutStatus === "local" && (<h2>Logout Locally, please clear cookies. Redirecting to login....</h2>)}
      {logoutStatus === "success" && (<h2>Logout Successful. Redirecting to login....</h2>)}
    </div>
  )
}

export default Logout