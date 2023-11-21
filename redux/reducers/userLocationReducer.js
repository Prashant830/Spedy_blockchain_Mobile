let defaultState = {
   address: {},
   location: {},
   permission: false,
   addressType: 'current',


}

let userLocationReducer = (state = defaultState, action) => {
   switch (action.type) {

      case "ADD_ADDRESS": {
         let newState = { ...state };
         newState.address = action.payload

         // console.log(newState)
         return newState;
      }
      case "ADD_LOCATION": {
         let newState = { ...state };
         newState.location = action.payload

         return newState;
      }
      case "ADD_PERMISSION": {
         let newState = { ...state };
         newState.permission = action.payload

         // console.log(newState)
         return newState;
      }
      case "ADD_ADDRESSTYPE": {
         let newState = { ...state };
         newState.addressType = action.payload

         // console.log(newState)
         return newState;
      }





      default:
         return state

   }
}

export default userLocationReducer