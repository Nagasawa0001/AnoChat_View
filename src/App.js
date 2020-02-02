import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import TopicList from './components/templates/TopicList';
import Top from './components/templates/Top';
import TopicDetail from './components/templates/TopicDetail';

class App extends React.Component {
  render() {
    return (
    <BrowserRouter>
    <div>
      <Switch>
        <Route exact path={'/'} component={Top} />
        <Route exact path={'/topic'} component={TopicList}/>
        <Route exact path={'/topic/1'} component={TopicDetail}/>
      </Switch>
    </div>
    </BrowserRouter>
    )
  }
}
export default App;
