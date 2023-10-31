import {createSlice} from "@reduxjs/toolkit";

const initialState= [];


// initial slice  data is for to provide the initial value for the slice can be declared as initialState as name or any name for initialState key
export const CartListSlice = createSlice(
    
    {
        name:"cartListName",

        initialState,
       
        reducers:{ // this is reducer area in slice
                addToCartProduct:(state,action)=>{

                    state.push(action.payload);
                },

                removeToCartProduct:(state,action)=>{
                        
                        return state.filter( item => item.id !== action.payload.id);
                    
                        
                  
                }
      
        }
        
    }
);

export const {addToCartProduct,removeToCartProduct} = CartListSlice.actions;
export default  CartListSlice.reducer;