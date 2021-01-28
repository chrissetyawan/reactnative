import * as React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

/**
 * Screens
 */
import HomeScreen from './screens/Home'
import DetailScreen from './screens/Detail'

/**
 * Theme Configuration
 */
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    secondary: 'rgb(28, 28, 30)',
    background: 'rgb(255, 255, 255)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    textLight: 'rgb(255, 255, 255)',
    border: 'rgb(199, 199, 204)',
  },
}

const Stack = createStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          title: 'Photo Album',
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Album Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
