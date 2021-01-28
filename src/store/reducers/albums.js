import { FETCH_ALBUMS_BEGIN, FETCH_ALBUMS_ERROR, FETCH_ALBUMS_SUCCESS } from '../constants'

const initialState = {
  isFetching: false,
  fetchError: null,
  data: [],
}

const albumsReducer = (state = initialState, { type, ...action }) => {
  switch (type) {
    case FETCH_ALBUMS_BEGIN:
      return {
        ...state,
        isFetching: true,
      }

    case FETCH_ALBUMS_SUCCESS:
      const { data } = action.payload

      return {
        ...state,
        data,
        fetchError: null,
        isFetching: false,
      }

    case FETCH_ALBUMS_ERROR:
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

export default albumsReducer
