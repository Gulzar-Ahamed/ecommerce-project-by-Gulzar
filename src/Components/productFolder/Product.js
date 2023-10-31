import React from 'react'
import  "../../projectStyling/Products.css";
import { Button, Card, Space, Tooltip } from 'antd';
import {ShoppingCartOutlined ,SearchOutlined, HeartOutlined, HeartFilled} from "@ant-design/icons";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { addToWishList } from "../../Components/productFolder/addToWishList.js"
import { addWishListProduct, removeWishListProduct } from '../../Features/signUpSignInFeature/SignUpSignIn';
// import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch,useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';
import { getDoc,doc,updateDoc } from 'firebase/firestore';
import { firebaseFireStoreDB } from '../../FirebaseConfiguration/Firebase';

function Product(propsdata) {

  const product =propsdata.data;
// console.log(product );

const wishList=useSelector(state=> state.signInSignUp.user?.wishList||[])
// const isWish = useSelector((state) => state.signInSignUp.user.wishlist?.includes(product.id)); //this is to check at the time of loading of wishproduct or not

//  console.log(isWish);
//  console.log("is wished above value");

  // const [isWish, setIsWish] = useState(false);
  const [isWish,setIsWish]= useState(false);
  const [hovered, setHovered] = useState(false);
  const dispatch= useDispatch();
  
 const handleWishList=async(product)=>{
//  console.log("handleWishList");
  setIsWish(!isWish)
  const auth = getAuth();
  const user = auth.currentUser;
 
  // console.log(user)
   
  if (!user) {
      console.error("User is not signed in.");
      return;
    }


console.log(user.email +"this is userEmail");// this is correct dont do anything with email pelase
const docRef =  doc(firebaseFireStoreDB, "users",user.email);
         

           if( !isWish )// this will work if we are choosing for first time.
           {
              
              dispatch( addWishListProduct(product) )
              const updatedWishList= [...wishList,{...product}] // i think we can change directly 
              await updateDoc(docRef,{wishList:updatedWishList})
              console.log(product);
              console.log("is wish selected  and updated in firebase");
              
             }
             else{// else block will execute it we want ot unselect the wish product
              console.log('else block in handlewishlist');
              const updatedwishList=wishList.filter((item)=> item.id !== product.id); 
              console.log(product.id);
              dispatch( removeWishListProduct(updatedwishList) );
              await updateDoc(docRef,{wishList:updatedwishList})
              console.log("is wish selected  and removed in firebase");

             }
          
          // addToWishList(product)
        
        }

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  // console.log(product.id +"  this is product componnet value");
    return (
     <>
     
        <Card
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={hovered ? 'hovered-card' : ''}
         hoverable
          
         cover={ 
            
            <img
            className='CardImage'
            src={product.image}
            alt={product.title}
            // key={}
            />
          
            }
        >
    
        <div className="CardButton">
      <Space size={18} >
          <Tooltip title="shop now"color={"#526D82"} placement='bottom'>
              
              
              <Link to={
                    {
                    pathname:`/singleproductpage/${product.id}`,
                    }
                }
              >
                <Button shape='circle'  icon={ < ShoppingCartOutlined /> } />
              </Link> 

          </Tooltip>  

          <Tooltip title="wishlist" placement='bottom'>
              <Button shape='circle' onClick={ ()=>handleWishList(product) } icon={  isWish? <HeartFilled style={{color:'pink'}} /> :<HeartOutlined/> } />
          </Tooltip>

            {/* <Tooltip title="search similar products" placement='bottom'>
              <Button shape='circle' 
              // onClick={similarProductFunction()}
               icon={ <SearchOutlined/> } />
            </Tooltip> */}

      </Space>     
        </div>
       </Card>
  
      </>
            
       
        
    )
}

export default Product;
