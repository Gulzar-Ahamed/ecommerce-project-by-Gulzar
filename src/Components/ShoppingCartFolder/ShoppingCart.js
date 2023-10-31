import React, { useEffect, useState } from 'react';
import Announcement from '../Announcement';
import NavigationBar from '../NavigationBar';
import "./ShoppingCart.css";
import { Button, Drawer, Space, Tooltip,Spin, Result } from 'antd';
import { useReducer } from 'react';

import { useReducerCounter } from '../ReducerForCounter';
import {  useNavigate } from 'react-router-dom';
import ColorPalette from '../ColorPalette';
import {  firebaseFireStoreDB } from "../../FirebaseConfiguration/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { DeleteFilled, ShoppingCartOutlined } from "@ant-design/icons";
import WishList from './wishList';
import { useDispatch,useSelector } from 'react-redux'; 
import { addCartListProduct,removeCartListProduct,updateCartListProduct} from '../../Features/signUpSignInFeature/SignUpSignIn';
function ShoppingCart() {
  // const [cartList, setCartList] = useState([]);
  // const [loading,setLoading]= useState(true)
  const [updatedStateValue, dispatcherFunction] = useReducer(useReducerCounter, 0);
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);
   
  const    dispatch =useDispatch();
  
  const shoppingCartList=  useSelector((state)=> state.signInSignUp.user?.shoppingCartList||[]);
  console.log(shoppingCartList);// here my data works perfectly..
  console.log("this is shoppingcart list in shopping cart component");

  useEffect(() => {
    // const auth = getAuth();
    // onAuthStateChanged(auth, async (user) => {
    //   console.log(user);
    //   console.log("shoppingcart componetns useeffect function and onauthchanged function");
    //   const docRef = doc(firebaseFireStoreDB, "users", user.email);
    //   const userData = await getDoc(docRef);
    //   const data = userData.data();
    //   setCartList(data.shoppingCartList);

      // setLoading(false)
    // });
    
  }, []);

  function navigateFunction() {
    navigate("/");
  }

//  one changes i did
  const total = shoppingCartList.reduce((acc, product) => {
    return acc + (product.total);
  }, 0);

  const removeProduct = async (productId) => {
    // try {
    //   const auth = getAuth();
    //   const user = auth.currentUser;
    //   if (!user) {
    //     console.error("User is not signed in.");
    //     return;
    //   }
    //   const docRef = doc(firebaseFireStoreDB, "users", user.email);
    //   const userData = await getDoc(docRef);
    //   const data = userData.data()
    //   const updatedCartList = data.shoppingCartList.filter((item) => item.id !== productId);
    //   await updateDoc(docRef, {
    //     shoppingCartList: updatedCartList,
    //   });
//   setCartList(updatedCartList);
    // } catch (error) {
    //   console.error("Error updating Firestore document:", error);
    // }

       try{

        const updatedCartList =   shoppingCartList.filter(
          (item)=>{
             return item.id !== productId
        }
        )
      //  dispatch(  removeCartListProduct(productId) );
      dispatch( updateCartListProduct(updatedCartList))
       const auth = getAuth();

       if(!auth.currentUser){
        console.error("User is not signed in.");
        return;
       }


      const currentUser = auth.currentUser;
      console.log(currentUser);
      console.log("above user in removeCartListProduct");
          console.log(currentUser.email); // returns undefined reason is simple auth returns logged in user information so that is the reason for
            const docRef = doc(firebaseFireStoreDB, "users", currentUser.email);// this is correct and overwrites written other technique
            console.log(`below the docref`);
            console.log(docRef);
  // const shoppingCartList=  useSelector((state)=> state.signInSignUp.user?.shoppingCartList||[]);
 

            await updateDoc(docRef, {  shoppingCartList: updatedCartList} );
// try {
//   const auth = getAuth();
// const currentUser = auth.currentUser;
// if (!currentUser) {
//     console.error("User is not signed in.");
//     return;
//   }
//   dispatch(removeCartListProduct(productId));

//   const docRef = doc(firebaseFireStoreDB, "users", currentUser.userEmail);
//   const userData = await getDoc(docRef);
//   const data = userData.data();

//   const updatedCartList = data.shoppingCartList.filter((item) => item.id !== productId);

//   await updateDoc(docRef, {
//     shoppingCartList: updatedCartList,
//   });

  



      }catch(error){
          console.log(error +' there is an error in the cart product  removal method ');
      }
  };

  function checkOutFunction(){
        navigate(`/shippingDetails`)
  }

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  // ... (previous code)

