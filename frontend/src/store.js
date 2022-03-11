import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { cartReducer } from './reducers/cartReducers'
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer,
    productTopRatedReducer,
    productCategoryReducer,
} from './reducers/productReducers'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
}
    from './reducers/userReducers'
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderDeliverReducer,
    orderListMyReducer,
    orderListReducer,
}
    from './reducers/orderReducers'


// Combine reducers
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
    productCategory: productCategoryReducer,

    cart: cartReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userDelete: userDeleteReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,

})

// Pull cart data from local storage
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

// Pull user info from local storage
const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

// Pull shipping address from local storage
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

// Initial State
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store