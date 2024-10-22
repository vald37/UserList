// App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UserList from './src/screens/UserList';
import UserDetail from './src/screens/UserDetail';

export type RootStackParamList = {
  UserList: any;
  UserDetail: {userId: number};
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserList">
        <Stack.Screen
          name="UserList"
          component={UserList}
          options={{title: 'User List'}}
        />
        <Stack.Screen
          name="UserDetail"
          component={UserDetail}
          options={{title: 'User Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
