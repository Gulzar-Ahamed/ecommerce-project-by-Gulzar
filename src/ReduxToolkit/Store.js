import { configureStore } from "@reduxjs/toolkit"

import { wishListSlice } from "../Features/wishListFeature/WishList"
import { CartListSlice } from "../Features/cartListFeature/CartList"
import LoadDataFireStore from "../Features/dataFromFireStore/LoadDataFireStore"
import signInSignUp from "../Features/signUpSignInFeature/SignUpSignIn"
import { combineReducers } from "@reduxjs/toolkit"


import storage from "redux-persist/lib/storage"
import userComments from "../Features/userComments/UserComments"




// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const rootReducer = combineReducers(
//   // combined all to gether
//   {
//     cartList: CartListSlice,
//     fireStore: LoadDataFireStore,
//     // these reducer keys names are used with useselector to use state.
//     signInSignUp: signInSignUp
//   }
// )


// const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore(

  {
    reducer: {
      // rootReducer: persistedReducer
      // wishList: wishListSlice,
      cartList:CartListSlice,
      fireStore: LoadDataFireStore,
      // these reducer keys names are used with useselector to use state.
      signInSignUp: signInSignUp,

      userComments:userComments

    }

  }
)


// export const persistor = persistStore(store)
// i'm just peristing the store value from the redux toolkit store.