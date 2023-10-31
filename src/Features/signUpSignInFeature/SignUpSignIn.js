import {createSlice} from  '@reduxjs/toolkit'

const initialState={
    user:{
        // userId:"",
        userEmail:"",
        userName:"",
        userPhoto:null,
        shoppingCartList:[],
        wishList:[],
        userAddress:{
                    Name:"",
                    Street:"",
                    City:"",
                    State:"",
                    ZipCode:"",
                    Country:"",
                    Phone:"",


        },
        isUserActive:false
    }
}
export const signInSignUp = createSlice(
    //  this slice is to tract the user initially we had issue when we refresh page our user 
    // details gone so to overcome that i use this.

    {
        name:"signInSignupName",
        initialState,
        reducers:{
            
            userSignUpAccount: (state, action) => {
                  const {  name, email, wishList, shoppingCartList } = action.payload;
                    return {
                    ...state,
                    user: {
                        ...state.user,
                        // userId: uid,
                        userName: name,
                        userEmail: email,
                        wishList: wishList,
                        shoppingCartList: shoppingCartList,
                        isUserActive:true
                    },
                    };
              },
              

            userSignInAccount:(state,action)=>{
               try{
                    const {email,name,shoppingCartList,wishList,userPhoto} =action.payload;        
          
                // if(!email || !name){
                //     throw new Error(" the payload data is not filled")
                // }
        //  console.log(action.payload.uid);
                            return{
                                ...state,
                                user: {
                                        ...state.user,
                                        // userId: uid,
                                        userName: name,
                                        userEmail: email,
                                        shoppingCartList: shoppingCartList,
                                        wishList: wishList,
                                        userPhoto:userPhoto,
                                        isUserActive:true

                                     }
                                 }
                   }
                   catch(error){
                      console.log(error);

                      return{
                        ...state
                      }
                   }
               },
               
              

            GoogleUserSignUpAccount:(state,action)=>{

                const { uid,name,email,userPhoto,wishList,shoppingCartList }=action.payload;
                return {
                    ...state,
                    user: {
                        ...state.user,
                        userId: uid,
                        userName: name,
                        userEmail: email,
                        userPhoto:userPhoto,
                        wishList: wishList,
                        shoppingCartList: shoppingCartList,
                        isUserActive:true
                    },
                    };
            },



            userSignOut:(state,action)=>{
                state.user.userEmail="";

                state.user.userName="";

                state.user.userPhoto=null;
                state.user.isUserActive=false;
                state.user.userId="";
                state.user.userAddress=null
                state.user.wishList=[];
                state.user.shoppingCartList=[];
            },


            addWishListProduct:(state,action)=>{
                    
                state.user.wishList.push(action.payload);
           },


           removeWishListProduct:(state,action)=>{

            // state.user.wishList.filter( (item)=>{
            //     return item.id !== action.payload.id;
            // })
            state.user.wishList=action.payload;
           },

           addCartListProduct:(state,action)=>{
                 state.user.shoppingCartList.push(action.payload);
           },

           updateCartListProduct:(state,action)=>{
                    state.user.shoppingCartList= action.payload;
           },
       
           updateUserAddress:(state,action)=>{

            const {Street,City,State,ZipCode,Country,Name,Phone} = action.payload;

                state.user.userAddress={
                    Street:Street,
                    City: City,
                    State:State,
                    ZipCode:ZipCode,
                    Country:Country,
                    Name:Name,
                    Phone:Phone
                }

           }

        }

    }    
 )


 export const {userSignUpAccount,userSignInAccount,userSignOut,GoogleUserSignInAccount,GoogleUserSignUpAccount,addWishListProduct,removeWishListProduct,addCartListProduct,removeCartListProduct,updateCartListProduct,updateUserAddress} =  signInSignUp.actions;
export default signInSignUp.reducer;