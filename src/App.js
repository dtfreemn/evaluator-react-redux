import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'
import UsersContainer from './components/UsersContainer'
import NewUserForm from './components/NewUserForm'
import NewEvalItemForm from './components/NewEvalItemForm'
import EvalItemsContainer from './components/EvalItemsContainer'
import NewScoreFormContainer from './components/NewScoreFormContainer'
import NewEvalCategoryForm from './components/NewEvalCategoryForm'
import EvalCategoriesContainer from './components/EvalCategoriesContainer'
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
    const AuthNewEvalCategoryForm = Authorize(NewEvalCategoryForm)
    const AuthEvalCategoriesContainer = Authorize(EvalCategoriesContainer)


    return (
      <div className='App'>
        <Route path='/' render={(props) => <NavBar {...props}/>}/>
        <Route path='/' render={(props) => <MenuLeft {...props}/>}/>
        <Switch>
            <Route exact path='/login' render={(props) => <AuthLogInForm {...props}/>} />
            <Route exact path='/users/new' render={(props) => <div className='container'><AuthNewUserForm {...props}/><AuthUsersContainer {...props}/></div>} />
            <Route exact path='/users' render={(props) => <div className='container'><AuthUsersContainer {...props}/></div>} />
            <Route exact path='/users/:id/s' render={(props) => <div className='container'><AuthUsersContainer {...props}/></div>} />
            <Route exact path='/users/:id/edit' render={(props) => <div className='container'><AuthUsersContainer {...props}/></div>} />
            <Route exact path='/eval_items/new' render={(props) => <div className='container'><AuthNewEvalItemForm {...props}/><AuthEvalItemsContainer {...props}/></div>} />
            <Route exact path ='/eval_items' render={(props) => <div className='container'><AuthEvalItemsContainer {...props}/></div>} />
            <Route exact path='/eval_items/:id/edit' render={(props) => <div className='container'><AuthEvalItemsContainer {...props}/></div>} />
            <Route exact path='/eval_categories/:id/edit' render={(props) => <div className='container'><AuthEvalCategoriesContainer {...props}/></div>} />
            <Route exact path='/eval_categories/new' render={(props) => <div className='container'><AuthNewEvalCategoryForm {...props}/></div>} />
            <Route exact path='/eval_categories' render={(props) => <div className='container'><AuthEvalCategoriesContainer {...props}/></div>} />
            <Route exact path='/scores/new' render={(props) => <div className='container'><AuthNewScoreFormContainer {...props}/></div>} />
            <Route path='*' component={ErrorPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
