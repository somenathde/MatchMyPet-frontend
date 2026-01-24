
import './App.css'
import NavBar from './componants/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Footer from './componants/Footer'
import Login from './componants/Login'
import Body from './componants/Body'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import SignUp from './componants/SignUp'
import AdoptPet from './componants/AdoptPet'
import LostAndFound from './componants/LostAndFound'
import Grooming from './componants/Grooming'
import Stores from './componants/Stores'
import Orders from './componants/Orders'
import Profile from './componants/Profile'
import Logout from './componants/Logout'
import Cart from './componants/Cart'


function App() {
  
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<div><Login /></div>} />
              <Route path="/signup" element={<div><SignUp /></div>} />
              <Route path="/adopt" element={<div><AdoptPet/></div>} />
              <Route path="/lost-and-found" element={<div><LostAndFound/></div>} />
              <Route path="/grooming" element={<div><Grooming/></div>} />
              <Route path="/stores" element={<div><Stores/></div>} />
              <Route path="/orders" element={<div><Orders/></div>} />
              <Route path="/profile" element={<div><Profile/></div>} />
              <Route path="/logout" element={<div><Logout/></div>} />
              <Route path="/cart" element={<div><Cart/></div>} />
              
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>



    </>
  )
}

export default App
