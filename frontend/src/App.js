import React,{useContext} from 'react'
import './App.css';
import { Route, Switch,Redirect } from 'react-router-dom';

import AllFoods from './pages/AllFoods';
import MyCart from './pages/MyCart';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AuthContext from './store/auth-context';

const App = () => {

  const { isLoggedIn } = useContext(AuthContext);
  

  return (
    <Layout>
      <Switch>
          <Route path="/" exact>
            <Redirect to="/allfoods" />
          </Route>
          <Route path="/allfoods">
            <AllFoods/>
          </Route>
        {isLoggedIn && <Route path="/my-cart"><MyCart /></Route>}
        {!isLoggedIn && <Route path="/login" exact><Login /></Route>}
        {!isLoggedIn && <Route path="/register" exact><SignUp /></Route>}
      </Switch>
    </Layout>
     )
}

export default App
