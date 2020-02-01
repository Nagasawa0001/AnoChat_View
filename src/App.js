import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import TopicList from './components/templates/TopicList';
import Top from './components/templates/Top';

class App extends React.Component {
  render() {
    return (
    <BrowserRouter>
    <div>
      <Switch>
        <Route exact path={'/'} component={Top} />
        <Route exacti path={'/topic'} component={TopicList}/>
      </Switch>
    </div>
    </BrowserRouter>
    )
  }
}
export default App;
