let defaultState = {
    cart: []
}

let CartReducer = (state = defaultState, action) => {

    switch (action.type) {

        case "ADD_TO_CART": {

            let newState = { ...state };
            newState.cart = [...newState.cart, action.payload]
            return newState;
        }
        case "REMOVE_TO_CART": {

            let newState = { ...state };
            newState.cart = newState.cart.filter((item, index) => index !== action.payload)
            return newState;

        }




        default:
            return state

    }
}


export default CartReducer