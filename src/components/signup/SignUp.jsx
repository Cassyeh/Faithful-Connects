import React from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import {arrayUnion, collection, getDoc, getDocs,
    query, serverTimestamp, updateDoc,where,} 
    from "firebase/firestore";
import upload from "../../lib/upload";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFacebookF, faGoogle, faInstagram} from '@fortawesome/free-brands-svg-icons';
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState } from 'react'
import './signUp.css'

const SignUp = () => {

  // const history = useHistory();

  // const navigateToSignUp = () => {
  //   history.push('/components/signup/SignUp');
  // };

  async function handleUserSearch(username) { // function to check if the firebase already has the username stored
    const userRef = collection(db, "users");
    const q = query(userRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    let name = [];
    querySnapshot.forEach((doc) => {
      name.push(`${doc.id} => ${doc.data()}`); // stores instances of username in a list
    });
    return name;
  }

  const [loading, setLoading] = useState(false);

  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const navigate = useNavigate();

  const [isChanged, setIsChanged] = useState(false);

  const handleSignUpClick = () => {
    setIsChanged(!isChanged);
  }; 

  const handleSignup = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    const name = handleUserSearch(username);
    const userNameInstances = (await name).length; // length of instances that a username exists in the firebase

    // VALIDATE INPUTS
    if (!username || username.trim().length == 0 || !email || !password)
      return toast.warn("Please enter inputs!");
    if (!avatar.file) return toast.warn("Please upload an avatar!");

    if (userNameInstances != 0)
      return toast.warn("Username is already taken");

    // console.log("HI" + username); to show on inspect tools that your input is being received after submission
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
  
        const imgUrl = await upload(avatar.file);
  
        await setDoc(doc(db, "users", res.user.uid), {
          username,
          email,
          avatar: imgUrl,
          id: res.user.uid,
          blocked: [],
        });
  
        await setDoc(doc(db, "userchats", res.user.uid), {
          chats: [],
        });
  
        toast.success("Account created! You can login now!");
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    // toast.warn("Please enter inputs!");
  }

  /* if isChanged == true i.e that is SignUp button is clicked, className = login.change, else className = login */

  return (
    <div className={`signup ${isChanged ? 'change' : ''}`}>
      <div className="form-wrapper">
        <div className="banner">
        <h1>FAITHFUL CONNECTS</h1>
          <h2>Hello, Friend!</h2>
          <p>Enter your personal details and start messaging<br/>
            your faithful tribe</p>
        </div>
        <div className="blue-bg">
          <img src="./christian-map_icon.png" alt="" />
          <button className="logIN" onClick={() => navigate("/login")}>Login</button> {/*when this button is clicked, it navigates to signin page */}
          <button
          className="SignUp" 
          type="button"
          onClick={handleSignUpClick}
          >
            Sign Up
          </button>
        </div>
        <form 
        onSubmit={handleSignup}
        className="signup-form">
          <h1>Create Account</h1>
          <div className="social-media">
            <i><FontAwesomeIcon icon={faFacebookF} /></i>
            <i><FontAwesomeIcon icon={faInstagram} /></i>
            <i><FontAwesomeIcon icon={faGoogle} /></i>
          </div>
          <p>or use your email for registration</p>
          <label htmlFor="file">
            <img src={avatar.url || "./user.png"} alt="" />
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <div className="input-group">
            <i><FaUser/></i>
            <input type="text" placeholder="Name" name='username'/>
          </div>
          <div className="input-group">
            <i><FaEnvelope/></i>
            <input type="email" placeholder="Email" name='email'/>
          </div>
          <div className="input-group">
            <i><FaLock/></i>
            <input type="password" placeholder="Password" name='password'/>
          </div>
          <button
            disabled={loading}
            >{loading ? "Loading" : "Sign Up"}</button>
          {/* type="button"
           onClick={() => navigate("/login")} */}
          {/*When you've put in input and you're done signing up, it takes you to login page */}
        </form>
      </div>
    </div>
  )
}

export default SignUp