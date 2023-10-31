export const useReducerCounter=(PreviousStateValue,action)=>{
  
    switch (action.type) {
        case "Increment":
            return PreviousStateValue + 1
            
            

            case "Decrement":
                return PreviousStateValue - 1
            
    
                
        default:
            break;
    }

}

