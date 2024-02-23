import { useContext, useEffect, useState } from 'react'
import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../store/auth-context'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from '../../assets/expenze.png'
const Login = () => {

  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(()=>
  {
    if(authContext.isLoggedIn === true)
    navigate('/home')
  },[authContext.isLoggedIn])

  
    const initialValues = {
        "email":"",
        "password":"",
      }
    
      const [values, setValues] = useState(initialValues)
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value,
        });
      };
    
      const submitForm = async(e) =>
      {
        e.preventDefault()
        try
        {
          await axios.post("http://localhost:8080/users/login",values, {withCredentials: true,})
          authContext.loginHandler(values.email, values.password)
          navigate('/home')
          }
          catch(error)
          {
            if('response' in error)
            toast.error(error.response.data.error)
          else
            toast.error("Server is not responding!")
          }
        }

      return (   
          <div className="container mt-5 mb-5 justify-content-center align-items-center ">
              <div className="card">
                <div className="card-body p-5">
                <p className="text-center mb-5"><img className='w-25 h-25'src={img} alt="" /></p>
                  <h2 className="text-uppercase text-center mb-5 text-light">Sign In</h2>
    
                  <form>
    
                    <div className="form-outline mb-4">
                      <input type="email" name="email" className="form-control form-control-lg" placeholder='Email' onChange={handleInputChange}/>
                    </div>
    
                    <div className="form-outline mb-4">
                      <input type="password" name="password" className="form-control form-control-lg" placeholder='Password' onChange={handleInputChange}/>
                    </div>
    
    
                    <div className="d-flex justify-content-center">
                      <input type="submit"
                        className="btn btn-navy btn-lg text-body" onClick={submitForm} value='Sign In'/>
                    </div>
    
                    <p className="text-center mt-3 mb-0 text-light">New User? <Link to="/"
                        className="fw-bold text-light"><u>Sign Up</u></Link></p>
    
                  </form>
    
                </div>
              </div>
              <ToastContainer />
          </div>
        
      
  )
}

export default Login