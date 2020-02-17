import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import '../../setting.js';
import { PROJECTLIST_GET_REQUEST, PROJECTLIST_GET_SUCCESS, PROJECTLIST_GET_FAILURE } from '../actions/ProjectList'

// Middleware
const requestProjectList = () => axios.get('http://localhost:8080/project')
    .then((res) => {
        const infoList = res.data
        return { infoList }
    })
    .catch((error) => {
        return { error }
    })

function* getProjectList(context, action) {
    const meta = action.meta || {};
    const { infoList, error } = yield call(requestProjectList);

    if (infoList.projectList) {
        yield put({ type: PROJECTLIST_GET_SUCCESS, infoList});
        yield call(context.history.push, meta.success)
    } else {
        console.log(error);
        yield put({ type: PROJECTLIST_GET_FAILURE, error: '予期せぬエラーが発生しました。開発者に連絡してください' });
        yield call(context.history.push, meta.failure)

    }
}

function* projectListSaga(context) {
    yield takeLatest(PROJECTLIST_GET_REQUEST, getProjectList, context);
}

export const projectListSagas = [
    projectListSaga,
];