// 一時ユーザー登録 ////////////////////////////////////////////////////////////////////////////////////////////////////////////
import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import '../setting.js';

// 【Action】 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';

export function signinAction(form) {
    return {
        type: SIGNIN_REQUEST,
        form: form
    }
}

// 【Reducer】 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
const initialState = {
    processing: false, //APIレスポンスの有無
    error: '',// 取得失敗時のエラーメッセージ
    userInfo: {
        loggedIn: false,
        _csrf: '',
        admin: false,
        session: {
            token: '',
            expireDate: '',
        }
    }
}
export function signinReducer(state = initialState, action) {
    switch (action.type) {
        case SIGNIN_REQUEST:
            return Object.assign({}, state, { processing: true })

        case SIGNIN_SUCCESS:
            return Object.assign({}, state, { processing: false, userInfo: { loggedIn: true }});

        case SIGNIN_FAILURE:
            return Object.assign({}, state, { processing: false, error: action.error })

        default:
         return Object.assign({}, state);
    }
}

// 【Middleware】////////////////////////////////////////////////////////////////////////////////////////////////////////////
const requestSignup = (form) => axios.post('http://localhost:8080/signin', form)
    .then((res) => {
        console.log(res);
        const result = res.data;
        return { result }
    })
    .catch((error) => {
        console.log('error : ' + error);
        return { error }
    })

function* signin(context, action) {
    console.log(action);
    var form = new URLSearchParams();
    form.append('email', action.form.email);
    form.append('password', action.form.password);
    const { result, error } = yield call(requestSignup, form);
    console.log(result);
    if(result) {
        yield put ({ type: SIGNIN_SUCCESS});
        yield call (context.history.push('/projects'));
    } else if(error) {
        yield put ({ type: SIGNIN_FAILURE, error: '予期せぬエラーが発生しました。開発者に連絡してください'})
    } else {
        yield put ({ type: SIGNIN_FAILURE, error: 'ログインに失敗しました'})
    }
}

function* signinSaga(context) {
    yield takeLatest(SIGNIN_REQUEST, signin, context);
}

export const signinSagas = [
    signinSaga,
];
