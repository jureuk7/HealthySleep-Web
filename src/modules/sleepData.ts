import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import { createAction } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import * as sleepDataAPI from "../lib/api/sleepData";
import { createReducer } from "typesafe-actions";
import produce from "immer";

const CHANGE_FIELD = "sleepData/CHANGE_FIELD";
const SET_FIELD = "sleepData/SET_FIELD";
const INITIALIZE_FORM = "sleepData/INITIALIZE_FORM";

const [DATA_INIT, DATA_INIT_SUCCESS, DATA_INIT_FAILURE] =
  createRequestActionTypes("sleepData/DATA_INIT");

const [EXISTS, EXISTS_SUCCESS, EXISTS_FAILURE] =
  createRequestActionTypes("sleepData/EXISTS");

const [MERGE_DATA, MERGE_DATA_SUCCESS, MERGE_DATA_FAILURE] =
  createRequestActionTypes("sleepData/MERGE_DATA");

const [SET_START_SLEEP, SET_START_SLEEP_SUCCESS, SET_START_SLEEP_FAILURE] =
  createRequestActionTypes("sleepData/SET_START_SLEEP");

const [SET_FINISH_SLEEP, SET_FINISH_SLEEP_SUCCESS, SET_FINISH_SLEEP_FAILURE] =
  createRequestActionTypes("sleepData/SET_FINISH_SLEEP");

const [READ_WEEK, READ_WEEK_SUCCESS, READ_WEAK_FAILURE] =
  createRequestActionTypes("sleepData/READ_WEEK");

const [READ_LAST_WEEK, READ_LAST_WEEK_SUCCESS, READ_LAST_WEAK_FAILURE] =
  createRequestActionTypes("sleepData/READ_LAST_WEEK");

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }: any) => ({
    form,
    key,
    value,
  })
);

export const setField = createAction(
  SET_FIELD,
  ({ form, year, month, day, hour, min }: any) => ({
    form,
    year,
    month,
    day,
    hour,
    min,
  })
);

export const initializeForm = createAction(
  INITIALIZE_FORM,
  (form: any) => form
);

export const dataInit = createAction(
  DATA_INIT,
  ({ username, sleepDate }: any) => ({
    username,
    sleepDate,
  })
);

export const exists = createAction(EXISTS, ({ username, sleepDate }: any) => ({
  username,
  sleepDate,
}));

export const mergeData = createAction(
  MERGE_DATA,
  ({ username, sleepDate }: any) => ({
    username,
    sleepDate,
  })
);

export const setStartSleep = createAction(
  SET_START_SLEEP,
  ({ username, sleepDate, startSleep }: any) => ({
    username,
    sleepDate,
    startSleep,
  })
);

export const setFinishSleep = createAction(
  SET_FINISH_SLEEP,
  ({ username, sleepDate, finishSleep }: any) => ({
    username,
    sleepDate,
    finishSleep,
  })
);

export const readWeek = createAction(
  READ_WEEK,
  ({ username, sleepDate }: any) => ({
    username,
    sleepDate,
  })
);

export const readLastWeek = createAction(
  READ_LAST_WEEK,
  ({ username, sleepDate }: any) => ({
    username,
    sleepDate,
  })
);

const dataInitSaga = createRequestSaga(DATA_INIT, sleepDataAPI.init);
const existsSaga = createRequestSaga(EXISTS, sleepDataAPI.isExists);
const setStartSleepSaga = createRequestSaga(
  SET_START_SLEEP,
  sleepDataAPI.setStartSleep
);
const setFinishSleepSaga = createRequestSaga(
  SET_FINISH_SLEEP,
  sleepDataAPI.setFinishSleep
);
const readWeekSaga = createRequestSaga(READ_WEEK, sleepDataAPI.readWeek);
const mergeDataSaga = createRequestSaga(MERGE_DATA, sleepDataAPI.read);

const readLastWeekSaga = createRequestSaga(
  READ_LAST_WEEK,
  sleepDataAPI.readWeek
);

export function* sleepDataSaga() {
  yield takeLatest(SET_START_SLEEP, setStartSleepSaga);
  yield takeLatest(SET_FINISH_SLEEP, setFinishSleepSaga);
  yield takeLatest(EXISTS, existsSaga);
  yield takeLatest(READ_WEEK, readWeekSaga);
  yield takeLatest(DATA_INIT, dataInitSaga);
  yield takeLatest(MERGE_DATA, mergeDataSaga);
  yield takeLatest(READ_LAST_WEEK, readLastWeekSaga);
}

