import { useContext } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import AuthContext from '../../store/auth-context'
import img from '../../assets/expenze_logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const authContext = useContext(AuthContext)
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
    <div className="container-fluid">
    <Link className="navbar-brand" to="/">
    <img className='p-3' src={img} width="100%" height="100%" alt=""/>
    </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ms-auto me-5">
          <li className="nav-item dropdown me-5">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <FontAwesomeIcon icon={faUser} /> User
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              {
                authContext.isLoggedIn !== true ? (
                <>
                <li><Link className="dropdown-item" to="/">Sign Up</Link></li>
                <li><Link className="dropdown-item" to="/login">Login</Link></li>
                </>
                ) :
                (
                <><li><button className="dropdown-item" onClick={authContext.logoutHandler}>Log Out</button></li></>
              )
              }
              
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar