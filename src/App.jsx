
import './App.css'
import NavBar from './componants/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Footer from './componants/Footer'
import Login from './componants/Login'
import Body from './componants/Body'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'

function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<div><Login /></div>} />
              <Route path="/signup" element={<div>Signin Page</div>} />
              <Route path="/adopt" element={<h1>Adopt Pet Page</h1>} />
              <Route path="/lost-and-found" element={<h1>Lost & Found Page</h1>} />
              <Route path="/grooming" element={<h1>Grooming Services Page</h1>} />
              <Route path="/stores" element={<h1>Food Store Page</h1>} />
              <Route path="/orders" element={<h1>Orders Page</h1>} />
              <Route path="/profile" element={<h1>profile Page</h1>} />
              <Route path="/logout" element={<h1>You have successfully logged out Page</h1>} />
              
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>



    </>
  )
}

export default App
