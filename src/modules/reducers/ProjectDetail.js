import { GET_PROJECTDETAIL_REQUEST, GET_PROJECTDETAIL_SUCCESS, GET_PROJECTDETAIL_FAILURE } from '../actions/ProjectDetail'

const secondState = {
    processing: false,
    projects: [],
    error: '',
}

export function projectDetailReducer(state = secondState, action) {
    switch (action.type) {
        case GET_PROJECTDETAIL_REQUEST:
            return Object.assign({}, state, { processing: true })

        case GET_PROJECTDETAIL_SUCCESS:
            state.projects = action.projects
            return Object.assign({}, state, { processing: false, projectDetail: action.projectDetail});

        case GET_PROJECTDETAIL_FAILURE:
            return Object.assign({}, state, { processing: false, error: action.error })

        default:
         return Object.assign({}, state);
    }
}