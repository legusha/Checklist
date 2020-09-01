import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import Main from './views/Main';
import Note from './views/Note';

class App extends Component {

  render() {
    return (
      <div className="App, mt-4">
        <Switch>
          <Route path="/" component={Main} exact />
          <Route path="/note" component={Note} exact />
          <Redirect to={'/'}/>
        </Switch>
      </div>
    )
  }
}

export default App;
