// プロジェクト一覧取得 ////////////////////////////////////////////////////////////////////////////////////////////////////
import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import '../setting.js';
import getJSESSION from '../common';


// 【Action】////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const PROJECTLIST_GET_REQUEST = 'PROJECTLIST_GET_REQUEST';
export const PROJECTLIST_GET_SUCCESS = 'PROJECTLIST_GET_SUCCESS';
export const PROJECTLIST_GET_FAILURE = 'PROJECTLIST_GET_FAILURE';

export const SEARCH_PROJECT_REQUEST = 'SEARCH_PROJECT_REQUEST';
export const SEARCH_PROJECT_SUCCESS = 'SEARCH_PROJECT_SUCCESS';
export const SEARCH_PROJECT_FAILURE = 'SEARCH_PROJECT_FAILURE';

export const CONFIRM_INVITATION_REQUEST = 'CONFIRM_INVITATION_REQUEST';
export const CONFIRM_INVITATION_FAILURE = 'CONFIRM_INVITATION_FAILURE';

export function getProjectListAction(userId) {
    return {
        type: PROJECTLIST_GET_REQUEST,
        userId
    }
}

export function searchProjectAction(form) {
    return {
        type: SEARCH_PROJECT_REQUEST,
        form: form
    }
}

export function confirmInvitationAction(messageInfo) {
    return {
        type: CONFIRM_INVITATION_REQUEST,
        messageInfo: {
            id: messageInfo.id,
            toUserId: messageInfo.toUserId,
            projectId: messageInfo.projectId
        }
    }
}

// 【Reducer】 //////////////////////////////////////////////////////////////////////////////////////////////////////////
const initialState = {
    prosessing: false, //APIレスポンスの有無
    error: '',
    userInfo: {
        projectList: [],
        messageList: [],
    }
}

export function projectListReducer(state = initialState, action) {
    switch (action.type) {
        case PROJECTLIST_GET_REQUEST:
            return Object.assign({}, state, { processing: true })

        case PROJECTLIST_GET_SUCCESS:
            return Object.assign({}, state, { prosessing: false, userInfo: { projectList: action.infoList.projectList, messageList: action.infoList.messageList }});

        case PROJECTLIST_GET_FAILURE:
            return Object.assign({}, state, { prosessing: false, error: action.error })

        case SEARCH_PROJECT_REQUEST:
            return Object.assign({}, state, { processing: true })

        case SEARCH_PROJECT_SUCCESS:
            return Object.assign({}, state, { prosessing: false, userInfo: { projectList: action.infoList.projectList, messageList: action.infoList.messageList }});

        case SEARCH_PROJECT_FAILURE:
            return Object.assign({}, state, { prosessing: false, error: action.error })

        case CONFIRM_INVITATION_REQUEST:
            return Object.assign({}, state, { processing: true })
    
        case CONFIRM_INVITATION_FAILURE:
            return Object.assign({}, state, { prosessing: false, error: action.error })

        default:
         return Object.assign({}, state);
    }
}

// 【Middleware】 //////////////////////////////////////////////////////////////////////////////////////////////////////////
const requestProjectList = (userId) => axios.get('http://localhost:8080/project/list?userId=' + userId,
    {
        withCredentials: true
    }
)
    .then((res) => {
        const infoList = res.data
        return { infoList }
    })
    .catch((error) => {
        return { error }
    })

function* getProjectList(context, action) {

    const { infoList } = yield call(requestProjectList, getJSESSION().userId);
    console.log(infoList);
    if (infoList) {
        yield put({ type: PROJECTLIST_GET_SUCCESS, infoList});
    } else {
        yield put({ type: PROJECTLIST_GET_FAILURE, error: '予期せぬエラーが発生しました。開発者に連絡してください' });

    }
}

function* projectListSaga(context) {
    yield takeLatest(PROJECTLIST_GET_REQUEST, getProjectList, context);
}

const requestSearchProject = (userId, title) => axios.get('http://localhost:8080/project/search?userId=' + userId + '&title=' + title,
    {
        withCredentials: true
    }
)
    .then((res) => {
        const infoList = res.data
        return { infoList }
    })
    .catch((error) => {
        return { error }
    })

function* searchProject(context, action) {

    const { infoList, error } = yield call(requestSearchProject, action.form.userId, action.form.title);
    console.log(infoList);
    if (error) {
        yield put({ type: SEARCH_PROJECT_FAILURE, error: '予期せぬエラーが発生しました。開発者に連絡してください' });   
    } else {
        yield put({ type: SEARCH_PROJECT_SUCCESS, infoList});
    }
}

function* searchProjectSaga(context) {
    yield takeLatest(SEARCH_PROJECT_REQUEST, searchProject, context);
}

const requestConfirmInvitation = (messageInfo) => axios.patch('http://localhost:8080/message', 
    {
        id: messageInfo.id, 
        toUserId: messageInfo.toUserId, 
        projectId: messageInfo.projectId
    },
    {
        withCredentials: true
    }
)
    .then((res) => {
        return { res }
    })
    .catch((error) => {
        return { error }
    })

function* confirmInvitation(context, action) {

    const { res, error } = yield call(requestConfirmInvitation, action.messageInfo);
    if(res.status === 200) {
        yield put({ type: PROJECTLIST_GET_REQUEST });
    } else if(error) {
        yield put({ type: CONFIRM_INVITATION_FAILURE, error: '予期せぬエラーが発生しました。開発者に連絡してください' });   
    }
}

function* confirmInvitationSaga(context) {
    yield takeLatest(CONFIRM_INVITATION_REQUEST, confirmInvitation, context);
}

export const projectListSagas = [
    projectListSaga,
    searchProjectSaga,
    confirmInvitationSaga
];