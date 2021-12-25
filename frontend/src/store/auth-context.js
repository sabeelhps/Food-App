import React,{useState,useEffect,createContext} from 'react'
import axios from 'axios';

const AuthContext = createContext({
    isLoggedIn: '',
    getLoggedIn: () => { },
    logoutUser:()=>{}
});

export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(undefined);


    async function getLoggedIn() {
        const loggedInRes = await axios.get('https://whispering-spire-10780.herokuapp.com/auth/loggedIn');
        console.log(loggedInRes.data);
        setIsLoggedIn(loggedInRes.data);
    }

    async function logoutUser() {
        const res = await axios.get('https://whispering-spire-10780.herokuapp.com/auth/logout');
        if (res.status === 200) {
            console.log('Logged Out Successfully');
            getLoggedIn();
        }
    }

    useEffect(() => {
        getLoggedIn();
    }, []);


    return (
        <AuthContext.Provider value={{ isLoggedIn, getLoggedIn,logoutUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
