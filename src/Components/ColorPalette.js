import React from 'react'

function ColorPalette(propsitem) {

    const ColorStyling={
          height:"21px",
          width:"21px",
          borderRadius:"50%",
          margin:"3px",
          cursor:"pointer"
          
}

    
    return (
        <>
        {
           propsitem.color.map((ColorItem,index)=>{
               return <div key={index} style={{...ColorStyling,backgroundColor:ColorItem}} />
           })
        }
    
        </>
    )
}

export default ColorPalette;
