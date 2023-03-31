/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import TodoList from './src/features/todo/TodoList';
import {TODO_LIST} from './src/NavigationConstants';
import store from './src/store/store';
import {Colors} from './src/utils';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={TODO_LIST}>
            <Stack.Screen
              name={TODO_LIST}
              component={TodoList}
              options={() => ({
                title: 'TODO ✏️',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  color: Colors.white,
                  fontWeight: '800',
                },
                headerStyle: {
                  backgroundColor: Colors.secondary,
                },
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default App;
