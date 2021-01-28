import { FETCH_PHOTOS_BEGIN, FETCH_PHOTOS_ERROR, FETCH_PHOTOS_SUCCESS } from '../constants'

const initialState = {
  isFetching: false,
  fetchError: null,
  data: [],
}

const photosReducer = (state = initialState, { type, ...action }) => {
  switch (type) {
    case FETCH_PHOTOS_BEGIN:
      return {
        ...state,
        isFetching: true,
      }

    case FETCH_PHOTOS_SUCCESS:
      const { data } = action.payload

      return {
        ...state,
        data,
        fetchError: null,
        isFetching: false,
      }

    case FETCH_PHOTOS_ERROR:
      const { error: fetchError } = action.payload

      return {
        ...state,
        fetchError,
        isFetching: false,
      }

    default:
      return state
  }
}

export default photosReducer
