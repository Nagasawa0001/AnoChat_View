// プロジェクト詳細 + 親タスク詳細取得 ////////////////////////////////////////////////////////////////////////////////////////////
import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import '../setting.js';

// 【Action】/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const GET_CHILDTASKDETAIL_REQUEST = 'GET_CHILDTASKDETAIL_REQUEST';
export const GET_CHILDTASKDETAIL_SUCCESS = 'GET_CHILDTASKDETAIL_SUCCESS';
export const GET_CHILDTASKDETAIL_FAILURE = 'GET_CHILDTASKDETAIL_FAILURE';

export const SEARCH_CHILDTASKDETAIL_REQUEST = 'SEARCH_CHILDTASKDETAIL_REQUEST';
export const SEARCH_CHILDTASKDETAIL_SUCCESS = 'SEARCH_CHILDTASKDETAIL_SUCCESS';
export const SEARCH_CHILDTASKDETAIL_FAILURE = 'SEARCH_CHILDTASKDETAIL_FAILURE';


export function getChildTaskDetailAction(childTaskId) {
    return {
        type: GET_CHILDTASKDETAIL_REQUEST,
        childTaskId: childTaskId,
    }
}

export function searchChildTaskAction(form) {
    return {
        type: SEARCH_CHILDTASKDETAIL_REQUEST,
        form: form
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

        case SEARCH_CHILDTASKDETAIL_REQUEST:
            return Object.assign({}, state, { processing: true })

        case SEARCH_CHILDTASKDETAIL_SUCCESS:
            state.projects = action.projects
            return Object.assign({}, state, { processing: false, childTask: action.result.childTask, taskCommentList: action.result.taskCommentList });

        case SEARCH_CHILDTASKDETAIL_FAILURE:
            return Object.assign({}, state, { processing: false, error: action.error })

        default:
         return Object.assign({}, state);
    }
}

// 【Middleware】////////////////////////////////////////////////////////////////////////////////////////////////////////////
const requestGetChildTaskDetail = (childTaskId) => axios.get('http://localhost:8080/task/child?id=' + childTaskId,
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
       yield put({type: SEARCH_CHILDTASKDETAIL_SUCCESS, projectDetail});
       yield call(context.history.push, '/project/' + projectDetail.id)
   } else {
       console.log('予期せぬエラーが発生しました　エラー：　' + error);
       yield put({type: SEARCH_CHILDTASKDETAIL_FAILURE, error})
   }
}

function* searchChildTaskSaga(context) {
    yield takeLatest(SEARCH_CHILDTASKDETAIL_REQUEST, searchChildTask, context)
}

export const childTaskSagas = [
    getChildTaskDetailSaga,
    searchChildTaskSaga
];