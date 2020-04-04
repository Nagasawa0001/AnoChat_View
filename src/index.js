import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga'
import { Router, Switch, Route } from 'react-router-dom';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';

import { projectListSagas } from './modules/ProjectList';
import { projectDetailSagas } from './modules/ProjectDetail';
import { signupTempSagas } from './modules/SignupTemp';
import { signupSagas } from './modules/Signup';
import { signinSagas } from './modules/Signin';
import { parentTaskSagas } from './modules/ParentTaskDetail';
import { childTaskSagas } from './modules/ChildTaskDetail';
import { registerSagas } from './modules/Register';
import rootReducers from './modules/allReducers';

import ProjectList from './components/templates/ProjectList';
import Top from './components/templates/Top';
import SignupTemp from './components/templates/SignupTemp';
import Signin from './components/templates/Signin';
import Signup from './components/templates/Signup';
import InputEmail from './components/templates/InputEmail';
import ProjectDetail from './components/templates/ProjectDetail';
import InputPassword from './components/templates/InputPassword';
import ParentTaskDetail from './components/templates/ParentTaskDetail';
import ChildTaskDetail from './components/templates/ChildTaskDetail';
import TaskRegister from './components/templates/TaskRegister';
import ProjectRegister from './components/templates/ProjectRegister';

const allSagas = [
    ...projectListSagas, 
    ...projectDetailSagas, 
    ...signupTempSagas, 
    ...signupSagas, 
    ...signinSagas,
    ...parentTaskSagas,
    ...childTaskSagas,
    ...registerSagas,
];

function* rootSaga(context) {
    yield all(allSagas.map(f => f(context)));
}
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducers, applyMiddleware(sagaMiddleware, createLogger()));

const history = createHistory();

sagaMiddleware.run(rootSaga, { history });

class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Provider store={store}>
                    <Switch>
                        <Route exact path={'/'} component={Top} />
                        <Route exact path={'/signup'} component={SignupTemp} />
                        <Route exact path={'/signup/auth'} component={Signup} />
                        <Route exact path={'/signin'} component={Signin} />
                        <Route exact path={'/reset/email'} component={InputEmail} />
                        <Route exact path={'/reset/password'} component={InputPassword} />
                        <Route exact path={'/projects'} component={ProjectList} />
                        <Route exact path={'/project/:id'} component={ProjectDetail} />
                        <Route exact path={'/task/parent/:id'} component={ParentTaskDetail} />
                        <Route exact path={'/task/child/:id'} component={ChildTaskDetail} />
                        <Route exact path={'/create/task'} component={TaskRegister} />
                        <Route exact path={'/create/project'} component={ProjectRegister} />
                    </Switch>
                </Provider>
    </Router>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
