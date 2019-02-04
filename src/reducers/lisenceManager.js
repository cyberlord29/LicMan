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
        // platform: '',
        version:'stable',
        startTime:'122134123',
        endTime:'',
        accountNumber:'',
        period:'',
    },
    licenseData:[]
}

const lisenceManager = (state = initialState, action) => {
    switch(action.type){
        case SET_PARAM:
        let end = '0'
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
