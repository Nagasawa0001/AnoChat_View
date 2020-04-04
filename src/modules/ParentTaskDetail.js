// プロジェクト詳細 + 親タスク詳細取得 ////////////////////////////////////////////////////////////////////////////////////////////
import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import '../setting.js';

// 【Action】/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const GET_PARENTTASKDETAIL_REQUEST = 'GET_PARENTTASKDETAIL_REQUEST';
export const GET_PARENTTASKDETAIL_SUCCESS = 'GET_PARENTTASKDETAIL_SUCCESS';
export const GET_PARENTTASKDETAIL_FAILURE = 'GET_PARENTTASKDETAIL_FAILURE';

export const SEARCH_PARENTTASKDETAIL_REQUEST = 'SEARCH_PARENTTASKDETAIL_REQUEST';
export const SEARCH_PARENTTASKDETAIL_SUCCESS = 'SEARCH_PARENTTASKDETAIL_SUCCESS';
export const SEARCH_PARENTTASKDETAIL_FAILURE = 'SEARCH_PARENTTASKDETAIL_FAILURE';


export function getParentTaskDetailAction(parentTaskId) {
    return {
        type: GET_PARENTTASKDETAIL_REQUEST,
        parentTaskId: parentTaskId,
    }
}

export function searchChildTaskAction(form) {
    return {
        type: SEARCH_PARENTTASKDETAIL_REQUEST,
        form: form
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

        case SEARCH_PARENTTASKDETAIL_REQUEST:
            return Object.assign({}, state, { processing: true })

        case SEARCH_PARENTTASKDETAIL_SUCCESS:
            state.projects = action.projects
            return Object.assign({}, state, { processing: false, parentTask: action.result.parentTask, childTaskList: action.result.childTaskList });

        case SEARCH_PARENTTASKDETAIL_FAILURE:
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

const requestSearchChildTask = (projectId) => axios.get('http://localhost:8080/project?id=' + projectId,
    {
        withCredentials: true
    })
.then((res) => {
    const projectDetail = res.data;
    return { projectDetail }
})
.catch((error) => {
    return { error }
})

function* searchChildTask(context, action){
   const { projectDetail, error } = yield call(requestSearchChildTask, action.projectId);

   if(projectDetail) {
       yield put({type: SEARCH_PARENTTASKDETAIL_SUCCESS, projectDetail});
       yield call(context.history.push, '/project/' + projectDetail.id)
   } else {
       console.log('予期せぬエラーが発生しました　エラー：　' + error);
       yield put({type: SEARCH_PARENTTASKDETAIL_FAILURE, error})
   }
}

function* searchParentTaskSaga(context) {
    yield takeLatest(SEARCH_PARENTTASKDETAIL_REQUEST, searchChildTask, context)
}

export const parentTaskSagas = [
    getParentTaskDetailSaga,
    searchParentTaskSaga
];