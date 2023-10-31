import React, { useEffect } from 'react'
import Announcement from './Announcement';
import NavigationBar from './NavigationBar';

// i forgot to import styling so i made mistake and figured out later..
import "../projectStyling/SingleProductPage.css";
import { Button, Select, Space } from 'antd';
import ColorPalette from './ColorPalette';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import { Link,useParams } from 'react-router-dom';
import { useReducer,useState } from 'react';
 import {ProductsData} from "../Components/ImportantData"
import { useReducerCounter } from './ReducerForCounter';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firebaseFireStoreDB } from '../FirebaseConfiguration/Firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addCartListProduct } from '../Features/signUpSignInFeature/SignUpSignIn';


const size=[
  {label:"XS",value:"XS"},{label:"S",value:"S"},{label:"M",value:"M"},{label:"L",value:"L"},{label:"XL",value:"XL"},{label:"XXL",value:"XXL"}
]
function SingleProductPage( props ) {
 

  
    const shoppingCartListExist= useSelector(state => state.signInSignUp.user?.shoppingCartList||[])

    const shoppingCartListExist1= useSelector(state => state.signInSignUp.user?.shoppingCartList||[])
    const ShoppingCategoriesList= useSelector((state)=> state.fireStore.data);// this is to check and compare the product from the products data
        // const [target ,setTarget]=useState(null)
    // console.log(ShoppingCategoriesList);
  console.log('this is above shoppingCategoriesList');

 const dispatch= useDispatch();
  // const target=ProductsData.find((item)=>{
  //    return item.id=== Number( id);
  // })
  // const id= useParams().id;
  // const target=shoppingCartList.find((item)=>{
  //      return item.id === Number(id);
  // })
//  i think it showuld be  getting the data from the  firebase product database then only we can retrieve the data
 
  //  const GettingId= ()=>{
  //           const {id}= useParams();
  //           return id;
              
  //  }
// let id= useParams().id;
//   console.log(id);
//   let target1=ShoppingCatergoriesList.find((item)=>{
//     return item.id === Number(id);
// })
// console.log(target);
// console.log("this is below target value");
const {id}= useParams()
console.log(id);
console.log("above is id value");
const target=ShoppingCategoriesList.find((item)=>{
 return item.id === Number(id);
})
// console.log(targetFound);
// setTarget(targetFound);
 console.log(target)
console.log("this is below target value");
  useEffect(
     ()=>{
    //   console.log('hi');
    //       const id=GettingId();
    //       console.log(id);
    //       console.log("above is id value");
    //  const targetFound=ShoppingCategoriesList.find((item)=>{
    //        return item.id === Number(id);
    //   })
    //   console.log(targetFound);
    //   setTarget(targetFound);
    //   console.log("this is below target value");
  }
  )
  
console.log(target);
console.log("this is below target value  after useeffect");



  const [updatedStateValue,dispatcherFunction]=useReducer(useReducerCounter,0);

  const [Size,setSize]=useState("")

  const [addToCart,setAddToCart]=useState(false);


  // initially it was inserting all data when state changes but after this code its like at the time of entering to singleproductpage component and all the data are not stored  proberly not as expected..
   const addToCartFunction=async(singleCartProduct)=>{
        
    try {
        const auth=getAuth();
          // 1 onAuthStateChanged(auth,async(user)=>{
                 // we need to alter this code one the redux store is consistent
                 const user=auth.currentUser
                 if(user)
              {

                  // i think below code is to prevent the duplication of signle product i think that's why we are 
                  // calling firebase data 
                // 2  const userDocRef=doc(firebaseFireStoreDB,"users",user.userEmail)
               const userDocRef=doc(firebaseFireStoreDB,"users",user.email);
                // 3 const userData=await getDoc(userDocRef)
                   
                  //  console.log(userData +"this is add to cart function");
                // 5 if(userData.exists())
                //  6{
               
                  // 7 const data=userData.data();
                //  we need to check whether it is already exist or not..if it returns false if not any of the product is true..
                  // 8 const isItemInCart = data.shoppingCartList.some(
                  //  9 (item) => item.id === singleCartProduct.id
                  // 10 );

                    const isItemInCart = shoppingCartListExist.some((item)=> item.id === singleCartProduct.id);

                   console.log("if userdata.exists() block");

                   if (!isItemInCart) {
                    console.log(isItemInCart); 
                    console.log(singleCartProduct)
                     
                    //  console.log();
                     console.log("singleCartProduct");
                      // 11  data.shoppingCartList.push({...singleCartProduct,total:((singleCartProduct.price)*(singleCartProduct.productCount))})
                    
                      // shoppingCartListExist.push({...singleCartProduct,total:((singleCartProduct.price)*(singleCartProduct.productCount))})
                      const insertingCartList = {...target,total:((singleCartProduct.price)*(singleCartProduct.productCount)),Size:Size}
                      // shoppingCartListExist.push({...target,total:((singleCartProduct.price)*(singleCartProduct.productCount))})
                
                    //  const updatedShoppingList= shoppingCartListExist.push( insertingCartList);
                      dispatch( addCartListProduct(insertingCartList) )
                      // shoppingCartListExist.push(insertingCartList)
                            
                    console.log(insertingCartList);
                    console.log('this is below insertedCartList');
                      console.log( shoppingCartListExist );
                       await updateDoc(userDocRef,{shoppingCartList:[...shoppingCartListExist,insertingCartList]}) // this is the correct technique i found by just making array combining both updated and exist data 
                       console.log(shoppingCartListExist);
                       console.log('shoppingCartlistexist updated in firease');
                       //its working i think
                         console.log("shopping cart updated");
   
                        //  setAddToCart(true)
                     }
                }
                 
                    
              // }
          //  })
    }
     catch (error) {
      console.log(error  +   " there is error in singleProductPage component");
    }
           
   }

    return (
         <>   
   <div className='Container'>
            <NavigationBar />
            <Announcement />

      <div className='SingleProductContainer'>
            
          <div className='SingleProductImage' >
                <img src={target.image} alt={target.title} />
          </div>
              

          <div className='SingleProductContent'>{/* 2nd half of the page */}
              <h2 >{target.title}</h2>
              <p> {target.explanation}</p>

              <p style={{fontSize: "1.4rem",fontWeight: "700",textDecoration:"lineThrough"}}> &#x20b9; <span>{target.price}</span> </p>
              <div className='FilterContainer'>
                  <div className='FilterByColor'>
                      <span>color :</span>
                      <ColorPalette color={target.color} />
                  </div>

                <div className='FilterBySize'>
                      <span> Size:</span>
                
                      <Select
                      
                      defaultValue={"Size"}
                      options={

                        size.map((item)=>{
                          return(
                            {
                              ...item,
                              label:<span style={{fontWeight:"bold"}}>{item.value}</span>
                            }
                          )
                        })
                      } 

                      onChange={ (value)=>setSize(value) }

                      />
                </div>
             </div> 
    
             <div className='FilterContainer2'>
                <div className='Counter'>
                   <Space>
                      <div>
                      <Button 
                      onClick={()=>dispatcherFunction({type:"Increment"}) }
                      > <PlusOutlined/> </Button>
                      </div>

                      <div>
                      <p style={{fontWeight:"bold"}} >{
                        (updatedStateValue>0)? updatedStateValue : 0
                        
                        }
                        </p>
                      </div>
                      
                      <div>
                      <Button 
                       onClick={()=>dispatcherFunction({type:"Decrement"}) }
                      > <MinusOutlined /> </Button>
                      </div>
                 </Space>     
                </div>

                <div>
                     <Link to="/shoppingcart" state={{color:target.color,title:target.title,id:target.id,price:target.price,image:target.image,size:Size,productCount:updatedStateValue}}>         
                     
                         <Button 
                         onClick={
                          ()=>
                          addToCartFunction(
                                {
                                color:target.color,title:target.title,id:target.id,price:target.price,image:target.image,size:Size,productCount:updatedStateValue
                              
                                }
                                     )
                             } 
                         type='primary'>Add To Cart</Button>
                     </Link> 
           
                </div>
              
             </div>
          </div>
           
           
        </div>
   </div>     
        </>
 
    )
}

export default SingleProductPage;
