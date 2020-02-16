import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import '../../setting.js';
import { CHECK_PROJECTMEMBER_REQUEST, CHECK_PROJECTMEMBER_EXIST, CHECK_PROJECTMEMBER_NOTEXIST, CHECK_PROJECTMEMBER_UNLOGIN } from '../actions/ProjectDetail';


const requestCheckProjectMember = (projectId) => axios.get('http://localhost:8080/project/' + projectId)
.then((res) => {
    const result = res.data;
    console.log(result);
    return { result }
})
.catch((error) => {
    console.log(error);
    return { error }
})

function* checkProjectMember(context, action){
   const { result, error } = yield call(requestCheckProjectMember(action.projectId));

   if(result.loggedIn) {
       if(result.isExist) {
           yield put({type: CHECK_PROJECTMEMBER_EXIST, action});
           yield call(context.history.push, '/project/manage/' + action.projectId);
       } else {
           yield put({type: CHECK_PROJECTMEMBER_NOTEXIST, action});
           yield call(context.history.push, '/project/' + action.projectId);
       }
   } else {
       yield put({type: CHECK_PROJECTMEMBER_UNLOGIN});
       yield call(context.history.push, '/register/user')
   }
   if(error) {
       console.log('予期せぬエラーが発生しました　エラー：　' + error);
   }
}

function* checkProjectMemberSaga(context) {
    yield takeLatest(CHECK_PROJECTMEMBER_REQUEST, checkProjectMember, context)
}

export const projectListSagas = [
    checkProjectMemberSaga,
];