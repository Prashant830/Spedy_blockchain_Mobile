import { combineReducers } from "redux";
import CartReducer from "./CartReducer";
import UserDetailReducer from "./UserDetailReducer";
import userLocationReducer from "./userLocationReducer";

let reducers = combineReducers({
    userLocationReducer: userLocationReducer,
    UserDetailReducer: UserDetailReducer,
    CartReducer: CartReducer


})

const rootReducer = (state, action) => {
    return reducers(state, action)
}

export default rootReducer