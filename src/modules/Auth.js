// 一時ユーザー登録 ////////////////////////////////////////////////////////////////////////////////////////////////////////////
import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import '../setting.js';

// 【Action】 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export function logoutAction() {
    return {
        type: LOGOUT_REQUEST
    }
}

// 【Reducer】 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
const initialState = {
    processing: false, //APIレスポンスの有無
    error: '',// 取得失敗時のエラーメッセージ
    loggedIn: false,
    profile: {}
}
export function logoutReducer(state = initialState, action) {
    switch (action.type) {
        case LOGOUT_REQUEST:
            return Object.assign({}, state, { processing: true, loggedIn: true })

        case LOGOUT_SUCCESS:
            return Object.assign({}, state, { processing: false, loggedIn: false });

        case LOGOUT_FAILURE:
            return Object.assign({}, state, { processing: false, loggedIn: true, error: action.error })

        default:
         return Object.assign({}, state);
    }
}

// 【Middleware】////////////////////////////////////////////////////////////////////////////////////////////////////////////
const requestLogout = (form) => axios.post('http://localhost:8080/logout',
    {
        withCredentials: true
    })
    .then((res) => {
        const result = res;
        return { result }
    })
    .catch((error) => {
        return { error }
    })

function* logout(context, action) {
    const { result, error } = yield call(requestLogout);
    if(result.status === 200) {
        yield put ({ type: LOGOUT_SUCCESS });
        document.cookie = "JSESSIONID=; expires=0";
        yield call (context.history.push, '/signin');
    } else if(error) {
        yield put ({ type: LOGOUT_FAILURE, error: '予期せぬエラーが発生しました。開発者に連絡してください'})
    }
}

function* logoutSaga(context) {
    yield takeLatest(LOGOUT_REQUEST, logout, context);
}

// 【Action】 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const CREATE_TOKEN_USER_REQUEST = 'CREATE_TOKEN_USER_REQUEST';
export const CREATE_TOKEN_USER_SUCCESS = 'CREATE_TOKEN_USER_SUCCESS';
export const CREATE_TOKEN_USER_FAILURE = 'CREATE_TOKEN_USER_FAILURE';

export function createTokenUserAction(userId, email) {
    return {
        type: CREATE_TOKEN_USER_REQUEST,
        form: {
            userId: userId,
            email: email
        }
    }
}

// 【Reducer】 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const initialState = {
//     processing: false, //APIレスポンスの有無
//     error: '',// 取得失敗時のエラーメッセージ
//     loggedIn: false,
//     profile: {}
// }
export function createTokenUserReducer(state, action) {
    switch (action.type) {
        case CREATE_TOKEN_USER_REQUEST:
            return Object.assign({}, state, { processing: true, loggedIn: true })

        case CREATE_TOKEN_USER_SUCCESS:
            return Object.assign({}, state, { processing: false, loggedIn: false });

        case CREATE_TOKEN_USER_FAILURE:
            return Object.assign({}, state, { processing: false, loggedIn: true, error: action.error })

        default:
         return Object.assign({}, state);
    }
}

// 【Middleware】////////////////////////////////////////////////////////////////////////////////////////////////////////////
const requestCreateTokenUser = (form) => axios.post('http://localhost:8080/edit/mail',
    {
        id: form.userId,
        email: form.email
    },
    {
        withCredentials: true
    })
    .then((res) => {
        const result = res;
        return { result }
    })
    .catch((error) => {
        return { error }
    })

function* createTokenUser(context, action) {
    const { result, error } = yield call(requestCreateTokenUser, action.form);
    if(result.data) {
        yield put ({ type: CREATE_TOKEN_USER_SUCCESS });
    } else if(error) {
        yield put ({ type: CREATE_TOKEN_USER_FAILURE, error: '予期せぬエラーが発生しました。開発者に連絡してください'})
    }
}

function* createTokenUserSaga(context) {
    yield takeLatest(CREATE_TOKEN_USER_REQUEST, createTokenUser, context);
}

// 【Action】 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const CREATE_TOKEN_PASSWORD_REQUEST = 'CREATE_TOKEN_PASSWORD_REQUEST';
export const CREATE_TOKEN_PASSWORD_SUCCESS = 'CREATE_TOKEN_PASSWORD_SUCCESS';
export const CREATE_TOKEN_PASSWORD_FAILURE = 'CREATE_TOKEN_PASSWORD_FAILURE';

export function createTokenPasswordAction(userId, email) {
    return {
        type: CREATE_TOKEN_PASSWORD_REQUEST,
        form: {
            userId: userId,
            email: email
        }
    }
}

// 【Reducer】 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const initialState = {
//     processing: false, //APIレスポンスの有無
//     error: '',// 取得失敗時のエラーメッセージ
//     loggedIn: false,
//     profile: {}
// }
export function createTokenPasswordReducer(state, action) {
    switch (action.type) {
        case CREATE_TOKEN_PASSWORD_REQUEST:
            return Object.assign({}, state, { processing: true, loggedIn: true })

        case CREATE_TOKEN_PASSWORD_SUCCESS:
            return Object.assign({}, state, { processing: false, loggedIn: false });

        case CREATE_TOKEN_PASSWORD_FAILURE:
            return Object.assign({}, state, { processing: false, loggedIn: true, error: action.error })

        default:
         return Object.assign({}, state);
    }
}

// 【Middleware】////////////////////////////////////////////////////////////////////////////////////////////////////////////
const requestCreateTokenPassword = (form) => axios.post('http://localhost:8080/reset/mail',
    {
        id: form.userId,
        email: form.email
    },
    {
        withCredentials: true
    })
    .then((res) => {
        const result = res;
        return { result }
    })
    .catch((error) => {
        return { error }
    })

function* createTokenPassword(context, action) {
    const { result, error } = yield call(requestCreateTokenPassword, action.form);
    if(result.data) {
        yield put ({ type: CREATE_TOKEN_PASSWORD_SUCCESS });
    } else if(error) {
        yield put ({ type: CREATE_TOKEN_PASSWORD_FAILURE, error: '予期せぬエラーが発生しました。開発者に連絡してください'})
    }
}

function* createTokenPasswordSaga(context) {
    yield takeLatest(CREATE_TOKEN_PASSWORD_REQUEST, createTokenPassword, context);
}

export const logoutSagas = [
    logoutSaga,
    createTokenUserSaga,
    createTokenPasswordSaga
];
