import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

import { auth } from "../firebase";
import { useState } from "react";
export const Login = () => {
  const [err, setErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/");
    } catch (error) {
      console.error(error);
      setErr(true);
      if (error.message.includes("user-not-found")) {
        setErrorMessage("User not found please check your email and password");
      } else if (error.message.includes("invalid-email")) {
        setErrorMessage("Email not valid");
      } else if (error.message.includes("missing-password")) {
        setErrorMessage("please input password");
      } else if (error.message.includes("wrong-password")) {
        setErrorMessage("Wrong password please check your passowrd");
      }
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
          {err && (
            <span
              style={{
                color: "red",
                fontSize: "13px",
              }}
            >
              {errorMessage}
            </span>
          )}
        </form>
        <p className="needAccount">
          Do you have an account?<Link to="/register">Register </Link>{" "}
        </p>
      </div>
    </div>
  );
};
