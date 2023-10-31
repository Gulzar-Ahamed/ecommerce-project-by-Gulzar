import React from 'react'
import { Result,Button } from 'antd'
import "./OrderConfirmed.css"
import {  useNavigate } from 'react-router-dom'

function OrderConfirmed() {
  const navigate=  useNavigate()
    const buyAgain=()=>{
            navigate('/')
    }

    return (
        <>
              <Result
    status="success"
    title="Order confirmed!"
    subTitle="Your order has been confirmed and will be  Delivered to your Shipping Address soon !"
    extra={[
     
     
      <Button  onClick={()=>buyAgain()} type='primary' key="buy">Buy Again</Button>,
    ]}
  />

        </>
    )
}

export default OrderConfirmed
