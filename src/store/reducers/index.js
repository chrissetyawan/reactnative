import { combineReducers } from 'redux'

/**
 * Reducers
 */
import users from './users'
import albums from './albums'
import photos from './photos'

const rootReducer = combineReducers({
  users,
  albums,
  photos,
})

export default rootReducer
