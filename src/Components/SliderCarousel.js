import React, { useState ,useEffect,useRef} from 'react'
import { Button, Carousel, FloatButton} from 'antd'
import {ArrowLeftOutlined,ArrowRightOutlined} from "@ant-design/icons" 
import photo1 from "../sliderImages/photo1.png"


import photo2 from "../sliderImages/photo2.png"
import photo4 from "../sliderImages/photo4.png"

import photo5 from "../sliderImages/photo5.png"
import photo3 from "../sliderImages/photo3.jpg"
  



// import Data from './Data'
function SliderCarousel() {

const reference=useRef(null);
  
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
    return (
<>
    {
    !isMobile&&( 
         <FloatButton 
                className='previous'
                onClick={
                            ()=>{
                            reference.current.prev();
                        }
                }

             icon={<ArrowLeftOutlined />}


         />
              ) 
     }
   

 <div className='CarouselContainer'>   
       <Carousel 
       ref={reference}
       slidesPerRow={1}
       autoplay={true}
       speed={1}
       draggable={true}
    //    dotPosition={"top"}
    //    dots={true}
        className='Carousel'
        // prevArrow={customPrevArrow} 
        // nextArrow={customNextArrow}
        >
       {/* check the classname "carousel whether it is ok to write styling in carousel or in side div " */}
         
         {/* {
            Data.map((sliderItem)=>{
                return(
                 <div className='Slider'>
               
                    <div className='ImageDiv'>

                        <img 
                        className='img'
                        src={sliderItem.imageLocation}
                        alt='men'
                        >
                        </img>
                    </div> 
                 failure case code..
                  
          </div>
                )

            })
        } */}
          <div className='Slider'>
               
                    <div className='ImageDiv'>

                        <img 
                        className='img'
                        src={photo1}
                        alt='men'
                        >
                        </img>
                    </div> 
                 
                  
          </div>

          <div className='Slider'>
              
                    <div className='ImageDiv'>

                        <img 
                        className='img'
                        src={photo2}
                        alt='men'
                        >
                        </img>
                    </div> 
            </div>     
                    <div className='Slider'>
               
                    <div className='ImageDiv'>

                        <img 
                        className='img'
                        src={photo4}
                        alt='men'
                        >
                        </img>
                    </div> 
                 </div>

         

          <div className='Slider'>
               
               <div className='ImageDiv'>

                   <img 
                   className='img'
                   src={photo5}
                   alt='men'
                   >
                   </img>
               </div> 
     </div>

     <div className='Slider'>
               
               <div className='ImageDiv'>

                   <img 
                   className='img'
                   src={photo3}
                   alt='men'
                   >
                   </img>
               </div> 
     </div>
       </Carousel>
 </div>   

  {!isMobile && (
        <FloatButton
          onClick={() => {
            reference.current.next();
          }}
          className="next"
          icon={<ArrowRightOutlined />}
        />
   
 
    )
}
    </>
    );
}  
export default SliderCarousel;
