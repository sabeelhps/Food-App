import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom'
import CartButton from '../UI/CartButton'
import styles from './MainNavigation.module.css';
import AuthContext from '../../store/auth-context';
import { AiOutlineLogout } from 'react-icons/ai';
import { FaHamburger } from 'react-icons/fa';

const MainNavigation = () => {

    const { isLoggedIn,logoutUser } = useContext(AuthContext);


    return (
        <nav className={styles.nav}>
             <NavLink className={styles['brand-name']} to="/allfoods"><FaHamburger/> React Foods</NavLink>
            <ul>
                {isLoggedIn && <li><NavLink to="/my-cart"><CartButton /></NavLink></li>}
                {isLoggedIn && <li onClick={()=>logoutUser()} className={styles['logout-btn']}><AiOutlineLogout/></li>}
                {!isLoggedIn && <li><NavLink to="/login">Login</NavLink></li>}
                {!isLoggedIn && <li><NavLink to="/register">Sign Up</NavLink></li>}
            </ul>
        </nav>
    )
}

export default MainNavigation
