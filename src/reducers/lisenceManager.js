import {
    SET_PARAM, 
    GET_LICENSES_SUCCESS,
} from '../actions/lisence-actions'

const initialState = {
    license:{
        email:'',
        firstName:'',
        lastName: '',
        productName: '',
        platform: '',
        version:'stable',
        startTime:'122134123',
        endTime:'123412342',
        accountNumber:'',
        period:'',
        licenses:[],
        users:[],
        products: [],
    },
    licenseData:[]
}

const lisenceManager = (state = initialState, action) => {
    switch(action.type){
        case SET_PARAM:
        return {
            ...state,
            license:{
                ...state.license,
                [action.payload.id]: action.payload.value
            }
        }
        case GET_LICENSES_SUCCESS:
        console.log(action.data)
        return {
            ...state,
            licenseData: action.data
        }
        default:
        return state
    }
}

export default lisenceManager
