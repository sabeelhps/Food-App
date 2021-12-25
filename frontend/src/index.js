import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router} from 'react-router-dom';
import { CartContextProvider } from './store/cart-context';
import { AuthContextProvider } from './store/auth-context';
import axios from 'axios';

axios.defaults.withCredentials = true;

ReactDOM.render(
  <AuthContextProvider>
    <CartContextProvider>
      <Router>
        <App />
      </Router>
    </CartContextProvider>
  </AuthContextProvider>
  ,
  document.getElementById('root')
);


