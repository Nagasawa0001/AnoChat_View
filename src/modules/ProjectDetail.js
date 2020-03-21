// プロジェクト詳細 + 親タスク詳細取得 ////////////////////////////////////////////////////////////////////////////////////////////
import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import '../setting.js';

// 【Action】/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const GET_PROJECTDETAIL_REQUEST = 'GET_PROJECTDETAIL_REQUEST';
export const GET_PROJECTDETAIL_SUCCESS = 'GET_PROJECTDETAIL_SUCCESS';
export const GET_PROJECTDETAIL_FAILURE = 'GET_PROJECTDETAIL_FAILURE';

export function getProjectDetailAction(projectId) {
    return {
        type: GET_PROJECTDETAIL_REQUEST,
        projectId: projectId,
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
            state.projects = action.projects
            return Object.assign({}, state, { processing: false, projectDetail: action.projectDetail});

        case GET_PROJECTDETAIL_FAILURE:
            return Object.assign({}, state, { processing: false, error: action.error })

        default:
         return Object.assign({}, state);
    }
}

// 【Middleware】////////////////////////////////////////////////////////////////////////////////////////////////////////////
const requestGetProjectDetail = (projectId) => axios.get('http://localhost:8080/project/detail?id=' + projectId)
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

export const projectDetailSagas = [
    getProjectDetailSaga,
];