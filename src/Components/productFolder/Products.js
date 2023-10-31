import React, { useEffect, useState } from 'react'
import Product from './Product'
// import { ProductsData } from '../ImportantData';
import  "../../projectStyling/Products.css"
import {Row,Col, Spin} from "antd"
import { firebaseFireStoreDB } from '../../FirebaseConfiguration/Firebase'; 
import { getDocs,collection } from 'firebase/firestore';
import { getProductsData } from '../../Features/dataFromFireStore/LoadDataFireStore';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
function Products() {
const dispatch = useDispatch()
//     const [productsData,setProductsData]=useState([])
//  const [loading,setLoading]=useState(true);
   
    
            
            const productsData= useSelector( state => state.fireStore||[] )
            // console.log(productsData);
            //  the problem was i was not call the correct splice name to that is the reason.

            // console.log(" if products is shown then redux state data is successfully loaded");
            // console.log(productsData);

            if(productsData.status === 'pending'){
                <Spin size='large'></Spin>
        }  
           
    return (
        <div className='ProductsContainer'>
        <h2 style={{textAlign:"center"}}>OUR PRODUCTS</h2>
        {/* we have to give unique key for our indivial array item for react 
         we can do this my 2 stuff
         1. one is by giving the index of array directly 
         2. Giving your own data*/}
         
            <Row
            gutter={[20,35]}
            // wrap={true}
            
            className='GridRowStyling'
            
             >
{/*  products state*/}
         
       
         
         {/* {
            /* loading? (<Spin size='large' />):( */             
            
            productsData.data.map((productData)=>(
            
             
                <Col   className='GridColumn'  key={productData.id}>
                
                <Product  data={productData}  />
                
                </Col>
                
            ))
    /* )  
    } */}
          
           </Row>
        </div>
    )
}

export default Products;
