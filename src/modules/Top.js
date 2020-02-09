import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import '../setting.js';

// Action
const GET_TOPIC_LIST = 'GET_TOPIC_LIST';
const SEARCH_TOPIC_NAME = 'SEARCH_TOPIC_NAME';
const SEARCH_TOPIC_TAG = 'SEARCH_TOPIC_NAME';
const GET_TOPIC_DETAIL = 'GET_TOPIC_DETAIL';
const GET_TOPIC_LIST_SUCCESS = 'GET_TOPIC_LIST_SUCCESS';


// Action Creator

export function fetchTopicList(meta) {
    return {
        type: 'GET_TOPIC_LIST',
        payload: {
            topics: [],
        },
        meta
    }
}

export function fetchTopicByName() {
    return {
        type: 'SEARCH_TOPIC_NAME',
        topics: []
    }
}

export function fetchTopicByTag() {
    return {
        type: 'SEARCH_TOPIC_NAME',
        topics: []
    }
}

export function fetchTopicDetail() {
    return {
        type: 'GET_TOPIC_DETAIL',
        topic: {}
    }
}

// Reducer
export const initialState = {
    topics: [],
    topic: {}
}

export function TopicReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TOPIC_LIST:
            state.topics = action.topics
            return Object.assign({}, state,)

        case GET_TOPIC_LIST_SUCCESS:
            return Object.assign({}, state, { topics: state.topics });

        case SEARCH_TOPIC_NAME:
            state.topics = action.topics
            return Object.assign({}, state)

        case SEARCH_TOPIC_TAG:
            state.topics = action.topics
            return Object.assign({}, state) 

        case GET_TOPIC_DETAIL:
            state.topic = action.topic
            return Object.assign({}, state) 

        default:
         return Object.assign({}, state);
    }
}

// Middleware
const requestFetchTopic = () => axios.get('http://localhost:8080/topic')
    .then((res) => {
        const topics = res.data
        console.log(res.data)
        return { topics }
    })
    .catch((error) => {
        console.log(error)
        return { error }
    })

function* topicList(context, action) {
    const meta = action.meta || {};
    const { topics, error } = yield call(requestFetchTopic);

    if (topics) {
        yield put({ type: GET_TOPIC_LIST_SUCCESS, topics});
        yield call(context.history.push, meta.pageOnTopicList)
    } else {
        console.log(error);
    }
}

function* getTopicList(context) {
    yield takeLatest(GET_TOPIC_LIST, topicList, context);
}

export const sagas = [
    getTopicList,
];