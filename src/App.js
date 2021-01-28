import 'react-native-gesture-handler'
import * as React from 'react'
import Navigation from './Navigation'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'

const store = configureStore()

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}

export default App
