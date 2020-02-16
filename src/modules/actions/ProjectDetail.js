// プロジェクト詳細取得アクション（詳細画面 or 管理画面分岐判定）
export const CHECK_PROJECTMEMBER_REQUEST = 'CHECK_PROJECTMEMBER_REQUEST';
export const CHECK_PROJECTMEMBER_EXIST = 'CHECK_PROJECTMEMBER_EXIST';
export const CHECK_PROJECTMEMBER_NOTEXIST = 'CHECK_PROJECTMEMBER_NOTEXIST';
export const CHECK_PROJECTMEMBER_UNLOGIN = 'CHECK_PROJECTMEMBER_UNLOGIN';

export default function checkProjectMemberAction(projectId, userInfoList) {
    return {
        type: CHECK_PROJECTMEMBER_REQUEST,
        projectId: projectId,
        loggedIn: userInfoList.loggedIn,
        userInfoList: {
            id: userInfoList.id,
            name: userInfoList.name,
            email: userInfoList.email
        }
    }
}