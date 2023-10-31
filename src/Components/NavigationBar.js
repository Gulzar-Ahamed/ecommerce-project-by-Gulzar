import React from 'react'

import {Avatar, Badge, Button, Input, Menu, Tooltip} from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons';
import logo from './logo.png'
import '../projectStyling/NavigationBar.css'
import { Link } from 'react-router-dom';
import {authenticationObject,firebaseFireStoreDB} from '../FirebaseConfiguration/Firebase.js'
import { signOut,getAuth,onAuthStateChanged } from 'firebase/auth';
import { doc,getDoc } from 'firebase/firestore';
import { useUser } from './Context';
import wishList from '../icons/wishList.png'
import signup from '../icons/signup.png'
import { useEffect,useState } from 'react';
import { userSignOut } from '../Features/signUpSignInFeature/SignUpSignIn';
import {useDispatch} from 'react-redux'

import { useSelector } from 'react-redux';
import { userSignInAccount } from '../Features/signUpSignInFeature/SignUpSignIn';
function NavigationBar(props)
    

    {
      // const [shoppingCount,setshoppingCount]=useState(0);
      // const [wishListCount,setwishListCount]=useState(0);

// but the problem is that when i refresh the page all state user information is gone

           const user= useSelector(state =>state.signInSignUp?.user || { })
           console.log(user);
           console.log("i'm above user  state ");
          
           const dispatch=  useDispatch();

      useEffect(() => {
        const auth = getAuth();
        // onauthstatechanged we can use first argument as getAuth() also both are same .
        // onAuthStateChanged(auth, async (user) => {
            // if (user) {

                // const docRef = doc(firebaseFireStoreDB, "users", user.email);
                // dispatch() using this there is a problem with this
                // const userData = await getDoc(docRef);
                // const data = userData.data();
                // setshoppingCount(data.shoppingCartList.length);
                // setwishListCount(data.wishList.length);
                // console.log(user  );
                // const userData = {user}
              
                // dispatch(userSignInAccount({user}))
                // console.log("above one is user value in onauthstatechanged function");
            // } else {
                // User is not authenticated, handle this case as needed
                // setshoppingCount(0);
                // setwishListCount(0);
                // console.log(user);
            // }
        // });
    },
    //  [shoppingCount, wishListCount]
   []  );
    

      // const {user,updateUser} =useUser();
    // console.log(user.userPhoto);
    // console.log(user.userPhoto+ "user image");
      async function signOutFunction() {
          try {
              await signOut(authenticationObject)
              .then( ()=>{
                      dispatch( userSignOut());

                      console.log("user successfully sign out   "+ (authenticationObject?.currentUser?.email || "no user") )


                 } 
              ).catch ((error) => {
                console.log("sign out error i think the user is already exists"+ error);
              }) 
           
          
            //   await deleteUser(authenticationObject.currentUser);
           
              // updateUser(null);


              
          } catch (error) {
            console.log("sign out error i think the user is already exists"+ error);
          } 
       }

    //  function getFirstLetter(name) {
      
    //   const value=  name ? name[0].toUpperCase() : "";
    //   console.log(value +"i'm here name value");
    //   return value;
    //   }    
    return (
        <>
            <Menu 
            style={{overflowX:"auto",overflowY:"hidden",border:"2px solid lightgrey"}}
            className="NavBarContainer"
            
                mode='horizontal' 
                // items={
                //         [
                //           {
                //             label:<span>EN</span>,
                //             key:"title1",
                //             // children: [
                //             //             {
                //             //                 label:"nested",
                //             //                 key:"nested1",
                //             //                 danger:true
                //             //             },
                //             //             {
                //             //                 label:"nested2",
                //             //                 key:"nested2",
                //             //                 // danger:true
                //             //             }
                //             //          ]
                //           },

                //           {
                //             label:<span>  <Input  /> </span>,
                //             key:"title2",
                //           },

                //           {
                            
                //             // label: (
                //             //         <div className="logo-container">
                //             //             <img src={logo} alt="company logo" className="fit-logo" />
                //             //         </div>
                //             //         ),

                //             // label:<img src={logo} alt="company logo" className="navbar-logo" />,
                //             label: (
                //                 <div className="navbar-logo-container">
                //                     <img src={logo} alt="company logo" className="navbar-logo" />
                //                 </div>
                //                ),
                //           }
                //         ]
                // }
            >

               <div
               className='developerContainer'
       // style={{display:"flex",alignContent:"center",alignItems:"center", flex:"auto"}}
                >
            <Menu.Item key={1} className="search-item"> 
{/*  */}
                   
               <Link to={"/aboutMe"} ><span style={{fontSize:"1.0rem",fontWeight:"700",textDecoration:"none"}}>About Me.</span></Link> 
            </Menu.Item>   
            </div>

            <div className='logoContainer'>
                  <Menu.Item
                  //   prefix='EN' 
                  key={2} className="logo-item">     
                    <img src={logo} alt="company logo" className="navbar-logo" />  
                    {/* <Input.Search size='small' className='searchbar'/>    */}
                  </Menu.Item>
              </div>
             
           
           
            
            <div 
            // style={{display:"flex", justifyItems:"flex-end",alignContent:"center",fontSize:"1rem",marginTop:"10px"}}
          className='iconContainer'
            >
              <Tooltip title="signUp" placement='bottom'>
                    <Menu.Item key={3}> 
                      
                      <Link to="/registerpage">
                        
                            <img src={signup} alt="user sign up" />
                         
                      </Link>
                    
                    
                    </Menu.Item>
              </Tooltip>

                    <Menu.Item style={{marginBottom:"12px"}} key={4}>

                       { user.isUserActive ? (
                        /* if user is exist it wont be null */
                            <Tooltip title={(user.userEmail!==""? user.userEmail: "no User")} placement="bottom">
                                 
                                    {
                                      /* checking userPhoto whether he used google authentication or not  if yes, then we can see userPhoto.  */
                                        user.userPhoto!==null||user.userPhoto!==undefined ?(
                                            <Avatar 
                                         src={<img src={user.userPhoto} referrerPolicy="no-referrer" alt="myphoto" />}
                                            /> 
                                         ):(
                                                <Avatar style={{backgroundColor:"black",color:"white"}} >
                                                
                                                {user.userName[0].toUpperCase()}
                                                </Avatar> 
                                         )
                                   }
                            </Tooltip>
                            
                        ) : (
                              // Render an empty Avatar when user is not logged in
                           <Tooltip title="No user"> 
                           {console.log(user+" tool tip user")}
                             <Avatar size={33} />
                             </Tooltip>

                           
                           )
                    }
                    
                    </Menu.Item>
                    
                 {  user.isUserActive ? (  
                    <Menu.Item key={5}>                                
                        <Button type='primary' onClick={signOutFunction}>
                        
                        <span style={{fontSize:"1rem",fontWeight:"800",letterSpacing:"0.1rem"}}>
                             Log Out    
                        </span>
                        
                        </Button>
                    </Menu.Item>
                 ):null
                 }      

                  <Link to="/wishlist">
                    <Menu.Item key={6} style={{paddingTop:"5px"}} >
                        <Badge count={
                          // user.wishList
                          ( user.wishList !== undefined ? user.wishList.length:0)
                          
                          }>
                              <Tooltip title="My WishList">
                                <img src={wishList} alt="wish list"/>
                              </Tooltip>  
                          </Badge>
                    </Menu.Item>
                  </Link>

                      <Link to="/shoppingcart">
                      <Menu.Item  key={7}>
                          <Badge count={
                            // user.shoppingCartList
                            (user.shoppingCartList !==undefined ?user.shoppingCartList.length: 0)

                            }>
                              <Tooltip title="shoppingCart" placement='bottom'>
                                  <Badge count={
                                    // user.shoppingCartList
                                    (user.shoppingCartList!==undefined ? user.shoppingCartList.length:0)
                                    } size="small"><ShoppingCartOutlined style={{fontSize:"1.7rem"}} /> </Badge>  
                            </Tooltip>
                        </Badge>
                      </Menu.Item>
                    </Link>
            
            
            </div>
            
            </Menu> 
           
           

        </>
    )
}

export default NavigationBar;



