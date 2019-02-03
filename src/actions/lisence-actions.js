export const SET_PARAM = 'SET_PARAM'
export const CREATE_LICENSE = 'CREATE_LICENSE'
export const GET_LICENSES = 'GET_LICENSES'
export const GET_LICENSES_SUCCESS = 'GET_LICENSES_SUCCESS'

export const setParams = ( payload ) => ({
    type: SET_PARAM,
    payload
})

export const createLicense = (payload) => ({
    type:CREATE_LICENSE,
    payload
})

export const getLicenses = ( payload ) =>({
    type:GET_LICENSES,
    payload
})