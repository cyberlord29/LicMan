import {
    SET_PARAM, 
    GET_LICENSES_SUCCESS,
    SET_NAV,
    GET_PRODUCTS_SUCCESS,
    SET_PRODUCT_PARAMS
} from '../actions/lisence-actions'

const initialState = {
    license:{
        email:'',
        firstName:'',
        lastName: '',
        productName: '',
        // platform: '',
        version:'stable',
        startTime:'122134123',
        endTime:'',
        accountNumber:'',
        period:'',
    },
    product:{
        name:''
    },
    productData:[],
    licenseData:[],
    setNav:'Licenses'
}

const lisenceManager = (state = initialState, action) => {
    switch(action.type){
        case SET_NAV:
        return {
            ...state,
            setNav: action.payload.value
        }
        case SET_PARAM:
        let end = '0'
        if(action.payload.id==='reset'){
            return {
                ...state,
                license:{
                    email:'',
                    firstName:'',
                    lastName: '',
                    productName: '',
                    version:'stable',
                    startTime:'122134123',
                    endTime:'',
                    accountNumber:'',
                    period:'',
                }
            }
        }
        if(action.payload.id==='load'){
            return {
                ...state,
                license:{
                    ...state.license,
                    ...action.payload.value
                }
            }
        }
        if(action.payload.id==='period'){
            end = Math.floor(new Date().getTime()/1000.0) + 86400*action.payload.value 
            return {
                ...state,
                license:{
                    ...state.license,
                    [action.payload.id]: action.payload.value,
                    endTime:end
                }
            }
        }
        return {
            ...state,
            license:{
                ...state.license,
                [action.payload.id]: action.payload.value
            }
        }
        case GET_LICENSES_SUCCESS:
        return {
            ...state,
            licenseData: action.data
        }
        case GET_PRODUCTS_SUCCESS:
        return {
            ...state,
            productData: action.data
        }
        case SET_PRODUCT_PARAMS:
        return {
            ...state,
            product:{
                ...state.product,
                [action.payload.id]: action.payload.value
            }
        }
        default:
        return state
    }
}

export default lisenceManager
