import Home from "./pages/Home";

import ProductList from "./Components/ProductList";
import SingleProductPage from "./Components/SingleProductPage";
import RegisterPage from "./Components/RegisterPage";

import LoginPage from "./Components/LoginPage";
// the above one is a component which we use by reused component for testing purpose..

import ShoppingCart from "./Components/ShoppingCartFolder/ShoppingCart";

import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { onAuthStateChanged,getAuth } from "firebase/auth";
import { useEffect } from "react";
     import { useDispatch, useSelector } from "react-redux";
     import { getProductsData } from "./Features/dataFromFireStore/LoadDataFireStore";
import { userSignInAccount } from "./Features/signUpSignInFeature/SignUpSignIn";
import { getFirestore,getDoc,doc } from "firebase/firestore";




function App() {
       const dispatch=useDispatch();

  return (
          <>
            {/* <SingleProductPage /> */}
           

            <Home />

          
            {/* <ProductList /> note now both home and productlist have same stuff*/}
           
           {/* <RegisterPage /> */}

           {/* <LoginPage /> */}

           {/* <ShoppingCart /> */}
          </>
  );
}

export default App;
