import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { projectListSagas } from './modules/middlewares/ProjectList';
import { projectDetailSagas } from './modules/middlewares/ProjectDetail';
import rootReducers from './modules/reducers/allReducers';
import { createStore, applyMiddleware } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga'
import { Router, Switch, Route } from 'react-router-dom';
import ProjectList from './components/templates/ProjectList';
import Top from './components/templates/Top';
import ProjectDetail from './components/templates/ProjectDetail';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';

const allSagas = [...projectListSagas, ...projectDetailSagas];

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
