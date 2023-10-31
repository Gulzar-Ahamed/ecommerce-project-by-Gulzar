import React from 'react'
import { useState } from 'react';
import {Button} from "antd"
import {CloseOutlined} from "@ant-design/icons"
function Announcement() {
    const [isVisible, setIsVisible] = useState(true);

    const handleIconClick = () => {
      setIsVisible(!isVisible);
    };
    return (
        isVisible && (
        <div className='Announcement'>   
                <span>Super Deal ! free shipping for above 500 Rs.....</span>
                 <CloseOutlined onClick={handleIconClick} />
        </div>
    )
)  
}

export default Announcement;
