import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import {createAction} from "redux-actions";
import {takeLatest} from "redux-saga/effects";
import * as authAPI from '../lib/api/auth'
import {createReducer} from "typesafe-actions";

const TEMP_SET_USER = 'user/TEMP_SET_USER';

const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
    'user/CHECK',
);

export const tempSetUser = createAction(TEMP_SET_USER, (user:any) => user);
export const check = createAction(CHECK);

const checkSaga = createRequestSaga(CHECK, authAPI.check);
export function* userSaga() {
    yield takeLatest(CHECK,checkSaga);
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
    })
})

export default user;