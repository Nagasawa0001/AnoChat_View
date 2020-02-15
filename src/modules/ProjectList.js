import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import '../setting.js';

// Action
const PROJECTLIST_GET_REQUEST = 'PROJECTLIST_GET_REQUEST';
const PROJECTLIST_GET_SUCCESS = 'PROJECTLIST_GET_SUCCESS';
const PROJECTLIST_GET_FAILURE = 'PROJECTLIST_GET_FAILURE';


// Action Creator
export function getProjectListAction(meta) {
    return {
        type: PROJECTLIST_GET_REQUEST,
        meta
    }
}

// Reducer
export const initialState = {
    prosessing: false, //APIレスポンスの有無
    projects: [], //取得したトピック一覧
    meta: '', // データ取得後の遷移先path
    error: '',// 取得失敗時のエラーメッセージ
}

export function projectListReducer(state = initialState, action) {
    switch (action.type) {
        case PROJECTLIST_GET_REQUEST:
            return Object.assign({}, state, { prosessing: true, projects: [], meta: action.meta, error: '' })

        case PROJECTLIST_GET_SUCCESS:
            state.projects = action.projects
            return Object.assign({}, state, { prosessing: false, projects: action.projects, meta: action.meta, error: '' });

        case PROJECTLIST_GET_FAILURE:
            return Object.assign({}, state, { prosessing: false, projects: state.projects, meta: action.meta, error: action.error })

        default:
         return Object.assign({}, state);
    }
}

// Middleware
const requestProjectList = () => axios.get('http://localhost:8080/prjects')
    .then((res) => {
        const projects = res.data
        console.log(res.data)
        return { projects }
    })
    .catch((error) => {
        console.log(error)
        return { error }
    })

function* getProjectList(context, action) {
    const meta = action.meta || {};
    const { projects, error } = yield call(requestProjectList);

    if (projects) {
        yield put({ type: PROJECTLIST_GET_SUCCESS, projects});
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