import { combineReducers } from 'redux';
import {all} from 'redux-saga/effects';
import auth,{authSaga} from './auth';
import loading from './loading';
import user, {userSaga} from "./user";
import sleepData, {sleepDataSaga} from "./sleepData";

const rootReducer = combineReducers({
    auth,
    loading,
    user,
    sleepData
});

export function* rootSaga() {
    yield all([authSaga(), userSaga(),sleepDataSaga()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;