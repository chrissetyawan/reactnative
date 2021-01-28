import { FETCH_PHOTOS_BEGIN, FETCH_PHOTOS_ERROR, FETCH_PHOTOS_SUCCESS } from '../constants'

export const fetchBegin = () => ({
  type: FETCH_PHOTOS_BEGIN,
})

export const fetchError = error => ({
  type: FETCH_PHOTOS_ERROR,
  payload: {
    error,
  },
})

export const fetchSuccess = data => ({
  type: FETCH_PHOTOS_SUCCESS,
  payload: {
    data,
  },
})

export const getPhotos = id => async dispatch => {
  const endpoint = `https://jsonplaceholder.typicode.com/albums/${id}/photos`

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

export const getAllPhotos = () => async dispatch => {
  const endpoint = `https://jsonplaceholder.typicode.com/photos`

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
