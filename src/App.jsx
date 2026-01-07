
import './App.css'
import NavBar from './NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Footer from './Footer'
import Login from './Login'
import Body from './Body'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="login" element={<div><Login /></div>} />
            <Route path="signup" element={<div>Signin Page</div>} />

          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>



    </>
  )
}

export default App
