import { FETCH_USERS_BEGIN, FETCH_USERS_ERROR, FETCH_USERS_SUCCESS } from '../constants'

const initialState = {
  isFetching: false,
  fetchError: null,
  data: [],
}

const usersReducer = (state = initialState, { type, ...action }) => {
  switch (type) {
    case FETCH_USERS_BEGIN:
      return {
        ...state,
        isFetching: true,
      }

    case FETCH_USERS_SUCCESS:
      const { data } = action.payload

      return {
        ...state,
        data,
        fetchError: null,
        isFetching: false,
      }

    case FETCH_USERS_ERROR:
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

export default usersReducer
