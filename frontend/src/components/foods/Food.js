import React,{useContext,useRef} from 'react'
import styles from './Food.module.css';
import CartContext from '../../store/cart-context';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';

const Food = (props) => {

    const cartCtx = useContext(CartContext);
    const { isLoggedIn } = useContext(AuthContext);
    const history = useHistory();

    const inputQtyRef = useRef();
   

    const addToCart = () => {

        if (isLoggedIn) {
            cartCtx.addItemHandler({
                id: props.id,
                name: props.name,
                desc: props.desc,
                price: props.price,
                qty: Number(inputQtyRef.current.value)
            })
        } else {
            console.log('You are not logged in');
            history.push('/login');
        }
    }

    return (
        <li className={styles.food}>
            <div>
                <p className={styles.name}>{props.name}</p>
                <p className={styles.desc}>{props.desc}</p>
                <p className={styles.price}>${ props.price}</p>
            </div>
            <div>
                <label>Amount</label>
                <input
                    type="number"
                    min="1"
                    defaultValue={1}
                    ref={inputQtyRef}
                />
                <button onClick={addToCart} className={styles['add-btn']}>+ Add</button>
            </div>
        </li>
    )
}

export default Food
