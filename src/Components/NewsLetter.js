import { SendOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import React from 'react'
import "../projectStyling/NewsLetter.css"

function NewsLetter() {
    return (
    <div className='NewsLetter'>
      <Space direction='vertical' size={16}>
         <div>     
             <h2 style={{fontSize:"2rem",color:"black",textAlign:"center"}}>Newsletter</h2>
         </div>

        <div>
        <p style={{fontSize:"1rem",color:"black",textAlign:"center",fontFamily:"monospace"}}>get timely updates from your favorite products.</p>
        </div>
        
         <div>
            <Input  placeholder='Your Email is neeed'
            className='NewsLetterInput'
                suffix={
                <Button style={{backgroundColor:"teal",color:"white"}}> <SendOutlined  /></Button>
                }
            />
         </div>
      </Space>           
      </div>
    )
}

export default NewsLetter;