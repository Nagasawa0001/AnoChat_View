// プロジェクト詳細 + 親タスク詳細取得 ////////////////////////////////////////////////////////////////////////////////////////////
import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import '../setting.js';

// 【Action】/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const GET_CHILDTASKDETAIL_REQUEST = 'GET_CHILDTASKDETAIL_REQUEST';
export const GET_CHILDTASKDETAIL_SUCCESS = 'GET_CHILDTASKDETAIL_SUCCESS';
export const GET_CHILDTASKDETAIL_FAILURE = 'GET_CHILDTASKDETAIL_FAILURE';

export const UPDATE_CHILD_TASK_STATUS_REQUEST = 'UPDATE_CHILD_TASK_STATUS_REQUEST';
export const UPDATE_CHILD_TASK_STATUS_SUCCESS = 'UPDATE_CHILD_TASK_STATUS_SUCCESS';
export const UPDATE_CHILD_TASK_STATUS_FAILURE = 'UPDATE_CHILD_TASK_STATUS_FAILURE';


export function getChildTaskDetailAction(childTaskId) {
    return {
        type: GET_CHILDTASKDETAIL_REQUEST,
        childTaskId: childTaskId,
    }
}

export function updateChildTaskStatusAction(childTaskId, status) {
    return {
        type: UPDATE_CHILD_TASK_STATUS_REQUEST,
        payload: {
            childTaskId: childTaskId,
            status: status
        },
    }
}

// 【Reducer】///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const secondState = {
    processing: false,
    error: '',
    childTask: {},
    taskCommnetList: [],
}

export function childTaskDetailReducer(state = secondState, action) {
    switch (action.type) {
        case GET_CHILDTASKDETAIL_REQUEST:
            return Object.assign({}, state, { processing: true })

        case GET_CHILDTASKDETAIL_SUCCESS:
            state.projects = action.projects
            return Object.assign({}, state, { processing: false, childTask: action.result.childTask, taskCommentList: action.result.taskCommentList });

        case GET_CHILDTASKDETAIL_FAILURE:
            return Object.assign({}, state, { processing: false, error: action.error })

        case UPDATE_CHILD_TASK_STATUS_REQUEST:
            return Object.assign({}, state, { processing: true })

        case UPDATE_CHILD_TASK_STATUS_FAILURE:
            return Object.assign({}, state, { processing: false, error: action.error })

        default:
         return Object.assign({}, state);
    }
}

// 【Middleware】////////////////////////////////////////////////////////////////////////////////////////////////////////////
const requestGetChildTaskDetail = (payload) => axios.patch('http://localhost:8080/task/child',
    {
        id: payload.childTaskId,
        status: payload.status
    }, 
    {
        withCredentials: true
    })
.then((res) => {
    const result = res.data;
    return { result }
})
.catch((error) => {
    return { error }
})

function* getChildTaskDetail(context, action){
   const { result, error } = yield call(requestGetChildTaskDetail, action.childTaskId);
console.log(result);
   if(result) {
       yield put({type: GET_CHILDTASKDETAIL_SUCCESS, result});
       yield call(context.history.push, '/task/child/' + result.childTask.id)
   } else {
       console.log('予期せぬエラーが発生しました　エラー：　' + error);
       yield put({type: GET_CHILDTASKDETAIL_FAILURE, error})
   }
}

function* getChildTaskDetailSaga(context) {
    yield takeLatest(GET_CHILDTASKDETAIL_REQUEST, getChildTaskDetail, context)
}

const requestUpdateChildTaskStatus = (payload) => axios.patch('http://localhost:8080/task/child',
    {
        id: payload.childTaskId,
        status: payload.status
    },    
    {
        withCredentials: true
    })
    .then((res) => {
        const result = res;
        return { result }
    })
    .catch((error) => {
        return { error }
    })

function* updateChildTaskStatus(context, action){
   const { result, error } = yield call(requestUpdateChildTaskStatus, action.payload);

   if(result.status === 200) {
        yield put({type: GET_CHILDTASKDETAIL_REQUEST})
   } else if (error) {
        console.log('予期せぬエラーが発生しました　エラー：　' + error);
        yield put({type: UPDATE_CHILD_TASK_STATUS_FAILURE, error})
   }
}

function* updateChildTaskStatusSaga(context) {
    yield takeLatest(UPDATE_CHILD_TASK_STATUS_REQUEST, updateChildTaskStatus, context)
}

export const childTaskSagas = [
    getChildTaskDetailSaga,
    updateChildTaskStatusSaga
];