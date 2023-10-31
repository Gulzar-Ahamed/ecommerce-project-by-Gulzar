// import {createSlice} from "@reduxjs/toolkit";

// const initialState= [];


// // initial slice  data is for to provide the initial value for the slice can be declared as initialState as name or any name for initialState key
// export const wishListSlice = createSlice(
    
//     {
//         name:"wishListName",
       
//         initialState,  //this is intialstate array
       
//         reducers:{ // this is reducer area in slice
//                 addWishListProduct:(state,action)=>{

//                      state.wishList.push(action.payload);
//                 },

//                 removeWishListProduct:(state,action)=>{

//                     state.wishList.filter( (item)=>{
//                         return item.id !== action.payload.id;
//                     })
//                 }

//         }
        
//     }
// );

// export const {addWishListProduct,removeWishListProduct} = wishListSlice.actions;
// export default  wishListSlice.reducer;