import React, { useEffect } from 'react'
import Announcement from '../Components/Announcement.js'
import NavigationBar from '../Components/NavigationBar.js'
import SliderCarousel from '../Components/SliderCarousel.js'
import { getAuth } from 'firebase/auth'
import Categories from '../Components/Categories.js';
import Products from '../Components/productFolder/Products.js';
import { useDispatch } from 'react-redux'
import NewsLetter from '../Components/NewsLetter.js';

import Footer from '../Components/Footer.js';
import NewComponent from '../Components/NewComponent.js';

import {BrowserRouter as Router,Routes,Route,useLocation} from "react-router-dom"

import LoginPage from '../Components/LoginPage.js';
import RegisterPage from '../Components/RegisterPage.js';

import { onAuthStateChanged } from 'firebase/auth';
import { userSignInAccount } from '../Features/signUpSignInFeature/SignUpSignIn.js'

     import { getProducts } from "../Features/dataFromFireStore/LoadDataFireStore";
    //  import { useEffect } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
import { getProductsData } from '../Features/dataFromFireStore/LoadDataFireStore'
import { getFirestore,doc,getDoc } from 'firebase/firestore'

function Home() {
 const dispatch= useDispatch();


useEffect(    
    // fetching database details...
    ()=>{
// now there is an update we need to access the products data from the Redux store which we called firebaseStore for this
let mydata= dispatch( getProductsData() );          

    },[]);


    useEffect(
         () => {
  
          
  // 26/10 we eneed to start here  currrent user returns big data so can't work with that[resloved]
          const user =async()=>{
            onAuthStateChanged(getAuth(), async(user) => {
                if (user) {
                  const CurrentUserEmail=getAuth().currentUser.email;
                  console.log(CurrentUserEmail)

                  const db=getFirestore();
      
                  const userRef=await doc(db,"users",CurrentUserEmail);
              
                  const userDocData=await getDoc(userRef);

                 const userData= userDocData.data();
                 console.log(userData);
                 console.log('this is user data fetching from the firestore of user');

                  dispatch(userSignInAccount(userData))
                  
                  console.log("user in app component useeffeect and on authstatechanged method..");
      console.log("user information on authchanged");
              }
      
              else{
                
                console.log("user in else block function in app component useeffeect and on authstatechanged method..");
              }
            
            });
          }
          user();
        }
    ,[])



    return (
        <>
            <Announcement />
            <NavigationBar  />       
            <SliderCarousel />
            
            <Categories />
            {/* <NewComponent /> */}
            <Products />
       
            <NewsLetter />
        
           <Footer />
        </>
    )
}

export default Home
