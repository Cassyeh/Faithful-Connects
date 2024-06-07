import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFacebookF, faGoogle, faInstagram} from '@fortawesome/free-brands-svg-icons';
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useState } from 'react'
import './login.css'

const Login = () => {

  // const history = useHistory();

  // const navigateToSignUp = () => {
  //   history.push('/components/signup/SignUp');
  // };

  const navigate = useNavigate();

  const [isChanged, setIsChanged] = useState(false);

  const handleSignUpClick = () => {
    setIsChanged(!isChanged);
  }; 
  /* if isChanged == true that is SignUp button is clicked, className = login.change, else className = login */

  return (
    <div className={`login ${isChanged ? 'change' : ''}`}>
      <div className="form-wrapper">
        <div className="banner">
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start messaging<br/>
            your faithful tribe</p>
        </div>
        <div className="blue-bg">
          <button className="logIn" onClick={() => navigate("/signup")}>Login</button> {/*when this button is clicked, it navigates to signin page */}
          <button
          className="SignUp" 
          type="button"
          onClick={handleSignUpClick}
          >
            Sign Up
          </button>
        </div>
        <form className="signup-form">
          <h1>Create Account</h1>
          <div className="social-media">
            <i><FontAwesomeIcon icon={faFacebookF} /></i>
            <i><FontAwesomeIcon icon={faInstagram} /></i>
            <i><FontAwesomeIcon icon={faGoogle} /></i>
          </div>
          <p>or use your email for registration</p>
          <div className="input-group">
            <i><FaUser/></i>
            <input type="text" placeholder="Name" />
          </div>
          <div className="input-group">
            <i><FaEnvelope/></i>
            <input type="email" placeholder="Email" />
          </div>
          <div className="input-group">
            <i><FaLock/></i>
            <input type="password" placeholder="Password" />
          </div>
          <button 
          type="button"
          onClick={() => navigate("/signup")}
          > {/*When you've put in input and you're done signing up, it takes you to login page */}
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login