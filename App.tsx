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

// Define MenuItem type
export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
};

// Demo meals data
const demoMeals: MenuItem[] = [
  {
    id: '1',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan',
    price: 89.99,
    category: 'Starters',
  },
  {
    id: '2',
    name: 'Caprese Salad',
    description: 'Fresh mozzarella, tomatoes, and basil with balsamic glaze',
    price: 79.99,
    category: 'Starters',
  },
  {
    id: '3',
    name: 'Beef Carpaccio',
    description: 'Thinly sliced raw beef with arugula, capers, and parmesan',
    price: 149.99,
    category: 'Starters',
  },
  {
    id: '4',
    name: 'Grilled Salmon',
    description: 'Atlantic salmon with herb butter and seasonal vegetables',
    price: 189.99,
    category: 'Mains',
  },
  {
    id: '5',
    name: 'Filet Mignon',
    description: '8oz premium beef tenderloin with red wine reduction',
    price: 289.99,
    category: 'Mains',
  },
  {
    id: '6',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center and vanilla ice cream',
    price: 89.99,
    category: 'Desserts',
  },
  {
    id: '7',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers',
    price: 79.99,
    category: 'Desserts',
  },
  {
    id: '8',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 35.99,
    category: 'Drinks',
  },
];

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [isChef, setIsChef] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(demoMeals);

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
                menuItems={menuItems}
              />
            )}
          </Stack.Screen>
          
          <Stack.Screen name="Courses">
            {(props) => (
              <CourseScreen 
                {...props} 
                isChef={isChef}
                currentUser={currentUser}
                menuItems={menuItems}
                setMenuItems={setMenuItems}
              />
            )}
          </Stack.Screen>
          
          {isChef && (
            <Stack.Screen name="AddMenu">
              {(props) => (
                <AddMenuScreen 
                  {...props} 
                  menuItems={menuItems}
                  setMenuItems={setMenuItems}
                />
              )}
            </Stack.Screen>
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