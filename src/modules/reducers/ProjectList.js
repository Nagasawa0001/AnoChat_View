import { PROJECTLIST_GET_REQUEST, PROJECTLIST_GET_SUCCESS, PROJECTLIST_GET_FAILURE } from '../actions/ProjectList'

// Reducer
const initialState = {
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
