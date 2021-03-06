import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MenuScreen from './screens/MenuScreen';
import SliderAnimationScreen from './screens/SliderAnimationScreen/SliderAnimationScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MenuScreen">
          <Stack.Screen name="MenuScreen" component={MenuScreen} />
          <Stack.Screen
            name="SliderAnimationScreen"
            component={SliderAnimationScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
