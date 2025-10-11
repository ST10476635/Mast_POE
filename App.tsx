import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState } from 'react';

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

  const [isChef, setIsChef] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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
          <Stack.Screen name="Home">
            {(props) => (
              <HomeScreen 
                {...props} 
                isChef={isChef} 
                currentUser={currentUser}
                setIsChef={setIsChef}
                setCurrentUser={setCurrentUser}
              />
            )}
          </Stack.Screen>
          
          <Stack.Screen name="Courses">
            {(props) => (
              <CourseScreen 
                {...props} 
                isChef={isChef}
                currentUser={currentUser}
              />
            )}
          </Stack.Screen>
          
          {isChef && (
            <Stack.Screen 
              name="AddMenu" 
              component={AddMenuScreen}
              options={{ title: 'Add New Course' }}
            />
          )}
          
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen 
                {...props} 
                setIsChef={setIsChef}
                setCurrentUser={setCurrentUser}
              />
            )}
          </Stack.Screen>
          
          <Stack.Screen name="SignUp">
            {(props) => (
              <SignUpScreen 
                {...props} 
                setCurrentUser={setCurrentUser}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}