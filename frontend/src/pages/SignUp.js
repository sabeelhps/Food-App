import React, { useRef,useContext } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import AuthContext from "../store/auth-context";
import { useHistory } from 'react-router-dom';

const SignUp = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const signupFormHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://whispering-spire-10780.herokuapp.com/auth/register", {
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
        confirmPassword: confirmPasswordInputRef.current.value,
      });

      if (res.status === 200) {
        authContext.getLoggedIn();
        history.push('/allfoods');
      } else {
        throw new Error('Cannot SignUp At the moment');
      }
    }
    catch (e) {
      console.log(e.message);
    }

  };

  return (
    <form onSubmit={signupFormHandler} className={styles["login-form"]}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          ref={emailInputRef}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          ref={passwordInputRef}
        />
      </div>
      <div>
        <label htmlFor="password">Confirm Password</label>
        <input
          type="password"
          placeholder="Enter Password Again"
          ref={confirmPasswordInputRef}
        />
      </div>
      <button>Sign Up</button>
    </form>
  );
};

export default SignUp;
