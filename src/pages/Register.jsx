import React, { useState } from "react";
import Add from "./images/Img-icon.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
export const Register = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [number, setNumber]= (0)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          setTimeout(() => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateProfile(res.user, {
                  displayName,
                  photoURL: downloadURL,
                  
                });
                await setDoc(doc(db, "users", res.user.uid), {
                  uid: res.user.uid,
                  displayName,
                  email,
                  photoURL: downloadURL,
                });
                await setDoc(doc(db, "userChats", res.user.uid), {});
              }
            );
          }, 5000);
        }
      );
      navigate("/");
      console.log(res)
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Ebuka Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Display Name..." />
          <input type="email" placeholder="Email..." />
          <input type="password" placeholder="Password" />
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            accept="image/*"
          />
          <label
            htmlFor="file"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={Add} alt="" style={{ width: "40px" }} />
            <p style={{ fontSize: "13px", color: "aqua", cursor: "pointer" }}>
              Add an Avatar image
            </p>
          </label>
          <button className="sign-up">Sign up</button>
          {err && <span style={{ color: "red" }}>Something went wrong</span>}
        </form>
        <p className="needAccount">
          Do you have an account?<Link to="/login">Login</Link>{" "}
        </p>
      </div>
    </div>
  );
};
