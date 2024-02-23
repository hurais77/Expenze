import { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import img from '../../assets/expenze.png'

import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
const SignUp = () => {
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  
  useEffect(()=>
  {
    if(authContext.isLoggedIn === true)
    navigate('/home')
  },[authContext.isLoggedIn])
  
  const initialValues = {
    "username":"",
    "email":"",
    "password":"",
    "rePassword":""
  }
  const validEmail = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
 );
  const [values, setValues] = useState(initialValues)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const showToastFailure = (msg) => {
    toast.error(msg);
  };


  const showToastSuccess = (msg) => {
    toast.success(msg);
  };

  const validateForm = () =>
  {
    if(values.username.length === 0)
    showToastFailure("Username cannot be empty!")
    else if(values.email.length === 0)
    showToastFailure("Email cannot be empty!")
    else if(values.password.length === 0)
    showToastFailure("Password cannot be empty!")
    else if(values.rePassword.length === 0)
    showToastFailure("Re-type Password cannot be empty!")
    else if(!validEmail.test(values.email))
    showToastFailure("Invalid Email Address")
    else if (values.password !== values.rePassword)
    showToastFailure("Passwords do not match!")
    else
    {
      showToastSuccess("Valid Form!")
      return true
    }

    return false
  }
  const submitForm = async(e) =>
  {
    e.preventDefault()
    if(validateForm() === false)
    return

    const data = {...values}
    delete data.rePassword

    const response = await axios.post("http://localhost:8080/users",data, { withCredentials: true })
    if(response.status === 200)
    {
      authContext.loginHandler(values.email, values.password)
      navigate('/home')
    }
    else
    {
      toast.error("Server is not responding")
    }
  }

  return (
      <div className="container mt-5 mb-5 justify-content-center align-items-center ">
         
          <div className="card">
            <div className="card-body p-5">
            <p className="text-center mb-5"><img className='w-25 h-25'src={img} alt="" /></p>
              <h2 className="text-uppercase text-center mb-5 text-light">Sign Up</h2>

              <form>

                <div className="form-outline mb-4">
                  <input type="text" name="username" className="form-control form-control-lg" placeholder='Username' onChange={handleInputChange} />
                </div>

                <div className="form-outline mb-4">
                  <input type="email" name="email" className="form-control form-control-lg" placeholder='Email' onChange={handleInputChange}/>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" name="password" className="form-control form-control-lg" placeholder='Password' onChange={handleInputChange}/>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" name="rePassword" className="form-control form-control-lg" placeholder='Re-type Password' onChange={handleInputChange}/>
                </div>


                <div className="d-flex justify-content-center">
                  <input type="submit"
                    className="btn btn-navy btn-lg text-body" onClick={submitForm} value='Register'/>
                </div>
                <p className="text-center mt-3 mb-0 text-light">Already a User? <Link to="/login"
                    className="fw-bold text-light"><u>Login here</u></Link></p>

              </form>

            </div>
          </div>
          <ToastContainer />
      </div>
   
  )
}

export default SignUp