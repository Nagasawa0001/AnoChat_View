// プロジェクト詳細 + 親タスク詳細取得 ////////////////////////////////////////////////////////////////////////////////////////////
import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import '../setting.js';

// 【Action】/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const GET_PARENTTASKDETAIL_REQUEST = 'GET_PARENTTASKDETAIL_REQUEST';
export const GET_PARENTTASKDETAIL_SUCCESS = 'GET_PARENTTASKDETAIL_SUCCESS';
export const GET_PARENTTASKDETAIL_FAILURE = 'GET_PARENTTASKDETAIL_FAILURE';

export const UPDATE_PARENT_TASK_STATUS_REQUEST = 'UPDATE_PARENT_TASK_STATUS_REQUEST';
export const UPDATE_PARENT_TASK_STATUS_SUCCESS = 'UPDATE_PARENT_TASK_STATUS_SUCCESS';
export const UPDATE_PARENT_TASK_STATUS_FAILURE = 'UPDATE_PARENT_TASK_STATUS_FAILURE';

export const SWITCH_CHILD_TASK_REQUEST = 'SWITCH_CHILD_TASK_REQUEST';
export const SWITCH_CHILD_TASK_SUCCESS = 'SWITCH_CHILD_TASK_SUCCESS';
export const SWITCH_CHILD_TASK_FAILURE = 'SWITCH_CHILD_TASK_FAILURE';


export function getParentTaskDetailAction(parentTaskId) {
    return {
        type: GET_PARENTTASKDETAIL_REQUEST,
        parentTaskId: parentTaskId,
    }
}

export function updateParentTaskStatusAction(parentTaskId, status) {
    return {
        type: UPDATE_PARENT_TASK_STATUS_REQUEST,
        payload: {
            parentTaskId: parentTaskId,
            status: status
        },
    }
}

export function switchChildTaskAction(parentTaskId, status) {
    return {
        type: SWITCH_CHILD_TASK_REQUEST,
        payload: {
            parentTaskId: parentTaskId,
            status: status
        },
    }
}

// 【Reducer】///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const secondState = {
    processing: false,
    error: '',
    parentTask: {},
    childTaskList: [],
}

export function parentTaskDetailReducer(state = secondState, action) {
    switch (action.type) {
        case GET_PARENTTASKDETAIL_REQUEST:
            return Object.assign({}, state, { processing: true })

        case GET_PARENTTASKDETAIL_SUCCESS:
            state.projects = action.projects
            return Object.assign({}, state, { processing: false, parentTask: action.result.parentTask, childTaskList: action.result.childTaskList });

        case GET_PARENTTASKDETAIL_FAILURE:
            return Object.assign({}, state, { processing: false, error: action.error })

        case SWITCH_CHILD_TASK_REQUEST:
            return Object.assign({}, state, { processing: true })

        case SWITCH_CHILD_TASK_SUCCESS:
            state.projects = action.projects
            return Object.assign({}, state, { processing: false, parentTask: action.result.parentTask, childTaskList: action.result.childTaskList });

        case SWITCH_CHILD_TASK_FAILURE:
            return Object.assign({}, state, { processing: false, error: action.error })

        case UPDATE_PARENT_TASK_STATUS_REQUEST:
            return Object.assign({}, state, { processing: true })

        case UPDATE_PARENT_TASK_STATUS_FAILURE:
            return Object.assign({}, state, { processing: false, error: action.error })

        default:
         return Object.assign({}, state);
    }
}

// 【Middleware】////////////////////////////////////////////////////////////////////////////////////////////////////////////
const requestGetParentTaskDetail = (parentTaskId) => axios.get('http://localhost:8080/task/parent?id=' + parentTaskId,
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

function* getParentTaskDetail(context, action){
   const { result, error } = yield call(requestGetParentTaskDetail, action.parentTaskId);
console.log(result);
   if(result) {
       yield put({type: GET_PARENTTASKDETAIL_SUCCESS, result});
       yield call(context.history.push, '/task/parent/' + result.parentTask.id)
   } else {
       console.log('予期せぬエラーが発生しました　エラー：　' + error);
       yield put({type: GET_PARENTTASKDETAIL_FAILURE, error})
   }
}

function* getParentTaskDetailSaga(context) {
    yield takeLatest(GET_PARENTTASKDETAIL_REQUEST, getParentTaskDetail, context)
}

const requestSwitchChildTask = (payload) => axios.get('http://localhost:8080/task/child/switch?parentTaskId=' + payload.parentTaskId + '&status=' + payload.status,
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

function* switchChildTask(context, action){
   const { result, error } = yield call(requestSwitchChildTask, action.payload);

   if(result) {
    yield put({type: GET_PARENTTASKDETAIL_SUCCESS, result});
    yield call(context.history.push, '/task/parent/' + result.parentTask.id)
} else {
    console.log('予期せぬエラーが発生しました　エラー：　' + error);
    yield put({type: GET_PARENTTASKDETAIL_FAILURE, error})
}
}

function* switchChildTaskSaga(context) {
    yield takeLatest(SWITCH_CHILD_TASK_REQUEST, switchChildTask, context)
}

const requestUpdateParentTaskStatus = (payload) => axios.patch('http://localhost:8080/task/parent/status',
    {
        id: payload.parentTaskId,
        status: parseInt(payload.status)
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

function* updateParentTaskStatus(context, action){
   const { result, error } = yield call(requestUpdateParentTaskStatus, action.payload);
   if(result.status === 200) {
        yield call(context.history.push, '/projects');
   } else if (error) {
        console.log('予期せぬエラーが発生しました　エラー：　' + error);
        yield put({type: UPDATE_PARENT_TASK_STATUS_REQUEST, error})
   }
}

function* updateParentTaskStatusSaga(context) {
    yield takeLatest(UPDATE_PARENT_TASK_STATUS_REQUEST, updateParentTaskStatus, context)
}

export const parentTaskSagas = [
    getParentTaskDetailSaga,
    switchChildTaskSaga,
    updateParentTaskStatusSaga
];