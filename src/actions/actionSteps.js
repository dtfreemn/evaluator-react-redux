import api from '../api'

export function editActionStep(id, newStatus) {
    return function (dispatch) {
      api.editActionStep(newStatus, id)
    }
}