const initialState = {
  startSleep: {
    year: null,
    month: null,
    day: null,
    hour: null,
    min: null,
  },
  finishSleep: {
    year: null,
    month: null,
    day: null,
    hour: null,
    min: null,
  },
  isExists: null,
  weekend: null,
  lastWeekend: null,
  ds: null,
  initSuccess: null,
} as unknown as any;

const sleepData = createReducer(initialState, {
  [CHANGE_FIELD]: (state: any, { payload: { form, key, value } }: any) =>
    produce(state, (draft: { [x: string]: { [x: string]: any } }) => {
      draft[form][key] = value;
    }),
  [SET_FIELD]: (
    state: any,
    { payload: { form, year, month, day, hour, min } }: any
  ) =>
    produce(state, (draft: { [x: string]: { [x: string]: any } }) => {
      draft[form].year = year;
      draft[form].month = month;
      draft[form].day = day;
      draft[form].hour = hour;
      draft[form].min = min;
    }),
  [INITIALIZE_FORM]: (state, { payload: form }) => ({
    ...state,
    [form]: initialState[form],
    sleepDataError: null,
  }),
  [EXISTS_SUCCESS]: (state: any, { payload: result }: any) => ({
    ...state,
    isExists: result.exists,
  }),
  [EXISTS_FAILURE]: (state: any, { payload: error }: any) => ({
    ...state,
    sleepDataError: error,
  }),
  [DATA_INIT_SUCCESS]: (state: any, { payload: result }: any) => ({
    ...state,
    initSuccess: result,
    isExists: true,
  }),
  [DATA_INIT_FAILURE]: (state: any, { payload: error }: any) => ({
    ...state,
    sleepDataError: error,
  }),
  [MERGE_DATA_SUCCESS]: (state: any, { payload: result }: any) => ({
    ...state,
    startSleep: {
      year: result.startSleep.year
        ? result.startSleep.year
        : state.startSleep.year,
      month: result.startSleep.month
        ? result.startSleep.month
        : state.startSleep.month,
      day: result.startSleep.day ? result.startSleep.day : state.startSleep.day,
      hour: result.startSleep.hour
        ? result.startSleep.hour
        : state.startSleep.hour,
      min: result.startSleep.min ? result.startSleep.min : state.startSleep.min,
    },
    finishSleep: {
      year: result.finishSleep.year
        ? result.finishSleep.year
        : state.finishSleep.year,
      month: result.finishSleep.month
        ? result.finishSleep.month
        : state.finishSleep.month,
      day: result.finishSleep.day
        ? result.finishSleep.day
        : state.finishSleep.day,
      hour: result.finishSleep.hour
        ? result.finishSleep.hour
        : state.finishSleep.hour,
      min: result.finishSleep.min
        ? result.finishSleep.min
        : state.finishSleep.min,
    },
  }),
  [MERGE_DATA_FAILURE]: (state: any, { payload: error }: any) => ({
    ...state,
    sleepDataError: error,
  }),
  [SET_START_SLEEP_SUCCESS]: (state: any, { payload: result }: any) => ({
    ...state,
  }),
  [SET_START_SLEEP_FAILURE]: (state: any, { payload: error }: any) => ({
    ...state,
    sleepDataError: error,
  }),
  [SET_FINISH_SLEEP_SUCCESS]: (state: any, { payload: result }: any) => ({
    ...state,
  }),
  [SET_FINISH_SLEEP_FAILURE]: (state: any, { payload: error }: any) => ({
    ...state,
    sleepDataError: error,
  }),
  [READ_WEEK_SUCCESS]: (state: any, { payload: result }: any) => ({
    ...state,
    weekend: result,
  }),
  [READ_WEAK_FAILURE]: (state: any, { payload: error }: any) => ({
    ...state,
    sleepDataError: error,
  }),
  [READ_LAST_WEEK_SUCCESS]: (state: any, { payload: result }: any) => ({
    ...state,
    lastWeekend: result,
  }),
  [READ_LAST_WEAK_FAILURE]: (state: any, { payload: error }: any) => ({
    ...state,
    sleepDataError: error,
  }),
});

export default sleepData;
