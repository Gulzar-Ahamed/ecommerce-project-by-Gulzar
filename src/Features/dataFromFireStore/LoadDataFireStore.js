import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

import { firebaseFireStoreDB } from '../../FirebaseConfiguration/Firebase';
import { collection,getDocs } from 'firebase/firestore';
import { async } from '@firebase/util';

const initialState = { 
    data: [],
    status:'idle'
 };

const LoadDataFromFireStore = createSlice(
       
        {
            name:"DataFromFireStore",
            // to asscess the splice data use the key of which you pass the reducer function
            initialState,
            reducers:{
                // loadFromFireStore:(state,action)=>{
                //     state.data=action.payload;
                //     // state.data.push(action.payload)
                // }
            },
            extraReducers:(builder)=>{
     
                builder
                .addCase(getProductsData.pending,(state)=>{
                          state.status="pending"
                })
                .addCase(getProductsData.fulfilled, (state,action)=>{
                            state.data=action.payload;
                            state.status="idle"
                })
                .addCase(getProductsData.rejected,(state)=>{
                            state.status="rejected"
                            console.log("this is in rejected state");
                })
            }

            
        }
)

export const getProductsData = createAsyncThunk("getProductsData", async()=>{
    const collectionRef= collection(firebaseFireStoreDB,"products");
                    let productdata=[];
                       let data=await getDocs(collectionRef)
                    
                       productdata=data.docs.map( (doc) => ({
                                ...doc.data(),
                                id:Number(doc.id) 

                       }
                          ));
                       
                    //    console.log(productdata);
                       return productdata;
                        // .then((productData)=>{
                           
                            
                        //                 productData.docs.forEach((doc)=>{
                        //                             productdata.push( {...doc.data(), id:Number(doc.id)})   
                        //                 })
                        //                 // console.log(productdata);
                                            
                        // })
                        // .catch((error)=>{
                        //         console.log("error while fetching...  "+error);
                        // })
    

})

// export function getProducts(){ // this is trunk action createor function
//     // for both function inner fuction and outer fuction can use normal syntax or arrow syntax i'm using both functions
 
//     return async(dispatch,getstate)=>{// this is actual trunk function

//                 const collectionRef= collection(firebaseFireStoreDB,"products");
//                 const productdata=[];
//                 await getDocs(collectionRef)
//                     .then((productData)=>{
                       
                        
//                                     productData.docs.forEach((doc)=>{
//                                                 productdata.push( {...doc.data(), id:Number(doc.id)})   
//                                     })
//                                     // console.log(productdata);
                                        
//                     })
//                     .catch((error)=>{
//                             console.log("error while fetching...  "+error);
//                     })

//                    await dispatch( loadFromFireStore(productdata) )  
//                     // the above function is similar to dispatch(loadFromFireStore(productdata))
//     }
// }

export const {loadFromFireStore} = LoadDataFromFireStore.actions;
export default LoadDataFromFireStore.reducer;