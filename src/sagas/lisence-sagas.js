import { takeLatest, put, fork } from 'redux-saga/effects'
import {
    CREATE_LICENSE,
    GET_LICENSES,
    GET_LICENSES_SUCCESS,
} from '../actions/lisence-actions'

import axios from 'axios'


function * getLatestUsersFlow() {
    yield takeLatest(CREATE_LICENSE, createLicense)
}

function * getLicensesFlow() {
    yield takeLatest(GET_LICENSES, getLicenses)
}

function * createLicense( { payload } ) {
    const response = yield axios.post(`/licenses`,payload)
    if (response && response.data) {
        console.log(response.data)
        // yield put({
        //     type: ,
        //     data: response.data.userList
        //   })
    }
}

function * getLicenses(){
    const response = yield axios.get(`/licenses`)
    if(response && response.data){
        yield put({
            type:GET_LICENSES_SUCCESS,
            data: response.data
        })
    }
}

export default [
    fork(getLatestUsersFlow),
    fork(getLicensesFlow)
]
