import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom';

import App from './App';


import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import ShoppingCart from './Components/ShoppingCartFolder/ShoppingCart';
import SingleProductPage from './Components/SingleProductPage';
import { UserProvider } from './Components/Context';
import Home from './pages/Home';
import WishList from './Components/ShoppingCartFolder/wishList';
import CheckOut from './Components/ShoppingCartFolder/CheckOut';
import ShippingDetails from './Components/shippingDetails/ShippingDetails';
import PageNotFound from './Components/PageNotFound';

import {Provider} from "react-redux"

import {store, persistor} from "./ReduxToolkit/Store";

import { PersistGate } from 'redux-persist/integration/react';
import BankingCard from './Components/BankingCard/BankingCard';
import OrderConfirmed from './Components/OrderConfirmed/OrderConfirmed';
import AboutMe from './Components/AboutMe/AboutMe';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
      <Provider store={store}>

            <Router>
            {/* <App /> */}
                <Routes>

                    <Route path='/' element={<Home />}/>
                    <Route path="/loginpage" element={ <LoginPage /> } />
                    <Route path="/registerpage" element={ <RegisterPage /> } />
                    {/* <Route path="/RegisterToRoot" element={<Navigate replace to="/" />} /> */}
                    <Route  path='/singleproductpage/:id' element={ <SingleProductPage /> }  />

                    <Route path='/shoppingcart'   element={ <ShoppingCart />  }  />
                
                   <Route path='/checkout'  element={ <CheckOut /> }  />    
                
                    <Route path='/wishlist' element={ <WishList /> }   />

                    <Route path='/shippingDetails' element={ <ShippingDetails /> } />
                    
                    <Route path='/paymentDetails' element={ <BankingCard /> } />
                    <Route path='/orderConfirmed' element={ <OrderConfirmed /> } />

                    <Route path='/aboutMe' element={ <AboutMe /> }    />
                    <Route path='*' element={ <PageNotFound /> } />

                    
                </Routes>
            </Router>
       
      </Provider>

  </React.StrictMode>
);


