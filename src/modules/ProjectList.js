// プロジェクト一覧取得 ////////////////////////////////////////////////////////////////////////////////////////////////////
import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import '../setting.js';

// 【Action】////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const PROJECTLIST_GET_REQUEST = 'PROJECTLIST_GET_REQUEST';
export const PROJECTLIST_GET_SUCCESS = 'PROJECTLIST_GET_SUCCESS';
export const PROJECTLIST_GET_FAILURE = 'PROJECTLIST_GET_FAILURE';

export function getProjectListAction(path) {
    return {
        type: PROJECTLIST_GET_REQUEST,
        path
    }
}

// 【Reducer】 //////////////////////////////////////////////////////////////////////////////////////////////////////////
const initialState = {
    prosessing: false, //APIレスポンスの有無
    projectInfo: {
        projectList: [], //取得したトピック一覧
    },
    categoryInfo: {
        categoryList: [],
    },
    languageInfo: {
        languageList: [],
    },
    path: '', // データ取得後の遷移先path
    error: '',// 取得失敗時のエラーメッセージ
}

export function projectListReducer(state = initialState, action) {
    switch (action.type) {
        case PROJECTLIST_GET_REQUEST:
            return Object.assign({}, state, { processing: true })

        case PROJECTLIST_GET_SUCCESS:
            return Object.assign({}, state, { prosessing: false, projectInfo: { projectList: action.infoList.projectList }, categoryInfo: { categoryList: action.infoList.categoryList }, languageInfo: { languageList: action.infoList.languageList }, path: action.path, error: '' });

        case PROJECTLIST_GET_FAILURE:
            return Object.assign({}, state, { prosessing: false, path: action.path, error: action.error })

        default:
         return Object.assign({}, state);
    }
}

// 【Middleware】 //////////////////////////////////////////////////////////////////////////////////////////////////////////
const requestProjectList = () => axios.get('http://localhost:8080/project')
    .then((res) => {
        const infoList = res.data
        return { infoList }
    })
    .catch((error) => {
        return { error }
    })

function* getProjectList(context, action) {
    const path = action.path || {};
    const { infoList } = yield call(requestProjectList);

    if (infoList.projectList || infoList.categoryList || infoList.languageList) {
        yield put({ type: PROJECTLIST_GET_SUCCESS, infoList});
    } else {
        yield put({ type: PROJECTLIST_GET_FAILURE, error: '予期せぬエラーが発生しました。開発者に連絡してください' });
        yield call(context.history.push, path.failure)

    }
}

function* projectListSaga(context) {
    yield takeLatest(PROJECTLIST_GET_REQUEST, getProjectList, context);
}

export const projectListSagas = [
    projectListSaga,
];