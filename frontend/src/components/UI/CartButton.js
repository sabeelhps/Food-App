import React,{useContext,useEffect,useState} from 'react'
import styles from './CartButton.module.css';
import { FaShoppingCart } from 'react-icons/fa'
import CartContext from '../../store/cart-context';

const CartButton = () => {

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const cartCtx = useContext(CartContext);
    const { cart } = cartCtx;

    const totalCartItems = cart.reduce((prev,curr) => prev+curr.qty , 0);

    const cartBtnClasses = `${styles['cart-btn']} ${btnIsHighlighted ? styles.bump : ''} `;

    useEffect(() => {
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [cart]);


    return (
        <button className={cartBtnClasses}>
            <span className={styles.text}><FaShoppingCart className={styles['cart-icon']} /> Your Cart</span>
            <span className={styles.badge}>{ totalCartItems}</span>
        </button>
    )
}

export default CartButton
