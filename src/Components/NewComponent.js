import { Select, Space } from 'antd'
import React from 'react'

import "../projectStyling/NewComponent.css"

const color=[
    {  value:"Red",label:"Red"}, { value:"Blue",label:"Blue"}, {value:"Green",label:"Green"},{label:"Yellow",value:"Yellow"},{label:"Pink",value:"Pink"}
]
const size=[
    {label:"XS",value:"XS"},{label:"S",value:"S"},{label:"M",value:"M"},{label:"L",value:"L"},{label:"XL",value:"XL"},{label:"XXL",value:"XXL"}
]

const sort=[{label:"Newest",value:"Newest"},{label:"Price(ASC)",value:"Price(ASC)"},{label:"Price(DESC)",value:"Price(DESC)"}]
function NewComponent() {
    return (
        <>
            <div className='Title'>
                <h1>Dresses</h1>
            </div>

                <div className='FilterContainer'>
                    
                     <div className='FilterGroup'>
                        
                        <Space size={15}>
                            <h3>Filter Products:</h3>
                            <Select defaultValue={"Color"} style={{width:"20vw"}} size="large"
                            className='Select'
                             options={
                                    color.map(option => (
                                        {
                                        ...option,
                                        label: <span className='bold-option'>{option.label}</span>,
                                      }
                                                 )
                                )
                       }
                           />

                            <Select defaultValue={"Size"} style={{width:"15vw"}} size="large"   
                                    className='Select'
                                 options={
                                           size.map(option => (
                                            {
                                            ...option,
                                            label: <span className='bold-option'>{option.label}</span>,
                                           }
                                                )
                                    )
                              }
                            />
                        </Space>
                        
                     </div>

                     <div className='FilterGroup'>
                       <Space>
                        <h3>Sort Products:</h3>
                        <Select
                           defaultValue={"Newest"}
                           style={{width:"100%"}}
                            size="large"
                             options={
                                // this options props should contain only object that's why i'm returning obj and overriding its property through ... and finally array
                                sort.map((item)=>{
                                    return { 
                                                 ...item,
                                                label:<span className='bold-option'>{item.label}</span>
                                        }
                                 })
                             }
                            

                     />
                      </Space>
                     </div>
                     
                </div>
        </>
    )
}

export default NewComponent
