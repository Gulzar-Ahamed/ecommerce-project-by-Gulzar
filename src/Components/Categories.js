import React from "react"
import { Card,Row,Col } from "antd"
import "../projectStyling/Categories.css"
import {CategoriesData} from "./ImportantData"
import { useState } from "react"


function Categories() {
    const [hoveredCard, setHoveredCard] = useState(null);

    const handleCardHover = (index) => {
      setHoveredCard(index);
    };
  
    const handleCardLeave = () => {
      setHoveredCard(null);
    };
 
    return(
    <div className="categories-container">
     <h1 style={{color:"#A0C49D",textAlign:"center",fontWeight:"bold"}}>
         Categories
    </h1>
    <Row align={"middle"} justify={"space-around"} className="GridStyling" >

   
      {CategoriesData.map((category, index) => (
        <Col xs={24} lg={6}  key={index} className="Column">
        {/* we can create a new component for this card */}
          <Card
            hoverable
            className="category-card"
            cover={
              <img
                src={category.image}
                alt={category.title}
                style={{ height: "40vh" }}
              />
            }
            onMouseEnter={() => handleCardHover(index)}
            onMouseLeave={handleCardLeave}
          >
            {hoveredCard === index && (
              <div className="card-content">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <button>Shop Now</button>
              </div>
            )}
          </Card>
        </Col>
      ))}
    </Row>
    </div>
    );
   

                }
            
        
                
                    
    


export default Categories;
