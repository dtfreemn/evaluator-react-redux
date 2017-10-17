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
        <Route path='/users' render={(props) => {
            if (props.location.pathname === '/users' || props.location.pathname.includes('edit')) {
                console.log(props.location.pathname.split('/'))
                return <AuthUsersContainer {...props}/>
            } else if (props.location.pathname.includes('new')) {
                return (<div><AuthNewUserForm {...props}/><AuthUsersContainer {...props}/></div>)
            } else if (!isNaN(parseInt(props.location.pathname.split('/').pop()))) {
                return <AuthUsersContainer {...props}/>
            } else {
                return <ErrorPage {...props}/>
            }
        }} />
        <Route exact path='/eval_items/new' component={AuthNewEvalItemForm} />
        <Route path ='/eval_items' component={AuthEvalItemsContainer} />
        <Route exact path='/scores/new' component={AuthNewScoreFormContainer} />
        <Route path='*' component={ErrorPage} />
      </div>
    );
  }
}

export default App;
