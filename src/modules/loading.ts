import { createAction } from "redux-actions"
import { createReducer } from "typesafe-actions"
// 액션 타입
const START_LOADING = "loading/START_LOADING"
const FINISH_LOADING = "loading/END_LOADING"
// 액션 생성 함수
export const startLoading = createAction(
    START_LOADING,
    (actionType: any) => actionType
)
export const finishLoading = createAction(
    FINISH_LOADING,
    (actionType: any) => actionType
)
// 초기 상태
const initialState = {}
// 리듀서 함수 정의
const loading = createReducer(initialState, {
    [START_LOADING]: (state, { payload }) => ({
        ...state,
        [payload]: true
    }),
    [FINISH_LOADING]: (state, { payload }) => ({
        ...state,
        [payload]: false
    })
},)
export default loading