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

type CourseScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddMenu'>;

type Props = {
  navigation: CourseScreenNavigationProp;
};