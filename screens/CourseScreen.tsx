import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../App';

type CourseScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Courses'>;

type Props = {
  navigation: CourseScreenNavigationProp;
};

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: any;
};

const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan',
    price: 12.99,
    category: 'Starters',
    image: require('../assets/salad.jpg'),
  },
  {
    id: '2',
    name: 'Grilled Salmon',
    description: 'Atlantic salmon with herb butter and seasonal vegetables',
    price: 24.99,
    category: 'Mains',
    image: require('../assets/salmon.jpg'),
  },
  {
    id: '3',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center and vanilla ice cream',
    price: 8.99,
    category: 'Desserts',
    image: require('../assets/cake.jpg'),
  },
];

const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

