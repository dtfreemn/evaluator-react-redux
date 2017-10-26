import { isError, cancelError } from './loadingAndErrors'
import api from '../api'


export function fetchAllUsers() {
  return function(dispatch) {
    api.getUsers()
      .then(users => dispatch(setAllUsers(users)) )
  }
}

export function createUser(user, props) {
  return function(dispatch) {
    api.createUser(user)
      .then(users => dispatch(setAllUsers(users)))
      .then( () =>  props.history.push('/users') )
  }
}

export function editUser(user, id, props) {
  return function(dispatch) {
    api.editUser(user, id)
      .then(users => dispatch(setAllUsers(users)))
      .then(() => props.history.push('/users/' + props.id + '/s') )
  }
}

export function deleteUser(user, props) {
  return function(dispatch) {
    api.deleteUser(user.id)
      .then(users => dispatch(setAllUsers(users)))
      .then(() => props.history.push('/users'))
  }
}

export function logInToApi(emailPassword, props) {
  return function(dispatch) {
    api.logInUser(emailPassword)
      .then(loggedInUserInfo => {
        if (loggedInUserInfo.admin) {
          localStorage.setItem('jwt', loggedInUserInfo.jwt)
          localStorage.setItem('org', loggedInUserInfo.admin.organization_id)
          const payload = Object.assign({}, {jwt: loggedInUserInfo.jwt, org_id: loggedInUserInfo.admin.organization_id, evaluation_categories: loggedInUserInfo.admin.organization.evaluation_categories})
          dispatch(setLoggedInUserAndOrg(payload))
          dispatch(cancelError())
          props.history.push('/users')
      } else if (loggedInUserInfo.error) {
        dispatch(isError())
      }
      })
  }
}

export function setAllUsers(payload) {
  return {
    type: 'SET_ALL_USERS',
    payload
  }
}

export function setLoggedInUserAndOrg(payload) {
  return {
    type: 'SET_LOGGED_IN_USER_AND_ORG_AND_EVAL_CATS',
    payload
  }
}

export function clearCurrentUserAndOrg() {
  return {
    type: 'CLEAR_CURRENT_USER_AND_ORG'
  }
}