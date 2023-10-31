import React, { useRef, useState } from 'react'
import "../projectStyling/RegisterPage.css"
import {Alert, Button, Divider, Form, Input, Space,message} from "antd"
import { Link, useNavigate } from 'react-router-dom';
import googleIcon from "../icons/googleIcon.png"

import { useReducerFunction } from './ReducerForForm';
import { signInWithPopup,createUserWithEmailAndPassword} from "firebase/auth"
import { useReducer } from 'react';
import { authenticationObject,googleProvider,firebaseFireStoreDB } from '../FirebaseConfiguration/Firebase';
import {collection,doc,getDoc,setDoc} from "firebase/firestore"
import { getFirestore,Firestore } from 'firebase/firestore';
import { useUser } from './Context';

import { userSignUpAccount,GoogleUserSignUpAccount,GoogleUserSignInAccount } from '../Features/signUpSignInFeature/SignUpSignIn';
import { useDispatch } from 'react-redux';
function RegisterPage() {
  const  [form] = Form.useForm();
  const navigate=useNavigate();

  // const {updateUser}=useUser();
  const dispatch=useDispatch();
  const formDataObject={
    name:"",  
    email:"",
    password:"",
    confirmPassword:""
  }
  // const [user,setUser]=useState(null)
   const [currentState,dispatcher] =useReducer(useReducerFunction,formDataObject);

   const [signUpInfo,setSignUpInfo]=useState(null);

//  is user has account or not if not create new data here otherwise show warning message
   const checkUserExists = async (email) => {
    const db = getFirestore();
    console.log(email);
    const userRef = await doc(db, "users", email);
    const userDoc = await getDoc(userRef);
   
    return userDoc.exists();
  };
  
  const addUserToFirestore = async (userData) => {
    const db = getFirestore();
    const userRef =  doc(db, "users", userData.email);
    // i think on above i can give any 3rd parameter  like as primary key.
    // console.log(userRef); //this userRef contains the reafernce or address ex: if we know address we can easyily do anything like add,delete,modify
    setSignUpInfo("success")
    await setDoc(userRef, userData);
  };
const googleAuthentication=async()=>{

// this below is very very important for us because i have been googling it for 2days the error is based on the serializableData 
// meaning this google authentication provide large amount of data so the error was coming i just extracted only reuqired data for me 
// and navigate it to home route along with extracted data...
  try {
   const resultFromGoogleAuthentication= await signInWithPopup(authenticationObject,googleProvider)
 
  //  here the problem comes newly 26th october
   console.log(resultFromGoogleAuthentication.user) // this is returning email as null that's why error comes
  //  till here works good i fount 
   console.log("i'm above the result from google authentication user");
  //  console.log(authenticationObject);
   const userData=resultFromGoogleAuthentication.user;
    
// 13/10/2023 work with this code and error is coming that it shows user already exists but now only i created 

      //  i don't know why the userData's email as null problem solved..
      console.log(userData?.email);
      const  userExists=await checkUserExists(userData.email)

        if (userExists) {     
          setSignUpInfo("error")
          return;
        }

        else{
          console.log(userData);

          const serializableUserData={
          //  uid:resultFromGoogleAuthentication.user.uid,
           name:userData.displayName,
           email:userData.email,
           userPhoto:userData.photoURL,
           userAddress:{
            
           },
           shoppingCartList:[],
           wishList:[]
          }
     
          console.log(serializableUserData);
          await  dispatch( GoogleUserSignUpAccount(serializableUserData) )

         await addUserToFirestore(serializableUserData)

          // updateUser(serializableUserData)
       

     navigate("/");
        }
  }
   catch (error) {
    console.log(error +"this is an error");
  }
// now .then parameter contains success result data..  
              //  console.log(authenticationObject?.currentUser?.email); 
 }
   const  signupManually=async(value)=>{
      try {
               console.log(value);
          // Check if the user already exists in Firestore
            // const collectionRef= collection(firebaseFireStoreDB,"users");

              const userExists=await checkUserExists(value.Email)
          // console.log(userDoc );
             if (userExists.exists) {
              
              console.log("the user already exist in database");
              return;
             }

            else{
             const usersEmailAndPassword= await createUserWithEmailAndPassword(authenticationObject,value.Email,value.Password)
          
              const userData= {
                // just for checking
                // uid:usersEmailAndPassword.user.uid,
                name:value.FullName,
                email:value.Email,
                shoppingCartList:[],
                wishList:[],
                userAddress:{

                }
              }

              // console.log(usersEmailAndPassword.user.uid);

            
              await addUserToFirestore(userData);
                // updateUser(userData)
                 dispatch( userSignUpAccount(userData) );
            

              navigate("/")
        }   
      } 
      catch (error){
            if (error.code === "auth/email-already-in-use") {
              // Email is already in use, set a custom error message
              setSignUpInfo('error');
            } 

            else {
              console.log(error + "  this is the error block of function signupManually");
            }
      }
   
        
 }
    return (
    <>
      <div className='RegisterContainer'>
      {/* below one form contianer has image included */}
              <div className="FormContainer">
                     {/* i wnat fullname,email,password,confirm password that's it */}
                  <h2 style={{marginBottom:"10px"}}>Create An Account</h2>
                  {/* <h2>User Already exist..</h2> */}
                  
                    {/* Conditional rendering of alert based on signUpInfo */}
                      {signUpInfo === 'success' ? (
                        <Alert
                          style={{ fontWeight: "900", color: "black", marginBottom: "10px", height: "25px", letterSpacing: "0.1rem" }}
                          banner
                          closable
                          type="success"
                          message="Account Created successfully!..."
                        />
                      ) : signUpInfo === 'error' ? (
                        <Alert
                          style={{ fontWeight: "900", color: "black", marginBottom: "10px", height: "25px", letterSpacing: "0.1rem" }}
                          closable
                          banner
                          type="error"
                          message="User Already Exist...."
                        />
                      ) : null /* Don't display any alert initially */}
                              
                  <Form
                  onFinish={
                          (value)=> signupManually(value)
                    }
                  onFinishFailed={()=>console.log("something went wrong...")}
                   form={form}
                    labelCol={{span:7}} wrapperCol={{span:15} }>
                    
                      <Form.Item
                     
                     label="FullName:"
                     name="FullName"

                     rules={[
                              {
                                required:true,
                              
                              },

                              {
                                pattern:/^[a-zA-Z]+( [a-zA-Z]+)?$/,

                                message:"please enter only Alphabets"
                              },
                     ]}
                     >
                        <Input onChange={ (event)=>dispatcher( { type:"name",payload:event.target.value } )  } />     
                     </Form.Item>

                     <Form.Item
                     label="E-Mail:"
                     name="Email"
                     rules={
                      [
                              {
                                required:true,
                                message:"Email is required"
                              },

                              {
                                pattern: /^.+@.+\..+$/,
                                message:"please enter only valid email"
                                
                              }

                     ]
            }
                     >
                        <Input onChange={ (event)=>dispatcher( { type:"email",payload:event.target.value } )  } />     
                     </Form.Item>

                     <Form.Item
                     label="Password:"
                     name="Password"

                     rules={[
                  {
                    required:true,
                    message:"password is required"
                  },

                  {
                    pattern:/^.{7,}$/,
                    message:"password should  be less than 7 characters only ",
                    
                    
                  }

            ]}
                     >
                       <Input.Password onChange={ (event)=>dispatcher( { type:"password",payload:event.target.value } )  } />     
                     </Form.Item>

                     <Form.Item
                     label="Confirm Password:"
                     name="ConfirmPassword"
                     rules={[
                      {
                        required:true,
                        message:"this field is required"
                      },

                        {
                            validator:(_,value)=>{

                                if(value===form.getFieldValue("Password"))
                                {
                                   return Promise.resolve();
                                  
                                }
                                else{
                                 return Promise.reject("Confirm password must be matched with original Password ")
                                }
                            }
                        }
                     ]}

                     >
                       <Input.Password onChange={ (event)=>dispatcher( { type:"confirmPassword",payload:event.target.value } )  } />     
                     </Form.Item>

                     <Form.Item wrapperCol={{span:11,offset:6}}
                     >
                       <Button 
                       htmlType='submit'
                      
                        style={
                               {fontSize: "1rem",
                                fontWeight: "900",
                                fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                                backgroundColor:"black",
                                color:"white",
                                border:"white 3px solid"
                               }
                             } >Create Account!</Button>     
                     </Form.Item>

                     <Link 
                     to="/loginpage"
                     style={{ color:"black" ,fontSize: "1.1rem", fontWeight: "700",fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif"}}
                      >
                     Already have a Account?</Link>

                     <Divider style={{fontSize:"1.0rem",fontWeight:"900"}} orientation='center'>Or</Divider>
                     
                     <div style={{display:"flex",flexDirection:"column",alignContent:"center"}}>
                        <Space direction='vertical' size={10}>
                               <Button  block={false} onClick={googleAuthentication}>
                                 <Space size={7}>
                                     <img src={googleIcon}  alt="google"/>
                                     <span  style={{fontWeight: "800",letterSpacing:"0.1rem"}} > Sign up With Google</span> 
                                 </Space>
                               </Button>
   
                             {/* <Button  >
                               <Space size={7}>
                                   <img src={microsoftIcon}  alt="google"/>
                                   <span style={{fontWeight: "900",letterSpacing:"0.1rem"}}>  Sign in With Microsoft</span> 
                               </Space>
                             </Button> */}
                     </Space>
   
                          </div>         

                  </Form>   
              </div>
      </div>    
    </>
    )
}

export default RegisterPage;
