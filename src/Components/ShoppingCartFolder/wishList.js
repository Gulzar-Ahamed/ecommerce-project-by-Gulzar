import  { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { firebaseFireStoreDB } from '../../FirebaseConfiguration/Firebase';
import './wishList.css'; // Make sure to import your CSS file for styling
import NavigationBar from '../NavigationBar';
import Announcement from '../Announcement';
import ColorPalette from '../ColorPalette';
import { Button, Result, Space,Spin } from 'antd';
import { DeleteOutlined, HeartOutlined } from '@ant-design/icons';
import {  useNavigate } from 'react-router-dom';
import { updateDoc,getDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

import { removeWishListProduct } from '../../Features/signUpSignInFeature/SignUpSignIn';

function WishList() {
  // const [cartList, setCartList] = useState([{}]);
  //  there is a issue with this wishlist is it accespts the replicate proudcts also nad also not updating 
  // firebase and sTATE  redux ALSO

  const [loading,setLoading]= useState(true)

 const dispatch= useDispatch();

 const user= useSelector(state => state.user)
 console.log(user );
 console.log("above is wishlist user");
 const wishList = useSelector(state => state.signInSignUp.user?.wishList || [] ); // this is a good technique to avoid error
//   i resolved the problem i didn't use the correct useselector name hence it returns undefined

//  const userEmail= useSelector(state => state.signInSignUp.user?.userEmail || [] );
console.log(wishList);
  const navigate=useNavigate();
  useEffect(() => {
    // const auth = getAuth();
    // onAuthStateChanged(auth, async (user) => {
    //   const docRef = doc(firebaseFireStoreDB, 'users', user.email);
    //   const userData = await getDoc(docRef);
    //   const data = userData.data();
    //   setCartList(data.wishList);

      setLoading(false);
      console.log(wishList)
      // console.log(data.wishList);
    // });
  }, []);

  const goToProductFunction=(ProductId)=>{
    navigate(`/singleproductpage/${ProductId}`)
  }

  const removeProduct = async (productId) => {
    try {
      // Filter the wishList to remove the product with the given ID
      const updatedWishList = wishList.filter((item) => item.id !== productId);
      dispatch( removeWishListProduct(updatedWishList) )
      // onAuthStateChanged(getAuth(), async (user) => {
          // if (!user) {
          //   console.error("User is not signed in.");
          //   return;
            const auth = getAuth();
            const user = auth.currentUser;
           
            console.log(user)
             
            if (!user) {
                console.error("User is not signed in.");
                return;
              }
          // }
      // })

     
console.log(user.email +"this is userEmail");// this is correct dont do anything with email pelase
      const docRef =  doc(firebaseFireStoreDB, "users",user.email);
      
      // const userData = await getDoc(docRef);
      // const data = userData.data();

      // const updatedCartList = data.wishList.filter((item) => item.id !== productId);

     
      // await updateDoc(docRef, {
      //   wishList: updatedCartList,
      // });

      // const userData = await getDoc(docRef);
      // const data = userData.data();
  
     
       
      await updateDoc(docRef, {wishList:updatedWishList} )// it not updating in firebase
      // setCartList(updatedCartList);
      
      console.log("after update  doc block");
     
    } catch (error) {
      console.error("Error updating Firestore document:", error);
    }
  };
  return (
    <>
      <NavigationBar />
      <Announcement />
      <div className='wishlist-container'>


       {loading ? (<Spin size='large' />) :wishList.length===0 ? ( <Result title="No WishList product is available" icon={ <HeartOutlined /> } /> ):(
 
        <h2>Your WishList</h2>
         )
      }
       
      
        {wishList.map((item,index) => (
          <div key={index} className='item-container'>
            <div className='image-container'>
              <img src={item.image} alt='item' />
            </div>

            <div className='information-container'>
              <p className='item-title'>
              <span>Title:</span>{item.title}
              </p>

              <p className='item-id'>
              <span>Id:</span>{item.id}
              </p>

              <p className='item-description'>
             <span>Explanation: </span> {item.explanation}
              </p>

              <div className='color-palette'>
                <span>Chose Color :</span>
                <ColorPalette color={[item.color]} />
                {console.log(item.color)}
              </div>
            </div>

            <div className='price-container'>
              <Space direction='vertical' size={20}>
              <p className='item-price'><span>Price:</span>{item.price}</p>
              {/* there is a problem in accessing price  */}
              {console.log(item.price)}

                
              <Button onClick={ ()=>goToProductFunction(item.id) } type='primary' >Go to Product</Button>
              
              <Button onClick={()=>removeProduct(item.id)} size='large' style={{color:"red"}} icon={<DeleteOutlined />}></Button>
              </Space>
              

            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default WishList;
