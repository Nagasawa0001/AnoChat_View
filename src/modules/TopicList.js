import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import '../setting.js';

// Action
const TOPICLIST_GET_REQUEST = 'TOPICLIST_GET_REQUEST';
const TOPICLIST_GET_SUCCESS = 'TOPICLIST_GET_SUCCESS';
const TOPICLIST_GET_FAILURE = 'TOPICLIST_GET_FAILURE';


// Action Creator
export function fetchTopicList(meta) {
    return {
        type: TOPICLIST_GET_REQUEST,
        meta
    }
}

// Reducer
export const initialState = {
    prosessing: false, //APIレスポンスの有無
    topics: [], //取得したトピック一覧
    meta: '', // データ取得後の遷移先path
    error: '',// 取得失敗時のエラーメッセージ
}

export function topicListReducer(state = initialState, action) {
    switch (action.type) {
        case TOPICLIST_GET_REQUEST:
            return Object.assign({}, state, { prosessing: true, topics: [], meta: action.meta, error: '' })

        case TOPICLIST_GET_SUCCESS:
            state.topics = action.topics
            return Object.assign({}, state, { prosessing: false, topics: action.topics, meta: action.meta, error: '' });

        case TOPICLIST_GET_FAILURE:
            return Object.assign({}, state, { prosessing: false, topics: state.topics, meta: action.meta, error: action.error })

        default:
         return Object.assign({}, state);
    }
}

// Middleware
const requestTopicList = () => axios.get('http://localhost:8080/topic')
    .then((res) => {
        const topics = res.data
        console.log(res.data)
        return { topics }
    })
    .catch((error) => {
        console.log(error)
        return { error }
    })

function* getTopicList(context, action) {
    const meta = action.meta || {};
    const { topics, error } = yield call(requestTopicList);

    if (topics) {
        yield put({ type: TOPICLIST_GET_SUCCESS, topics});
        yield call(context.history.push, meta.pageOnTopicList)
    } else {
        console.log(error);
        yield put({ type: TOPICLIST_GET_FAILURE, error: '予期せぬエラーが発生しました。開発者に連絡してください' });
        yield call(context.history.push, meta.pageOnTop)

    }
}

function* topicListSaga(context) {
    yield takeLatest(TOPICLIST_GET_REQUEST, getTopicList, context);
}

export const topicListSagas = [
    topicListSaga,
];