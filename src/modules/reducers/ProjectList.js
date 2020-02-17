import { PROJECTLIST_GET_REQUEST, PROJECTLIST_GET_SUCCESS, PROJECTLIST_GET_FAILURE } from '../actions/ProjectList'

// Reducer
const initialState = {
    prosessing: false, //APIレスポンスの有無
    infoList: {
        projectList: [], //取得したトピック一覧
        languageList: [],
        categorieList: []
    },
    meta: '', // データ取得後の遷移先path
    error: '',// 取得失敗時のエラーメッセージ
}

export function projectListReducer(state = initialState, action) {
    switch (action.type) {
        case PROJECTLIST_GET_REQUEST:
            return Object.assign({}, state, { processing: true })

        case PROJECTLIST_GET_SUCCESS:
            state.projects = action.projects
            return Object.assign({}, state, { prosessing: false, infoList: { projectList: action.infoList.projectList, languageList: action.infoList.languageList, categoryList: action.infoList.categoryList }, meta: action.meta, error: '' });

        case PROJECTLIST_GET_FAILURE:
            return Object.assign({}, state, { prosessing: false, projects: state.projects, meta: action.meta, error: action.error })

        default:
         return Object.assign({}, state);
    }
}
