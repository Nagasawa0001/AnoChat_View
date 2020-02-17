import { CHECK_PROJECTMEMBER_REQUEST, CHECK_PROJECTMEMBER_EXIST, CHECK_PROJECTMEMBER_NOTEXIST, CHECK_PROJECTMEMBER_UNLOGIN } from '../actions/ProjectDetail'

const secondState = {
    processing: false,
    loggedIn: false,
    error: '',
}

export function checkProjectMemberReducer(state = secondState, action) {
    switch (action.type) {
        case CHECK_PROJECTMEMBER_REQUEST:
            return Object.assign({}, state, { loggedId: action.loggedId, projectIdList: action.userInfo.projectIdList, error: '' })

        case CHECK_PROJECTMEMBER_EXIST:
            state.projects = action.projects
            return Object.assign({}, state, { loggedId: action.loggedId, projectIdList: action.userInfo.projectIdList, error: '' });

        case CHECK_PROJECTMEMBER_NOTEXIST:
            return Object.assign({}, state, { loggedId: action.loggedId, projectIdList: action.userInfo.projectIdList, error: '' })

            case CHECK_PROJECTMEMBER_UNLOGIN:
                return Object.assign({}, state, { loggedId: action.loggedId, projectIdList: action.userInfo.projectIdList, error: '' })

        default:
         return Object.assign({}, state);
    }
}