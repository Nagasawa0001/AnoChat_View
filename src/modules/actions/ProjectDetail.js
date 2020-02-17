// プロジェクト詳細取得アクション（詳細画面 or 管理画面分岐判定）
export const GET_PROJECTDETAIL_REQUEST = 'GET_PROJECTDETAIL_REQUEST';
export const GET_PROJECTDETAIL_SUCCESS = 'GET_PROJECTDETAIL_SUCCESS';
export const GET_PROJECTDETAIL_FAILURE = 'GET_PROJECTDETAIL_FAILURE';

export default function getProjectDetailAction(projectId) {
    return {
        type: GET_PROJECTDETAIL_REQUEST,
        projectId: projectId,
    }
}