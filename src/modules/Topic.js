import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

// Action
const GET_TOPIC_LIST = 'GET_TOPIC_LIST';
const SEARCH_TOPIC_NAME = 'SEARCH_TOPIC_NAME';
const SEARCH_TOPIC_TAG = 'SEARCH_TOPIC_NAME';
const GET_TOPIC_DETAIL = 'GET_TOPIC_DETAIL';


// Action Creator
export function GetTopicList() {
    return {
        type: 'GET_TOPIC_LIST',
        topics: []
    }
}

export function SearchTopicByName() {
    return {
        type: 'SEARCH_TOPIC_NAME',
        topics: []
    }
}

export function SearchTopicByTag() {
    return {
        type: 'SEARCH_TOPIC_NAME',
        topics: []
    }
}

export function GetTopicDetail() {
    return {
        type: 'GET_TOPIC_DETAIL',
        topic: {}
    }
}

// Reducer
const initialState = {
    type: '',
    topics: [],
    topic: {}
}

export function TopicState(state = initialState, action) {
    switch (action.type) {
        case GET_TOPIC_LIST:
            state.type = action.type
            state.topics = action.topics
            return Object.assign({}, state)

        case SEARCH_TOPIC_NAME:
            state.type = action.type
            state.topics = action.topics
            return Object.assign({}, state)

        case SEARCH_TOPIC_TAG:
            state.type = action.type
            state.topics = action.topics
            return Object.assign({}, state) 

        case GET_TOPIC_DETAIL:
            state.type = action.type
            state.topic = action.topic
            return Object.assign({}, state) 
    }
}

// Middleware
const requestTopic = () => axios.get('http://localhost:3000/topic')
    .then((res) => {
        const topics = res.data
        console.log(topics)
        return { topics }
    })
    .catch((error) => {
        return { error }
    })

function* FetchTopicList() {

    const { topics, error } = yield call(requestTopic);
    console.log(topics)

    if (topics) {
        yield put({ type: 'GET_TOPIC_LIST', topics});
    } else {
        console.log(error);
    }
}

export default [takeEvery('GET_TOPIC_LIST', FetchTopicList)];