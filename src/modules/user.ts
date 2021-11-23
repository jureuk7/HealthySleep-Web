import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import {createAction} from "redux-actions";
import {call, takeLatest} from "redux-saga/effects";
import * as authAPI from '../lib/api/auth'
import {createReducer} from "typesafe-actions";

const TEMP_SET_USER = 'user/TEMP_SET_USER';

const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
    'user/CHECK',
);
const LOGOUT = 'user/LOGOUT'

export const tempSetUser = createAction(TEMP_SET_USER, (user:any) => user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

const checkSaga = createRequestSaga(CHECK, authAPI.check);

function checkFailureSaga() {
    try {
        localStorage.removeItem('user');
    } catch (e) {
        console.log('localStorage 가 작동하지 않습니다.');
    }
}

function* logoutSaga() {
    try {
        yield call(authAPI.logout);
        localStorage.removeItem('user');
    } catch (e) {
        console.log(e);
    }
}


export function* userSaga() {
    yield takeLatest(CHECK,checkSaga);
    yield takeLatest(CHECK_FAILURE,checkFailureSaga);
    yield takeLatest(LOGOUT,logoutSaga);
}

const initialState = {
    user:null,
    checkError: null,
};

const user = createReducer(initialState, {
    [TEMP_SET_USER]: (state:any,{payload:user}:any)=> ({
        ...state,
        user,
    }),
    [CHECK_SUCCESS]: (state:any,{payload:user}:any)=> ({
        ...state,
        user,
        checkError: null,
    }),
    [CHECK_FAILURE]: (state:any,{payload:error}:any)=> ({
        ...state,
        user: null,
        checkError: error,
    }),
    [LOGOUT]: (state:any) => ({
        ...state,
        user:null,
    })

})

export default user;