import React from 'react'
import "./shippingDetails.css"
import { Button, Divider, Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { updateUserAddress } from '../../Features/signUpSignInFeature/SignUpSignIn'
import { updateDoc,doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { firebaseFireStoreDB } from '../../FirebaseConfiguration/Firebase'
import { useNavigate } from 'react-router-dom'


function ShippingDetails() {
 const dispatch= useDispatch();
const navigate=useNavigate();
    const onFinishFunction =async(value)=>{
            console.log(value);
            console.log("value inside the shipping details");
            const auth = getAuth();
  const user = auth.currentUser;
 
  // console.log(user)
   
  if (!user) {
      console.error("User is not signed in.");
      return;
    }
            dispatch( updateUserAddress(value) )
            const docRef =  doc(firebaseFireStoreDB, "users",user.email);

            await updateDoc(docRef,{userAddress:value})

            navigate('/paymentDetails')
    }

    const onFinishFailedFunction =()=>{
            console.log( "error in shipping details");
    }

    return (
        <>
        <Divider></Divider>
            <div className='ShippingDetails'>
               
                  <div className='ShippingHeading'>
                     <h3><b>SHIPPING ADDRESS</b></h3>
                  </div>

                  <div className='ShippingBody'>
                        <Form onFinishFailed={onFinishFailedFunction} onFinish={onFinishFunction} labelCol={ {span:2}}  wrapperCol={ {offset:0}
                           
                        }>
                            <Form.Item label="Name" name={"Name"} rules={[{ required:true }]}>
                                
                                <Input/>

                            </Form.Item>


                            <Form.Item label="Street"name={"Street"} rules={[{required:true}]}>
                                
                                <Input/>

                            </Form.Item>

                            <Form.Item label="City" name={"City"} rules={[{required:true}]}>
                                
                                <Input/>

                            </Form.Item>

                            <Form.Item label="State"  name={"State"} rules={[{required:true}]}>
                                
                                <Input/>

                            </Form.Item>

                            <Form.Item label="Zip code" name={"ZipCode"} rules={[{required:true}]}>
                                
                                <Input/>

                            </Form.Item>
                             
                            <Form.Item label="Country"name={"Country"} rules={[{required:true}]}>
                                
                                <Input/>

                            </Form.Item>

                            <Form.Item label="Phone" name={"Phone"} rules={[{required:true},{max:10,message:"Enter upto 10 number "}]}>
                                
                                <Input/>

                            </Form.Item>


                            <Form.Item wrapperCol={{offset:6}}>
                                
                            <Button htmlType='submit' type='primary' >Submit</Button>
                                

                            </Form.Item>
                           
                            
                            
                            
                            
                            
                        </Form>
                  </div>   
                
            </div>
        </>
    )
}

export default ShippingDetails
