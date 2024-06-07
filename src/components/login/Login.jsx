import React from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFacebookF, faGoogle, faInstagram} from '@fortawesome/free-brands-svg-icons';
import { FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState } from 'react';
import './login.css'

const Login = () => {

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();  

  const [isChanged, setIsChanged] = useState(false);
  const handleSignUpClick = () => {
    setIsChanged(!isChanged);
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="loginform-wrapper">
      <div className="loginbanner">
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start messaging<br/>
            your faithful tribe</p>
        </div>
        <div className="login-bg">
          <button
          className="SignUp" 
          type="button"
          onClick={() => navigate("/signup")}
          > {/*When you've put in input and you're done signing up, it takes you to login page */}
            Sign Up
          </button>
        </div>
        <form 
        onSubmit={handleLogin}
        className="login-form">
          <h1>Welcome Back!</h1>
          <div className="loginsocial-media">
            <i><FontAwesomeIcon icon={faFacebookF} /></i>
            <i><FontAwesomeIcon icon={faInstagram} /></i>
            <i><FontAwesomeIcon icon={faGoogle} /></i>
          </div>
          <div className="input-group">
            <i><FaEnvelope/></i>
            <input type="email" placeholder="Email" name="email" />
          </div>
          <div className="input-group">
            <i><FaLock/></i>
            <input type="password" placeholder="Password" name="password" />
          </div>
          <button disabled={loading}>{loading ? "Loading" : "Log In"}
          {/* type="button" */}
          {/* onClick={() => navigate("/list")} */}
          {/*When you've put in input and you're done signing up, it takes you to login page */}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login