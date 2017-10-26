import { baseURL } from '../urls'

export function get(url) {
  return fetch(baseURL + url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
      .then(resp => resp.json())
}

export function post(url, payload) {
  return fetch(baseURL + url, {
      method: 'post',
      body: payload,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
      .then(resp => resp.json())
}

export function destroy(url, id) {
  return fetch(baseURL + url + id, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
      .then(resp => resp.json())
}

export function edit(url, id, payload) {
  return fetch(baseURL + url + id, {
      method: 'PATCH',
      body: payload,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
      .then(resp => resp.json())
}

export default {
  //Users
  getUsers() {
    return get('/users')
  },
  createUser(user) {
    const payload = JSON.stringify({first_name: user.firstName, last_name: user.lastName, email: user.email})
    return post('/users', payload)
  },
  editUser(user, id) {
    const payload = JSON.stringify({first_name: user.firstName, last_name: user.lastName, email: user.email})
    return edit('/users/', id, payload)
  },
  deleteUser(id) {
    return destroy('/users/', id)
  },
  logInUser(emailPassword) {
    const payload = JSON.stringify({email: emailPassword.email, password: emailPassword.password})
    return post('/login', payload)
  },
  //Scores
  createScore(key, score, employeeId) {
    const payload = JSON.stringify({eval_item_id: key, score: score['score'], note: score['note'], user_id: employeeId})
    return post('/scores', payload)
  },
  //Action Steps
  createActionStep(actionStep, employeeId) {
    const payload = JSON.stringify({ user_id: employeeId, description: actionStep})
    return post('/action_steps', payload)
  },
  editActionStep(newStatus, id) {
    let payload = JSON.stringify( { completed: newStatus } )
    return edit('/action_steps/', id, payload)
  },
  //Eval Items (Values)
  getEvalItems() {
    return get('/eval_items')
  },
  createEvalItem(evalItem) {
    const payload = JSON.stringify({name: evalItem.name, description: evalItem.description, evaluation_category_id: evalItem.evaluationCategoryId})
    return post('/eval_items', payload)
  },
  editEvalItem(evalItem, id) {
    const payload = JSON.stringify({name: evalItem.name, description: evalItem.description, evaluation_category_id: evalItem.evaluationCategoryId})
    return edit('/eval_items/', id, payload)
  },
  deleteEvalItem(id) {
    return destroy('/eval_items/', id)
  },
  //Evaluation Categories (Teams)
  getAllEvaluationCategories() {
    return get('/evaluation_categories')
  },
  createEvaluationCategory(name) {
    const payload = JSON.stringify({name: name})
    return post('/evaluation_categories', payload)
  },
  editEvalCategory(name, id) {
    const payload = JSON.stringify({name: name})
    return edit('/evaluation_categories/', id, payload)
  },
  //Possible Points
  createPossiblePoint(possiblePoint, categoryId) {
    let payload = JSON.stringify({score: possiblePoint['score'], description: possiblePoint['description'], evaluation_category_id: categoryId})
    return post('/possible_points', payload)
  },
  editCurrentPoint(currentPoint) {
    let payload = JSON.stringify({score: currentPoint['score'], description: currentPoint['description'], evaluation_category_id: currentPoint['evaluation_category_id']})
    return edit('/possible_points/', currentPoint.id, payload)
  }
}