export  const useReducerFunction=(previousState,action)=>{

    switch (action.type) {
        case "name":
            
            return{
                ...previousState,
                name:action.payload
            }
    
        case "email":
            return{
                ...previousState,
                email:action.payload
            }

        case "password":
            return{
                ...previousState,
                password:action.payload
            }

        case "confirmPassword":
            return{
                ...previousState,
                confirmPassword: action.payload

            }
        default:
            
            break;
    }
}