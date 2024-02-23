import Navbar from './components/Navbar/Navbar'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUp from './pages/authentication/SignUp'
import Login from './pages/authentication/Login'
import Dashboard from './pages/dashboard/Dashboard'

function App() {
  
  
  return (
    <>
     
     <BrowserRouter>
     <Navbar/>
     <Routes>
          <Route  index={true} path="/" element={<SignUp />} />
          <Route  index={true} path="/login" element={<Login />} />
          <Route  index={true} path="/home" element={<Dashboard />} />
          {/* <Route path="/home" element={<>} /> */}
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
