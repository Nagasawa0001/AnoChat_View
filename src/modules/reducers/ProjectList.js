import { PROJECTLIST_GET_REQUEST, PROJECTLIST_GET_SUCCESS, PROJECTLIST_GET_FAILURE } from '../actions/ProjectList'

// Reducer
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
