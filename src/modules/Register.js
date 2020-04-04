// プロジェクト詳細 + 親タスク詳細取得 ////////////////////////////////////////////////////////////////////////////////////////////
import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import '../setting.js';

// 【Action】/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';

export const CREATE_PROJECT_REQUEST = 'CREATE_PROJECT_REQUEST';
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
export const CREATE_PROJECT_FAILURE = 'CREATE_PROJECT_FAILURE';


export function createTaskAction(form) {
    return {
        type: CREATE_TASK_REQUEST,
        form: form,
    }
}

export function createProjectTaskAction(form) {
    return {
        type: CREATE_PROJECT_REQUEST,
        form: form
    }
}

// 【Reducer】///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const secondState = {
    processing: false,
    error: '',
    childTask: {},
    taskCommnetList: [],
}

export function registerReducer(state = secondState, action) {
    switch (action.type) {
        case CREATE_TASK_REQUEST:
            return Object.assign({}, state, { processing: true })

        case CREATE_TASK_SUCCESS:
            state.projects = action.projects
            return Object.assign({}, state, { processing: false });

        case CREATE_TASK_FAILURE:
            return Object.assign({}, state, { processing: false, error: action.error })

        case CREATE_PROJECT_REQUEST:
            return Object.assign({}, state, { processing: true })

        case CREATE_PROJECT_SUCCESS:
            state.projects = action.projects
            return Object.assign({}, state, { processing: false });

        case CREATE_PROJECT_FAILURE:
            return Object.assign({}, state, { processing: false, error: action.error })

        default:
         return Object.assign({}, state);
    }
}

// 【Middleware】////////////////////////////////////////////////////////////////////////////////////////////////////////////
const requestCreateParentTask = (form) => axios.post('http://localhost:8080/task/parent',
    {
        projectId: form.projectId,
        title: form.title,
        content: form.content,
        creatorId: form.creatorId
    },
    {
        withCredentials: true
    })
.then((res) => {
    const result = res.data;
    return { result }
})
.catch((error) => {
    return { error }
})

const requestCreateChildTask = (form) => axios.post('http://localhost:8080/task/child',
    {
        parentTaskId: form.parentTaskId,
        title: form.title,
        content: form.content,
        creatorId: form.creatorId
    },
    {
        withCredentials: true
    })
.then((res) => {
    const result = res.data;
    return { result }
})
.catch((error) => {
    return { error }
})

function* createTask(context, action){
   if(action.form.taskType === 'Parent') {
        const { result, error } = yield call(requestCreateParentTask, action.childTaskId);
        if(result.status === 200) {
            yield call(context.history.push, '/projects')
        } else {
            console.log('予期せぬエラーが発生しました　エラー：　' + error);
            yield put({type: CREATE_TASK_FAILURE, error})
        }
   } else if(action.form.taskType === 'Child') {
        const { result, error } = yield call(requestCreateChildTask, action.childTaskId);
        if(result.status === 200) {
            yield call(context.history.push, '/projects')
        } else {
            console.log('予期せぬエラーが発生しました　エラー：　' + error);
            yield put({type: CREATE_TASK_FAILURE, error})
        }
   }
}

function* createTaskSaga(context) {
    yield takeLatest(CREATE_TASK_REQUEST, createTask, context)
}

const requestCreateProject = (form) => axios.post('http://localhost:8080/project',
    {
        title: form.title,
        discription: form.discription,
        administratorId: form.administratorId
    },
    {
        withCredentials: true
    })
.then((res) => {
    const result = res.data;
    return { result }
})
.catch((error) => {
    return { error }
})

function* createProjectTask(context, action){
   const { result, error } = yield call(requestCreateProject, action.childTaskId);
console.log(result);
   if(result.status === 200) {
       yield call(context.history.push, '/projects')
   } else {
       console.log('予期せぬエラーが発生しました　エラー：　' + error);
       yield put({type: CREATE_PROJECT_FAILURE, error})
   }
}

function* createProjectTaskSaga(context) {
    yield takeLatest(CREATE_PROJECT_REQUEST, createProjectTask, context)
}

export const registerSagas = [
    createTaskSaga,
    createProjectTaskSaga
];