import React,{useState,createContext,useEffect} from 'react'
import axios from 'axios';

const CartContext = createContext({
    cart: [],
    cartLength: 0,
    addItemHandler:(item)=>{},
    incrementItem: (itemId) => { },
    decrementItem: (itemId) => { },
    removeItem:(itemId)=>{},
    placeOrder: () => { }
})


export const CartContextProvider = (props) => {

    const initialItem = JSON.parse(window.localStorage.getItem('cart') || "[]");

    const [cart, setCart] = useState(initialItem);
    
    console.log(cart);

    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart));
    },[cart])
   
    const addItemHandler = (item) => {
        setCart((prevState) => {

            const isItemAvailable = prevState.some((cartItem) => cartItem.id === item.id);

            if (isItemAvailable) {
                return prevState.map((cartItem) => cartItem.id === item.id ? { ...cartItem, qty: parseInt(cartItem.qty) + parseInt(item.qty)  } : cartItem);
            }

            return [...prevState, item];
        })
    }

    const incrementQtyHandler = (itemId) => {
        setCart((prevState)=>{
            return prevState.map((cartItem) => cartItem.id === itemId ? { ...cartItem, qty: parseInt(cartItem.qty) + 1 } : cartItem);
        })
    }

    const decrementQtyHandler = (itemId) => {
        setCart((prevState)=>{
            return prevState.map((cartItem) => cartItem.id === itemId ? { ...cartItem, qty: parseInt(cartItem.qty) <=0 ? 0 : parseInt(cartItem.qty) - 1 } : cartItem);
        })
    }

    const placeOrderHandler = async () => {
        try {
            await axios.post('https://whispering-spire-10780.herokuapp.com/placeorder', { cart })
            setCart(() => {
                return [];
            });
        }
        catch (e) {
            console.log(e);
        } 
    }

    const removeItemHandler = (itemId) => {
        setCart((prevState) => {
            return prevState.filter((item) => item.id !== itemId);
        })
    }

    const context = {
        cart: cart,
        cartLength: cart.length,
        addItemHandler: addItemHandler,
        incrementItem: incrementQtyHandler,
        decrementItem: decrementQtyHandler,
        placeOrder: placeOrderHandler,
        removeItem:removeItemHandler
    }

    
    return (
        <CartContext.Provider value={context}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContext;
