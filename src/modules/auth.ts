import { createAction } from 'redux-actions'
import { createReducer } from "typesafe-actions"
import createRequestSaga ,{createRequestActionTypes} from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth';
import produce from "immer";
import { takeLatest } from 'redux-saga/effects';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER,REGISTER_SUCCESS,REGISTER_FAILURE] = createRequestActionTypes(
    'auth/register',
)

const [LOGIN,LOGIN_SUCCESS,LOGIN_FAILURE] = createRequestActionTypes(
    'auth/login',
);

export const changeField = createAction(
    CHANGE_FIELD,
    ({form,key,value}: any) => ({
        form,
        key,
        value,
    }),
);

export const initializeForm = createAction(INITIALIZE_FORM,(form: any)=>form);

export const register = createAction(REGISTER,({username,password}:any)=> ({
    username,
    password
}));
export const login = createAction(LOGIN, ({username,password}:any)=> ({
    username,
    password,
}))

const registerSaga = createRequestSaga(REGISTER,authAPI.register);
const loginSaga = createRequestSaga(LOGIN,authAPI.login);
export function* authSaga() {
    yield takeLatest(REGISTER,registerSaga);
    yield takeLatest(LOGIN,loginSaga);
}

const initialState = {
    register: {
        username: '',
        password: '',
        passwordConfirm: '',
    },
    login: {
        username: '',
        password: '',
    },
    auth:null,
    authError:null,
} as unknown as any;

const auth = createReducer(initialState,{
    [CHANGE_FIELD]: (state:any, {payload: {form,key,value}}: any) =>
        produce(state,(draft: { [x: string]: { [x: string]: any; }; }) => {
            draft[form][key] = value;
        }),
    [INITIALIZE_FORM]: (state, {payload: form}) => ({
        ...state,
        [form]: initialState[form],
        authError: null,
    }),
    [REGISTER_SUCCESS]: (state: any, {payload: auth}: any) => ({
        ...state,
        authError: null,
        auth,
    }),
    [REGISTER_FAILURE]: (state: any, {payload: error}: any) => ({
        ...state,
        authError: error,
    }),
    [LOGIN_SUCCESS]: (state: any, {payload: auth}: any) => ({
        ...state,
        authError: null,
        auth,
    }),
    [LOGIN_FAILURE]: (state: any, {payload: error}: any) => ({
        ...state,
        authError: error,
    })
})


export default auth;