import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'
import UsersContainer from './components/UsersContainer'
import NewUserForm from './components/NewUserForm'
import NewEvalItemForm from './components/NewEvalItemForm'
import EvalItemsContainer from './components/EvalItemsContainer'
import NewScoreFormContainer from './components/NewScoreFormContainer'
import MenuLeft from './components/MenuLeft'
import ErrorPage from './components/ErrorPage'
import LogInForm from './components/LogInForm'
import Authorize from './components/Authorize'

class App extends Component {
  render() {
    
    const AuthLogInForm = Authorize(LogInForm)
    const AuthNewUserForm = Authorize(NewUserForm)
    const AuthUsersContainer = Authorize(UsersContainer)
    const AuthNewEvalItemForm = Authorize(NewEvalItemForm)
    const AuthEvalItemsContainer = Authorize(EvalItemsContainer)
    const AuthNewScoreFormContainer = Authorize(NewScoreFormContainer)

    return (
      <div className="App base-grey-background">
        <Route path='/' render={(props) => <NavBar {...props}/>}/>
        <Route path='/' render={(props) => <MenuLeft {...props}/>}/>
        <Route exact path='/login' render={(props) => <AuthLogInForm {...props}/>} />
        <Route path='/users/new' component={AuthNewUserForm} />
        <Route exact path='/users' component={AuthUsersContainer} />
        <Route path='/users/:id' component={AuthUsersContainer} />
        <Route exact path='/eval_items/new' component={AuthNewEvalItemForm} />
        <Route path ='/eval_items' component={AuthEvalItemsContainer} />
        <Route exact path='/scores/new' component={AuthNewScoreFormContainer} />
      </div>
    );
  }
}

export default App;
