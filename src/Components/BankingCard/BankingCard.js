import { Button, Input, Space } from 'antd'
import React from 'react'
import "./BankingCard.css"
import Form from 'antd'
import { useNavigate } from 'react-router-dom'

function BankingCard() {
const navigate=useNavigate();
    const OrderConfirmed=() => {
            navigate('/orderConfirmed');
    }
    return (
        
        <>
            <div className='CardContainer'>

                    <div className='BankCardImage'>
                        <img src={'https://www.visa.com.ng/dam/VCOM/regional/cemea/kenya/card-products/images/classic-800x450.jpg'} />

                    </div>

                    <div className='BankCardDetails'>
                            
                            <div>
                                <h2 style={{paddingBottom:"15px"}} >Payment Details</h2>

                               <Space size={30} direction="vertical">


                                    <p>Name on Card</p>

                                    <Input placeholder='Card owner name'/>

                                
                                    <p>Card Number</p>
                                    <Input placeholder='XXXX   XXXX   XXXX   XXXX ' />

                                    <div className='Card'>
                                        <Space direction='horizontal' size={20} >
                                            <div>
                                                <p>Valid Upto</p>
                                                <Input placeholder='MM/YY' width="10px" />
                                            </div>

                                            <div>
                                                <p>CVV</p>
                                                <Input placeholder=' backside of your Card ' />
                                            </div>
                                        </Space>
                                    </div>

                                <Button  onClick={()=>OrderConfirmed()}  type='primary' size='large'> Pay</Button>
                            </Space>

                            </div>
                    </div>

            </div>
        </>
    )
}

export default BankingCard
