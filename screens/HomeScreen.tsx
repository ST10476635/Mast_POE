import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  isChef: boolean;
  currentUser: any;
  setIsChef: (isChef: boolean) => void;
  setCurrentUser: (user: any) => void;
};

export default function HomeScreen({ navigation, isChef, currentUser, setIsChef, setCurrentUser }: Props) {

  const handleChefLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout as chef?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          onPress: () => {
            setIsChef(false);
            setCurrentUser(null);
          }
        },
      ]
    );
  };

  const handleUserLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          onPress: () => setCurrentUser(null)
        },
      ]
    );
  };
  
  return (
    <ImageBackground 
      source={require('../assets/background.jpg')} 
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>Taste Toffel</Text>
            <Text style={styles.subtitle}>
              Professional Chef's Menu Management
            </Text>
          </View>

          {/* Welcome Section */}
          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeTitle}>Welcome Chef!</Text>
            <Text style={styles.welcomeText}>
              Manage your restaurant menu, add new courses, and update pricing all in one place.
            </Text>
          </View>

          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Active Courses</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>New Today</Text>
            </View>
          </View>

          {/* Navigation Buttons */}
          <View style={styles.buttonContainer}>
            <Pressable 
              style={[styles.button, styles.primaryButton]}
              onPress={() => navigation.navigate('Courses')}
            >
              <Text style={styles.buttonText}>View Courses</Text>
            </Pressable>

            <Pressable 
              style={[styles.button, styles.secondaryButton]}
              onPress={() => navigation.navigate('AddMenu')}
            >
              <Text style={styles.buttonText}>Add New Course</Text>
            </Pressable>

            <View style={styles.authButtonContainer}>
              <Pressable 
                style={[styles.button, styles.outlineButton]}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.outlineButtonText}>Login</Text>
              </Pressable>

              <Pressable 
                style={[styles.button, styles.accentButton]}
                onPress={() => navigation.navigate('SignUp')}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </Pressable>
            </View>
          </View>

          {/* Featured Course Preview */}
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Featured Course</Text>
            <View style={styles.featuredCard}>
              <Text style={styles.featuredName}>Grilled Salmon</Text>
              <Text style={styles.featuredDescription}>
                Fresh Atlantic salmon with herb butter and seasonal vegetables
              </Text>
              <Text style={styles.featuredPrice}>$24.99</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#654321',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#654321',
    textAlign: 'center',
  },
  welcomeCard: {
    backgroundColor: '#FFF8DC',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D2B48C',
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#654321',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: '#654321',
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#FFF8DC',
    padding: 16,
    borderRadius: 12,
    flex: 0.48,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D2B48C',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  statLabel: {
    fontSize: 14,
    color: '#654321',
    marginTop: 4,
  },
  buttonContainer: {
    marginBottom: 24,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#8B4513',
  },
  secondaryButton: {
    backgroundColor: '#D2B48C',
  },
  accentButton: {
    backgroundColor: '#CD853F',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#8B4513',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  outlineButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8B4513',
  },
  authButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featuredSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#654321',
    marginBottom: 12,
  },
  featuredCard: {
    backgroundColor: '#FFF8DC',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D2B48C',
  },
  featuredName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#654321',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#654321',
    marginBottom: 8,
    lineHeight: 20,
  },
  featuredPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
  },
});

