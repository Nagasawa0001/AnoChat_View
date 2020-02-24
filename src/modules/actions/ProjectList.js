//プロジェクト一覧取得アクション
export const PROJECTLIST_GET_REQUEST = 'PROJECTLIST_GET_REQUEST';
export const PROJECTLIST_GET_SUCCESS = 'PROJECTLIST_GET_SUCCESS';
export const PROJECTLIST_GET_FAILURE = 'PROJECTLIST_GET_FAILURE';

// Action Creator
export default function getProjectListAction(path) {
    return {
        type: PROJECTLIST_GET_REQUEST,
        path
    }
}