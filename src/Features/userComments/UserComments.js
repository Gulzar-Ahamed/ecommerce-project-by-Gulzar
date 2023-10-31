import { async } from "@firebase/util"
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { collection, getDocs } from "firebase/firestore"
import { firebaseFireStoreDB } from "../../FirebaseConfiguration/Firebase"

const initialState={
    Comment:[ ]
}
export const userComments= createSlice(
    {
        name:"userComments",
        initialState,
        reducers:
        {
            addUserComments:( state,action)=>{
                // state.Comment.push(action.payload)

               state.Comment.unshift(action.payload)

            },

            // getUserComments:( state,action)=>{
            //     return state.Comment
            // }

            
        } ,

      extraReducers:(builder)=>{
          builder
          .addCase(getUserComments.pending, (state)=>{
            state.status="pending"
          })
          .addCase(getUserComments.fulfilled, (state,action)=>{
           state.Comment=action.payload;
            state.status="idle"
            console.log(state.Comment)
            console.log('this is inside extra reducer ')
          })
          .addCase(getUserComments.rejected, (state)=>{
            state.status="rejected"
            console.log('rejected state');
          })

      }
    }
)

export const getUserComments =createAsyncThunk("getUserComments",async()=>{

    const collectionRef= collection(firebaseFireStoreDB,"userComments")

    let userComments=[];

    let data= await getDocs(collectionRef)

    userComments=data.docs.map( (doc) => ({
        ...doc.data(),
        id:Number(doc.id) 

}
  ));

  console.log(userComments);
  console.log('above is usercomments i am logging  ');
//    console.log(productdata);
return userComments;



})


export const {addUserComments}=userComments.actions;
export default userComments.reducer;