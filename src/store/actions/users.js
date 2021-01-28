import { FETCH_USERS_BEGIN, FETCH_USERS_ERROR, FETCH_USERS_SUCCESS } from '../constants'
import { serializeObjectParams } from '../../helpers'

export const fetchBegin = () => ({
  type: FETCH_USERS_BEGIN,
})

export const fetchError = error => ({
  type: FETCH_USERS_ERROR,
  payload: {
    error,
  },
})

export const fetchSuccess = data => ({
  type: FETCH_USERS_SUCCESS,
  payload: {
    data,
  },
})

export const getUsers = (params = {}) => async dispatch => {
  const endpoint = `https://jsonplaceholder.typicode.com/users?${serializeObjectParams(params)}`

  dispatch(fetchBegin())

  try {
    const response = await fetch(endpoint)

    const data = await response.json()

    dispatch(fetchSuccess(data))

    return data
  } catch (error) {
    dispatch(fetchError(error))

    throw error
  }
}
