import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

import { auth } from "../firebase";
export const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    try {
     await signInWithEmailAndPassword(auth, email, password);
    
      navigate("/"); 
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Ebuka Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email..." />
          <input type="password" placeholder="Password" />
          <button className="sign-up">Sign in</button>
        </form>
        <p className="needAccount">Do you have an account?<Link to="/register">Register </Link> </p>
      </div>
    </div>
  );
};
