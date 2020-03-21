import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { projectListSagas } from './modules/ProjectList';
import { projectDetailSagas } from './modules/ProjectDetail';
import { signupSagas } from './modules/SignupTemp';
import rootReducers from './modules/allReducers';
import { createStore, applyMiddleware } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga'
import { Router, Switch, Route } from 'react-router-dom';
import ProjectList from './components/templates/ProjectList';
import Top from './components/templates/Top';
import SignupTemp from './components/templates/SignupTemp';
import Signin from './components/templates/Signin';
import Signup from './components/templates/Signup';
import InputEmail from './components/templates/InputEmail';
import ProjectDetail from './components/templates/ProjectDetail';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import InputPassword from './components/templates/InputPassword';

const allSagas = [...projectListSagas, ...projectDetailSagas, ...signupSagas];

function* rootSaga(context) {
    yield all(allSagas.map(f => f(context)));
}
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducers, applyMiddleware(sagaMiddleware, createLogger()));
console.log(store.getState());

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
                        <Route exact path={'/project'} component={ProjectList} />
                        <Route exact path={'/project/:id'} component={ProjectDetail} />
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
