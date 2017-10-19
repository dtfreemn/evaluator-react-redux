export function isLoading() {
  return {
    type: 'TOGGLE_LOADING'
  }
}

export function isError() {
  return {
    type: 'ERROR'
  }
}

export function cancelError() {
  return {
    type: 'CANCEL_ERROR'
  }
}