import {firebaseFireStoreDB} from "../../FirebaseConfiguration/Firebase"

import { getAuth,onAuthStateChanged } from "firebase/auth"

import {doc,getDoc, updateDoc} from "firebase/firestore"

export const addToWishList = (product) => {
 
    try {

      const auth = getAuth();
  
      onAuthStateChanged(auth, async (user) => {
      console.log("this is under onAuthstate function");
        if (user) {
          const userDocRef = doc(firebaseFireStoreDB, 'users', user.email); // Assuming you store user data using UID
  
          // Retrieve the user's document
          const userDocSnap = await getDoc(userDocRef);
  
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
  
            // Check if the product is already in favorites
            const isWish = userData.wishList.some((wishProduct) => wishProduct.id === product.id);
   console.log(isWish)
            if (isWish) {
              // If the product is already in favorites, remove it
              userData.wishList = userData.wishList.filter((wishListProduct) => wishListProduct.id !== product.id);
  
  console.log(isWish)
            } else {
              // If the product is not in favorites, add it
              userData.wishList.push(product);
           console.log(userData.wishList);
  
            }
  
            // Update the user's document with the updated 'favorite' array
            await updateDoc(userDocRef, userData);
            console.log('Favorite list updated...');
          } else {
            console.log('User document does not exist.');
          }
        } else {
          console.log('User is not signed in.');
        }
      });
    } catch (error) {
      console.log('Error adding/removing product from favorites:', error);
    }
  };  