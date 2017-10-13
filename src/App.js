import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import UsersContainer from './components/UsersContainer'
import NewUserForm from './components/NewUserForm'
import NewEvalItemForm from './components/NewEvalItemForm'
import EvalItemsContainer from './components/EvalItemsContainer'
import NewScoreFormContainer from './components/NewScoreFormContainer'
import ErrorPage from './components/ErrorPage'
import LogInForm from './components/LogInForm'

class App extends Component {
  render() {
    return (
      <div className="App base-grey-background">
        <NavBar />
        <Route path='/login' component={LogInForm} />
        <Route path='/logout' render={(props) => {
          localStorage.clear()
          return (
            <LogInForm props={props}/>
          )
        }} />
        <Route exact path='/users/new' component={NewUserForm} />
        <Route exact path='/users/new' component={NewUserForm} />
        <Route exact path='/users' component={UsersContainer} />
        <Route exact path='/users/:id' component={UsersContainer} />
        <Route exact path='/eval_items/new' component={NewEvalItemForm} />
        <Route path='/eval_items' component={EvalItemsContainer} />
        <Route exact path='/scores/new' component={NewScoreFormContainer} />
        <Route path='/404' component={ErrorPage} />
      </div>
    );
  }
}

export default App;
