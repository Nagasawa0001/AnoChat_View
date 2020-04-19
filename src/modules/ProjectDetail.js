// プロジェクト詳細 + 親タスク詳細取得 ////////////////////////////////////////////////////////////////////////////////////////////
import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import '../setting.js';

// 【Action】/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const GET_PROJECTDETAIL_REQUEST = 'GET_PROJECTDETAIL_REQUEST';
export const GET_PROJECTDETAIL_SUCCESS = 'GET_PROJECTDETAIL_SUCCESS';
export const GET_PROJECTDETAIL_FAILURE = 'GET_PROJECTDETAIL_FAILURE';

export const SEARCH_PARENTTASK_REQUEST = 'SEARCH_PARENTTASK_REQUEST';
export const SEARCH_PARENTTASK_SUCCESS = 'SEARCH_PARENTTASK_SUCCESS';
export const SEARCH_PARENTTASK_FAILURE = 'SEARCH_PARENTTASK_FAILURE';

export const SWITCH_PARENT_TASK_REQUEST = 'SWITCH_PARENT_TASK_REQUEST';
export const SWITCH_PARENT_TASK_SUCCESS = 'SWITCH_PARENT_TASK_SUCCESS';
export const SWITCH_PARENT_TASK_FAILURE = 'SWITCH_PARENT_TASK_FAILURE';


export function getProjectDetailAction(projectId) {
    return {
        type: GET_PROJECTDETAIL_REQUEST,
        projectId: projectId,
    }
}

export function searchParentTaskAction(form) {
    return {
        type: SEARCH_PARENTTASK_REQUEST,
        form: form
    }
}

export function switchParentTaskAction(projectId, status) {
    return {
        type: SWITCH_PARENT_TASK_REQUEST,
        payload: {
            projectId: projectId,
            status: status
        },
    }
}

// 【Reducer】///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const secondState = {
    processing: false,
    projects: [],
    error: '',
}

export function projectDetailReducer(state = secondState, action) {
    switch (action.type) {
        case GET_PROJECTDETAIL_REQUEST:
            return Object.assign({}, state, { processing: true })

        case GET_PROJECTDETAIL_SUCCESS:
            return Object.assign({}, state, { processing: false, projectDetail: action.projectDetail});

        case GET_PROJECTDETAIL_FAILURE:
            return Object.assign({}, state, { processing: false, error: action.error })

        case SEARCH_PARENTTASK_REQUEST:
            return Object.assign({}, state, { processing: true })

        case SEARCH_PARENTTASK_SUCCESS:
            return Object.assign({}, state, { processing: false, projectDetail: action.projectDetail});

        case SEARCH_PARENTTASK_FAILURE:
            return Object.assign({}, state, { processing: false, error: action.error })


        case SWITCH_PARENT_TASK_REQUEST:
            return Object.assign({}, state, { processing: true })
    
        case SWITCH_PARENT_TASK_SUCCESS:
            return Object.assign({}, state, { processing: false, projectDetail: action.projectDetail});
    
         case SWITCH_PARENT_TASK_FAILURE:
            return Object.assign({}, state, { processing: false, error: action.error })

        default:
         return Object.assign({}, state);
    }
}

// 【Middleware】////////////////////////////////////////////////////////////////////////////////////////////////////////////
const requestGetProjectDetail = (projectId) => axios.get('http://localhost:8080/project?id=' + projectId,
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

function* getProjectDetail(context, action){
   const { projectDetail, error } = yield call(requestGetProjectDetail, action.projectId);

   if(projectDetail) {
       yield put({type: GET_PROJECTDETAIL_SUCCESS, projectDetail});
       yield call(context.history.push, '/project/' + projectDetail.id)
   } else {
       console.log('予期せぬエラーが発生しました　エラー：　' + error);
       yield put({type: GET_PROJECTDETAIL_FAILURE, error})
   }
}

function* getProjectDetailSaga(context) {
    yield takeLatest(GET_PROJECTDETAIL_REQUEST, getProjectDetail, context)
}

const requestSearchParentTask = (projectId) => axios.get('http://localhost:8080/project?id=' + projectId,
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

function* searchParentTask(context, action){
   const { projectDetail, error } = yield call(requestSearchParentTask, action.projectId);

   if(projectDetail) {
       yield put({type: SEARCH_PARENTTASK_SUCCESS, projectDetail});
       yield call(context.history.push, '/project/' + projectDetail.id)
   } else {
       console.log('予期せぬエラーが発生しました　エラー：　' + error);
       yield put({type: SEARCH_PARENTTASK_FAILURE, error})
   }
}

function* searchParentTaskSaga(context) {
    yield takeLatest(SEARCH_PARENTTASK_REQUEST, searchParentTask, context)
}

const requestSwitchParentTask = (payload) => axios.get('http://localhost:8080/task/parent/switch?projectId=' + payload.projectId + '&status=' + payload.status,
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

function* switchParentTask(context, action){
   const { projectDetail, error } = yield call(requestSwitchParentTask, action.payload);

   if(projectDetail) {
       yield put({type: SWITCH_PARENT_TASK_SUCCESS, projectDetail});
       yield call(context.history.push, '/project/' + projectDetail.id)
   } else {
       console.log('予期せぬエラーが発生しました　エラー：　' + error);
       yield put({type: SWITCH_PARENT_TASK_FAILURE, error})
   }
}

function* switchParentTaskSaga(context) {
    yield takeLatest(SWITCH_PARENT_TASK_REQUEST, switchParentTask, context)
}

export const projectDetailSagas = [
    getProjectDetailSaga,
    searchParentTaskSaga,
    switchParentTaskSaga
];