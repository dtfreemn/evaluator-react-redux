import { baseURL } from '../urls'

export function fetchAllUsers() {
  return function(dispatch) {
    fetch(baseURL + '/users')
      .then(resp => resp.json())
      .then(users => dispatch(setAllUsers(users)))
  }
}

export function createUser(user) {
  return function(dispatch) {
    const payload = JSON.stringify({first_name: user.firstName, last_name: user.lastName, email: user.email})
    fetch(baseURL + '/users', {
      method: 'post',
      body: payload,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(users => dispatch(setAllUsers(users)))
  }
}

export function deleteUser(user) {
  return function(dispatch) {
    fetch(baseURL + '/users/' + user.id, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(users => dispatch(setAllUsers(users)))
  }
}

export function setAllUsers(payload) {
  return {
    type: 'SET_ALL_USERS',
    payload
  }
}