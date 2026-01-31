
import './App.css'
import NavBar from './componants/NavBar'
import { Routes, Route } from 'react-router-dom'

import Footer from './componants/Footer'
import Login from './componants/Login'
import Body from './componants/Body'
import { useDispatch, useSelector } from 'react-redux'
import SignUp from './componants/SignUp'
import AdoptPet from './componants/AdoptPet'
import LostAndFound from './componants/LostAndFound'
import Grooming from './componants/Grooming'
import Stores from './componants/Stores'
import Orders from './componants/Orders'
import Profile from './componants/Profile'
import Logout from './componants/Logout'
import Cart from './componants/Cart'
import ProtectedRoute from './routes/ProtectedRoute'
import { useEffect } from 'react'
import { addUser, removeUser } from './utils/userSlice'
import api from './api/axios'
import Home from './componants/Home'


function App() {
  const dispatch = useDispatch();
  const { user, authReady } = useSelector((store) => store.user);
  const fetchUser = async () => {
    try {
      const res = await api.get("/user/me");
      dispatch(addUser(res?.data?.data));
    } catch(error) {
      console.error("Auth hydrate failed:", error?.response?.status);
      dispatch(removeUser());
    } 
  };
  useEffect(() => {
    if (!user && localStorage.getItem("isLoggedIn") === "true") {
      fetchUser();
    } else {
      dispatch(removeUser())
    }
  }, []);

   if (!authReady) {
    return <div className="min-h-screen flex items-center justify-center">
      Checking session...
    </div>;
  }

  return (
    <>

      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/" element={<Body />}>
          <Route index element={<Home />} />
          <Route path="adopt" element={<div><AdoptPet /></div>} />
          <Route path="lost-and-found" element={<div><LostAndFound /></div>} />
          <Route path="grooming" element={<div><Grooming /></div>} />
          <Route path="stores" element={<div><Stores /></div>} />
          
          <Route path="orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        </Route>
      </Routes>
      

    </>
  )
}

export default App
