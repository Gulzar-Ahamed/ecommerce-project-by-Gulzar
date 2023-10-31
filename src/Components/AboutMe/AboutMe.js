import React, { useEffect } from 'react'
import './AboutMe.css'
import   Myphoto from  '../../icons/Myphoto_circled.png'
import { Button, Collapse, Form, Input, Space } from 'antd'
import {useDispatch, useSelector} from "react-redux"
import  {message} from "antd"
import { addUserComments } from '../../Features/userComments/UserComments'
import { getUserComments } from '../../Features/userComments/UserComments'
import {firebaseFireStoreDB} from "../../FirebaseConfiguration/Firebase"
import { collection,addDoc } from 'firebase/firestore'
import { async } from '@firebase/util'

function AboutMe() {
    const dispatch=useDispatch();
    const  comments= useSelector(state=> state.userComments.Comment)
console.log(comments);
console.log("this is comment from the redux tool kit");

useEffect(
    () => {
        const getComments=() => {
            dispatch( getUserComments() )
        }
       getComments();
     }
,[])

    
const [form] = Form.useForm();


async function  onFinishFunction(values){
    console.log("onfinshler");
    console.log(values);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const longDate = new Date().toLocaleDateString(undefined, options);
    
    const userData={...values,longDate}
    dispatch( addUserComments( userData ) )
 
     const userCommentRef=collection(firebaseFireStoreDB,"userComments")
      
     await addDoc(userCommentRef,userData)
     .then(
        (result)=>{
                console.log("comment added")
     }).catch(
        (error)=>{
                console.log(error)
     })








    message.success('Comment posted successfully Thank You !!!..');


    form.resetFields();


}
    return (
        <>
        {/* 1) in this component i need to include about me and quick intro about me.
            2) in this component i would like to add user comments about how good the user expericence and that contains name current date and their comments in a list 
         */
        }
            {/* <h1>hi</h1> */}


                        <div className='MainContainer'>
                              <div className='MyProfile'>
                                    <img src={Myphoto} alt="My profile photo" />

                                     <div className='MyProfileContent'>
                                       <h2>Gulzar Ahamed</h2>
                                       <h3>Full Stack Developer</h3>
                                     </div>
                                     
                                     <div>
                                       <Collapse items={
                                         [
                                             {
                                                 key:'1',
                                                 label:' Expand Me To Know More...',
                                                 children: 
                                                 <div>

                                                    <ul>
                                                     <Space size={10} direction="vertical">
                                                       <li>
                                                           Hi! I'm <span><i>Gulzar Ahamed</i> a Upcoming MERN Stack Developer </span>
                                                          <span> I've keen and Strong knowledge with a strong passion for web development.</span>
                                                           I'm on a mission to create amazing digital experiences.
                                                       </li>
                                                        <li>
                                                        My journey into the world of web development has been an exciting one.
                                                        for user-friendly applications.
                                                        I've <span>dedicated countless hours to learning the latest web technologies, mastering front-end frameworks,</span>
                                                         and diving into the intricacies of server-side scripting. <span>Every line of code I write brings
                                                         me closer to turning innovative ideas into reality.</span>
                                                        </li>

                                                        <li>
                                                        Currently, I'm on the lookout for my  <span>professional role in the tech industry. </span>
                                                        I'm eager to apply the skills I've honed and make a meaningful contribution to exciting projects
                                                       <span> I can be a valuable addition to your team.</span> Together,
                                                         we can build extraordinary digital solutions and drive innovation in the tech world.
                                                        </li>
                                                        </Space>
                                                    </ul>
                                                 {/* <p>  </p>
                                                
                                                 <p>  ! </p> */}
                                                 </div>
                                                 
                                             }
                                        ]
                                        }/>
                                     </div>

                              </div>

                              <h4 style={{textTransform:"capitalize",padding:"40px 0px 15px",fontWeight:"800",letterSpacing:'0.1rem'}}> wait! if you like the this applcation I'm
                                   highly appreciate and encourage 
                                      your time  to provide feedback of my project 
                                      <span style={{fontSize:'1.5rem'}}>&#128512;</span>
                             </h4>

                              <div className='Comments'>

                                    <div>
                                    
                                    <p3>
                                        FEEDBACK:
                                    </p3>
                                        <Form form={form} name='Comments' layout='vertical' onFinish={onFinishFunction}>

                                            <Form.Item rules={[{required:true,message:'Please enter your name'}]} label="UserName" name="UserName" >

                                                <Input />
                                            </Form.Item>

                                            <Form.Item rules={[{required:true,message:'Please enter your feedback'}]} label="UserComment" name="UserComments" >

                                                <Input.TextArea  maxLength={150} cols="5" showCount  />
                                            </Form.Item>

                                            <Form.Item>        
                                                <Button htmlType='submit' type="primary">Post</Button>
                                            </Form.Item>
                                        </Form>
                                    </div>

                                    

                              </div >


                         {/* <div className='Feedback'> */}
                              <h3 style={{marginTop:"40px",textTransform:"capitalize",color:"black"}}>feedbacks from end-users</h3> 

                                     {
                                    comments.map((comment, index) => (
                                        <div className='ShowComments' key={index}>
                                                <div key={index} className='UserCommentContainer'>
                                                    <div className='CommentsHeader'>
                                                        <div>
                                                            <h3> &#64;{comment.UserName}</h3>
                                                        </div>
                                                        <div>{comment.longDate}</div>
                                                    </div>

                                                    <div className='CommentsBody'>
                                                    
                                                    <h4 style={{letterSpacing:"0.1rem"}}>{comment.UserComments}</h4>
                                                    
                                                    </div>
                                                </div>
                                        </div> 
                                    ))
                                }

                       {/* </div> */}
                                           
                             
                        </div>
        </>
    )
}

export default AboutMe
