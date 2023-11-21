let defaultState = {
    user:null
 }
 
 let UserDetailReducer = (state = defaultState, action) => {
    switch (action.type) {
 
       case "ADD_USER": {
          let newState = { ...state };
          newState.user = action.payload
 
        //   console.log(newState)
          return newState;
       }
       
       default:
          return state
 
    }
 }
 
 export default UserDetailReducer