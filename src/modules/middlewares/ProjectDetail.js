import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import '../../setting.js';
import { GET_PROJECTDETAIL_REQUEST, GET_PROJECTDETAIL_SUCCESS, GET_PROJECTDETAIL_FAILURE } from '../actions/ProjectDetail';


const requestGetProjectDetail = (projectId) => axios.get('http://localhost:8080/project/detail?id=' + projectId)
.then((res) => {
    const projectDetail = res.data;
    console.log(projectDetail);
    return { projectDetail }
})
.catch((error) => {
    console.log(error);
    return { error }
})

function* getProjectDetail(context, action){
   const { projectDetail, error } = yield call(requestGetProjectDetail, action.projectId);
   console.log(projectDetail);


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