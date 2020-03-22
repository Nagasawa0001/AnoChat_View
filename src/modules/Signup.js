// 一時ユーザー登録 ////////////////////////////////////////////////////////////////////////////////////////////////////////////
import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import '../setting.js';

// 【Action】 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export function signupAction(form) {
    return {
        type: SIGNUP_REQUEST,
        form: form
    }
}

// 【Reducer】 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
const initialState = {
    processing: false, //APIレスポンスの有無
    error: '',// 取得失敗時のエラーメッセージ
}
export function signupReducer(state = initialState, action) {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return Object.assign({}, state, { processing: true })

        case SIGNUP_SUCCESS:
            return Object.assign({}, state, { processing: false });

        case SIGNUP_FAILURE:
            return Object.assign({}, state, { processing: false, error: action.error })

        default:
         return Object.assign({}, state);
    }
}

// 【Middleware】////////////////////////////////////////////////////////////////////////////////////////////////////////////
const requestSignup = (form) => axios.post('http://localhost:8080/users/validate/' + form.signupToken)
    .then((res) => {
        console.log(res);
        const result = res.data;
        return { result }
    })
    .catch((error) => {
        console.log('error : ' + error);
        return { error }
    })

function* signup(context, action) {
    console.log(action);
    const { result, error } = yield call(requestSignup, action.form);
    console.log('result: ' + result);
    if(result) {
        yield put ({ type: SIGNUP_SUCCESS});
        yield call (context.history.push('/signin'));
    } else if(error) {
        yield put ({ type: SIGNUP_FAILURE, error: '予期せぬエラーが発生しました。開発者に連絡してください'})
    } else {
        yield put ({ type: SIGNUP_FAILURE, error: '認証に失敗しました'})
    }
}

function* signupSaga(context) {
    yield takeLatest(SIGNUP_REQUEST, signup, context);
}

export const signupSagas = [
    signupSaga,
];
