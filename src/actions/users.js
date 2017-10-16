import { baseURL } from '../urls'

export function fetchAllUsers() {
  return function(dispatch) {
    fetch(baseURL + '/users', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
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
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
      .then(resp => resp.json())
      .then(users => dispatch(setAllUsers(users)))
  }
}

export function editUser(user, id, props) {
  return function(dispatch) {
    const payload = JSON.stringify({first_name: user.firstName, last_name: user.lastName, email: user.email})
    fetch(baseURL + '/users/' + id, {
      method: 'PATCH',
      body: payload,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
      .then(resp => resp.json())
      .then(users => dispatch(setAllUsers(users)))
      .then(() => {
        props.history.push(props.match.url)
      })
}
}

export function deleteUser(user) {
  return function(dispatch) {
    fetch(baseURL + '/users/' + user.id, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt')
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

export function logInToApi(emailPassword, props) {
  return function(dispatch) {
    const payload = JSON.stringify({email: emailPassword.email, password: emailPassword.password})
    fetch(baseURL + '/login', {
      method: 'post',
      body: payload,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(loggedInUserInfo => {
        if (loggedInUserInfo.admin) {
          localStorage.setItem('jwt', loggedInUserInfo.jwt)
          localStorage.setItem('org', loggedInUserInfo.admin.organization_id)
          const payload = Object.assign({}, {jwt: loggedInUserInfo.jwt, org_id: loggedInUserInfo.admin.organization_id})
          dispatch(setLoggedInUserAndOrg(payload))
          props.history.push('/users')
      } else if (loggedInUserInfo.error) {
        // props.history.push('/login')
        //CREATE ACTION TO DISPATCH AN ERROR TO STATE THEN CHECK IN LOGIN FORM IF THERE'S AN ERROR
      }
      })
  }
}

export function setLoggedInUserAndOrg(payload) {
  return {
    type: 'SET_LOGGED_IN_USER_AND_ORG',
    payload
  }
}

export function clearCurrentUserAndOrg() {
  return {
    type: 'CLEAR_CURRENT_USER_AND_ORG'
  }
}