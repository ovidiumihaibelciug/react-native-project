/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Chat from './src/pages/Chat/Chat';
import Feed from './src/pages/Feed/Feed';
import Login from './src/pages/Login/Login';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import axios from 'axios';

axios.defaults.baseURL = 'http://97.107.138.116:8010';

const Stack = createNativeStackNavigator();

const headerOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: '#151515',
  },
  headerTintColor: '#696969',
};
function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={headerOptions}
          />
          <Stack.Screen name="Feed" component={Feed} options={headerOptions} />
          <Stack.Screen name="Chat" component={Chat} options={headerOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