return (
  <>
    <NavigationBar />
    <Announcement />
    <div className='ShoppingCartContainer'>
      <h2 style={{ textAlign: "center", margin: "25px 0px" }}>YOUR BAG</h2>

      {/* {loading ? (
        <Spin size='large' />
      ) :  */}

   {
      shoppingCartList.length === 0 || undefined ? (
        <Result
          extra={<Button type='primary' onClick={navigateFunction}>Go Home page</Button>}
          icon={<ShoppingCartOutlined />}
          title="No shopping item is available"
        />
      ) : (
        <div className='TopChild'>
          <div>
            <Button
              onClick={navigateFunction}
              size='default'
              style={{
                fontSize: "1.0rem",
                fontWeight: "900",
                fontFamily: "monospace",
                backgroundColor: "white",
                color: 'black',
                border: "black 2px solid",
                textAlign: "center",
              }}
            >
              Continue shopping.
            </Button>
          </div>
          <div>
            <Space size={20}>
              <span style={{ textDecoration: "underline", fontSize: "800", fontWeight: "700" }}>
                shopping bag ({(shoppingCartList.length !== undefined) ? shoppingCartList.length : 0})
              </span>
            </Space>
          </div>
          <div>
            <Button
              size='default'
              style={{
                fontSize: "1rem",
                fontWeight: "900",
                fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                backgroundColor: "black",
                color: "white",
                border: "white 3px solid"
              }}
              onClick={showDrawer}
            >
              Checkout Now.
            </Button>
          </div>
        </div>
      )}

      {console.log(shoppingCartList )}

      {shoppingCartList.length > 0 && shoppingCartList.map((product) => (
        <div className='BottomChild' key={product.id}>
          <div className='ProductDetailsContainer'>
            <div className='Product'>
              <div className='ProductImage'>
                <img src={product.image} alt={product.title} />
              </div>
              <div className='ProductInformation'>
                <p><span>ProductName :</span>{product.title}</p>
                <p><span>productID :</span> {product.id}</p>
                <div className='ColorPalette'>
                  <span>Chose Color :</span>
                  <ColorPalette color={[product.color]} />
                </div>
                <p><span>size:</span> {product.Size}</p>
              </div>
            </div>
            <div className='Price'>
              <Space size={14} direction="vertical">
                <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>Overall price:</p>
                {/* <p style={{ fontSize: "1.3rem", fontWeight: "900" }}>{product.price * product.productCount}Rs.</p> */}
                               <p style={{ fontSize: "1.3rem", fontWeight: "900" }}>{product.total}Rs.</p>

                <Tooltip title="Remove" placement='bottom'>
                  <Button size='large' onClick={() => removeProduct(product.id)} icon={<DeleteFilled style={{ color: "red" }} />} />
                </Tooltip>
              </Space>
            </div>
          </div>
        </div>
      ))}

      <Drawer
        title="Order Summary"
        placement="right"
        closable={true}
        onClose={onCloseDrawer}
        open={drawerVisible}
        width={300}
      >
        <div className='SummaryContainer'>
          <h2 style={{ letterSpacing: "0.2rem", color: "black" }}>ORDER SUMMARY</h2>
          <div className="SummaryContainerItems">
            <div className='IndividualItem'>
              <span>Subtotal:</span>
              <span>&#x20b9;{total}</span>
            </div>
            <div className='IndividualItem'>
              <span>Estimated Shipping:</span>
              <span>&#x20b9;40</span>
            </div>
            <div className='IndividualItem'>
              <span>Shipping Discount:</span>
              <span>&#x20b9;-40</span>
            </div>
            <div className='IndividualItem'>
              <span style={{ fontSize: "1.3rem", fontWeight: "800" }}>Total</span>
              <span style={{ fontSize: "1.3rem", fontWeight: "800" }}>&#x20b9;{total}</span>
            </div>
          </div>
          <Button
            onClick={checkOutFunction}
            style={{
              fontSize: "1rem",
              fontWeight: "900",
              fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
              backgroundColor: "teal",
              color: "white",
              border: "white 3px solid",
              width: "100%"
            }}
          >
            Confirm Order.
          </Button>
        </div>
        
      </Drawer>
    
    </div>
  </>
);

}

export default ShoppingCart;
