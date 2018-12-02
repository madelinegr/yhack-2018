import React from 'react'
import { Link } from 'react-router-dom'
import logo from './calmunity-logo.png'
import './Header.css';

const Header = () => (
  <header>
    <nav id="nav" className="navbar nav-transparent">
        <div className="navbar-header">
          <div className="navbar-brand">
            <Link to="/">
              <img src={logo} className='logo'/>
            </Link>
          </div>
        </div>

        <ul className="main-nav nav navbar navbar-right">
          <li><Link to='/login' id="login-button" style={{color: '#0f738b'}}>Log In</Link></li>
          <li><Link to='/createaccount' id="signup-button" style={{color: '#0f738b'}}>Sign Up</Link></li>
        </ul>

    </nav>
  </header>
)

// <nav>
//   <Link to="/">
//     <img src={logo} id='logo'/>
//   </Link>
//   <Link to="/login">
//     <button type="button" id='login'>
//       Log In
//     </button>
//   </Link>
//
//   <Link to="/createaccount">
//     <button type="button" id='signup'>
//       Sign Up
//     </button>
//   </Link>
// </nav>
//

export default Header
