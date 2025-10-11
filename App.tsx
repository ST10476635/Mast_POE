import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';

// Import screens
import HomeScreen from './screens/HomeScreen';
import CourseScreen from './screens/CourseScreen';
import AddMenuScreen from './screens/AddMenuScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

export type RootStackParamList = {
  Home: undefined;
  Courses: undefined;
  AddMenu: undefined;
  Login: undefined;
  SignUp: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {

  const [user, setUser] = useState(null);
  const [isChef, setIsChef] = useState(false);

  const authContext = {
    signIn: (userData: any) => {
      setUser(userData);
      setIsChef(userData?.role === 'chef');
    },
    signOut: () => {
      setUser(null);
      setIsChef(false);
    },
    user,
    isChef,
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#8B4513',
            },
            headerTintColor: '#FFF8DC',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: 'Taste Toffel' }}
          />
          <Stack.Screen 
            name="Courses" 
            component={CourseScreen}
            options={{ title: 'Menu Courses' }}
          />
          <Stack.Screen 
            name="AddMenu" 
            component={AddMenuScreen}
            options={{ title: 'Add New Course' }}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ title: 'Login' }}
          />
          <Stack.Screen 
            name="SignUp" 
            component={SignUpScreen}
            options={{ title: 'Sign Up' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}