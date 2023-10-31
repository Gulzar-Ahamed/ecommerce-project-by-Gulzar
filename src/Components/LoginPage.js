import React from 'react'
import { Form,Input,Button,Space,Divider,message } from 'antd'
import '../projectStyling/RegisterPage.css'
// kindly use the existing Registerpage styling page due to time constraint..

import { signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import {authenticationObject,googleProvider,firebaseFireStoreDB} from '../FirebaseConfiguration/Firebase'
import googleIcon from '../icons/googleIcon.png'
import { useNavigate } from 'react-router-dom'
import { getFirestore,doc, getDoc } from 'firebase/firestore'
// import { useUser } from './Context'
import { useSelector,useDispatch } from 'react-redux'
import { userSignInAccount,GoogleUserSignInAccount } from '../Features/signUpSignInFeature/SignUpSignIn'
// succesfully made it both functionality in signin and signup

function LoginPage() {
  const  [form] = Form.useForm();

      const dispatch=useDispatch();

      // const user =useSelector( state => (state.SignInSignUp.user!==undefined)? state.SignInSignUp.user :"");
  // const {updateUser,user}=useUser();//need to be removed..

  const navigate=useNavigate();

const signInChecking=async(email)=>{
    const db=getFirestore();
      
    const userRef=await doc(db,"users",email);

    const userDocData=await getDoc(userRef)// this brings all the data of specified address (userRef) and data has snapshot

    if (userDocData.exists) {
      const userData=userDocData.data();
      console.log(userData );
      // updateUser(userData);
      dispatch( userSignInAccount(userData) );
      // console.log(user);
     return userDocData.exists();

      // now i can see data thanks u.. 
    }
}

        const googleAuthenticationSignIn=async()=>{
            const resultFromGoogleAuthentication= await signInWithPopup(authenticationObject,googleProvider)

                const isExists=signInChecking(resultFromGoogleAuthentication.user.email)

                if(isExists){
                  message.success(`WELCOME BACK ${resultFromGoogleAuthentication.user.email} !!..`);
                  navigate("/")
                }
          }

        const signInFunction=async (value)=>{
          try {
        
            console.log("before calling");
            // we can also use .then() .catch() instead of try catch block its upto you
            const signInData = await signInWithEmailAndPassword(authenticationObject, value.Email, value.Password);
          
            // above one gives error find out why reason is when i give use the same email and password which i created in signup then only it works..
            // console.log("statement aftr signinwithemail nad passowrd");

//  i have an idea which ever you used for signin email and passowrd it retruns one of the important thing which is email so create a function and pass email of above 
// authentication call the  firestore database and check if this user exist in database or not  if exist set the state (which we created as context.js) just set that to new state..

console.log(signInData);
 console.log("sign in manually data above statement")

            console.log(signInData.user.email);

                 const isExist=  signInChecking(signInData.user.email);

                 if(isExist){
                  message.success(`WELCOME BACK ${
                    signInData.user.email
                  // user.userName
                } !!..`);
                   navigate("/")
                 }
            // the above one shows error because can't call hook function inside te hcomponnent i think we need to create function 

            // Redirect or perform other actions on successful login
        } catch (error) {
            console.error(error);
            message.error("Login failed. Please check your email Or password.");
        }
          
        }
    return (
        <>
  <div className='LoginContainer'>

         <div className="FormContainer">
         <h1 style={{marginBottom:"10px"}}>Please Log In</h1>
         
         <Form 
        
         form={form}

           onFinish={ (value)=> signInFunction(value) }
          
           onFinishFailed={ ()=> console.log("there is some error...") }
         labelCol={{span:7}}
          wrapperCol={{span:15}}
          >
                    <Form.Item
                     label="Email"
                     name="Email"

                    rules={[
                            {
                              required:true,
                               message:"email required"
                            },

                            {
                                pattern: /^.+@.+\..+$/,
                                message:"please enter only valid email"
                                
                              }
                    ]}
                     >
                        <Input  />     
                     </Form.Item>

                     <Form.Item
                     label="Password"
                     name="Password"

                      rules={[
                      {
                      required:true,
                      message:"password is required"
                      },

                      {
                      pattern:/^.{7,}$/,
                      message:"password should  be less than 9 characters only ",


                      }

                      ]}
                     >
                       <Input.Password />     
                     </Form.Item>

                     <Form.Item
                     
                      wrapperCol={{span:13,offset:6}}
                     >
                       <Button
                          htmlType='submit'
                        size='large' 
                        style={
                               {fontSize: "1.2rem",
                                fontWeight: "900",
                                fontFamily: "monospace",
                                
                                backgroundColor:"white",
                                color:'black',
                                border:"black 3px solid",
                                textAlign:"center",
                                width:"auto"
                               }
                             } >Log In </Button>     
                     </Form.Item>

                     <Divider style={{fontSize:"1.0rem",fontWeight:"900"}} orientation='center'>Or</Divider>
                     
                     <div style={{display:"flex",flexDirection:"column",alignContent:"center"}}>
                        <Space direction='vertical' size={10}>
                               <Button  block={false}
                                onClick={ googleAuthenticationSignIn}
                                >
                                 <Space size={7}>
                                     <img src={googleIcon}  alt="google"/>
                                     <span  style={{fontWeight: "800",letterSpacing:"0.1rem"}} > Sign in With Google</span> 
                                 </Space>
                               </Button>
   
                            
                     </Space>
   
                          </div>        

         </Form>

         </div>
 </div>
        </>
    )
}

export default LoginPage
