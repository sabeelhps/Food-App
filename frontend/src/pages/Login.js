import React,{useRef,useContext} from 'react'
import styles from './Login.module.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import AuthContext from '../store/auth-context';

const Login = () => {

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const history = useHistory();
    const authContext = useContext(AuthContext);
 
    const loginFormHandler = async(e) => {
        e.preventDefault();

        console.log(emailInputRef.current.value);
        console.log(passwordInputRef.current.value);
       
        try {
            const res = await axios.post("https://whispering-spire-10780.herokuapp.com/auth/login", {
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
            });

            if (res.status === 200) {
                authContext.getLoggedIn();
                history.push('/allfoods');
            } else {
                throw new Error('Login Error');
            }
        }
        catch (e) {
            console.log('Cannot Login At the moment');
        }
    }


    return (
        <form onSubmit={loginFormHandler} className={styles['login-form']}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" placeholder="Enter your email" ref={emailInputRef} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Enter Password" ref={passwordInputRef}/>
            </div>
            <button>Login</button>
        </form>
    )
}

export default Login
