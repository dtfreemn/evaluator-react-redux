import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import UsersContainer from './components/UsersContainer'
import NewUserForm from './components/NewUserForm'
import NewEvalItemForm from './components/NewEvalItemForm'
import EvalItemsContainer from './components/EvalItemsContainer'
import NewScoreFormContainer from './components/NewScoreFormContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Route exact path='/users/new' component={NewUserForm} />
        <Route exact path='/users' component={UsersContainer} />
        <Route path='/users/:id' component={UsersContainer} />
        <Route exact path='/eval_items/new' component={NewEvalItemForm} />
        <Route path='/eval_items' component={EvalItemsContainer} />
        <Route path='/scores/new' component={NewScoreFormContainer} />
      </div>
    );
  }
}

export default App;
