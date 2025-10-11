import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  ScrollView,
  Alert

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
      source={require('../assets/_restaurants')} 
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>Taste Toffel</Text>
            <Text style={styles.subtitle}>
              {isChef ? 'Chef Management Portal' : 'Fine Dining Experience'}
            </Text>
             
             {/* User Status */}
            {(currentUser || isChef) && (
              <View style={styles.userBadge}>
                <Text style={styles.userText}>
                  {isChef ? '👨‍🍳 Chef Mode' : `👤 Welcome, ${currentUser?.name || 'Guest'}`}
                </Text>
                <Pressable onPress={isChef ? handleChefLogout : handleUserLogout} style={styles.logoutButton}>
                  <Text style={styles.logoutText}>Logout</Text>
                </Pressable>
              </View>
            )}

          </View>

          {/* Welcome Message Based on Role */}
          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeTitle}>
              {isChef ? 'Welcome, Chef!' : 
               currentUser ? `Welcome back, ${currentUser.name}!` : 'Welcome to Taste Toffel!'}
            </Text>
            <Text style={styles.welcomeText}>
              {isChef 
                ? 'Manage your restaurant menu and create amazing culinary experiences.'
                : currentUser
                ? 'Ready to explore our delicious menu?'
                : 'Discover our exquisite menu crafted by our master chef.'}
            </Text>
          </View>

          {/* Quick Stats - Different for Chef vs Customer */}
          <View style={styles.statsContainer}>
            {isChef ? (
              // Chef Statistics
              <>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>12</Text>
                  <Text style={styles.statLabel}>Active Courses</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>3</Text>
                  <Text style={styles.statLabel}>New Today</Text>
                </View>
              </>
            ) : (
              // Customer View
              <View style={styles.customerStats}>
                <Text style={styles.customerStatText}>⭐ 4.8/5 Rating</Text>
                <Text style={styles.customerStatText}>🍽️ 50+ Dishes</Text>
                <Text style={styles.customerStatText}>👨‍🍳 Master Chef</Text>
              </View>
            )}

          </View>

 {/* Navigation Buttons - Role Based */}
          <View style={styles.buttonContainer}>
            {/* Both can view courses */}
            <Pressable 
              style={[styles.button, styles.primaryButton]}
              onPress={() => navigation.navigate('Courses')}
            >
              <Text style={styles.buttonText}>
                {isChef ? 'Manage Menu' : 'View Menu'}
              </Text>
            </Pressable>

            {/* Only Chef can add courses */}
            {isChef && (
              <Pressable 
                style={[styles.button, styles.secondaryButton]}
                onPress={() => navigation.navigate('AddMenu')}
              >
                <Text style={styles.buttonText}>Add New Course</Text>
              </Pressable>
            )}

            {/* Authentication Section */}
            <View style={styles.authSection}>
              {!currentUser && !isChef ? (
                // Not logged in - Show sign up and chef login
                <>
                  <Pressable 
                    style={[styles.button, styles.signUpButton]}
                    onPress={() => navigation.navigate('SignUp')}
                  >
                    <Text style={styles.buttonText}>📝 Sign Up</Text>
                  </Pressable>
                  
                  <View style={styles.loginOptions}>
                    <Text style={styles.loginPrompt}>Already have an account?</Text>
                    <Pressable onPress={() => navigation.navigate('Login')}>
                      <Text style={styles.loginLink}>Login as Chef</Text>
                    </Pressable>
                  </View>
                </>
              ) : isChef ? (
                // Chef is logged in - Show management options
                <View style={styles.chefTools}>
                  <Text style={styles.chefToolsTitle}>Management Tools</Text>
                  <View style={styles.toolButtons}>
                    <Pressable style={styles.toolButton}>
                      <Text style={styles.toolButtonText}>View Orders</Text>
                    </Pressable>
                    <Pressable style={styles.toolButton}>
                      <Text style={styles.toolButtonText}>Analytics</Text>
                    </Pressable>
                  </View>
                </View>
              ) : (
                // Regular user logged in
                <View style={styles.customerTools}>
                  <Text style={styles.customerWelcome}>Great to see you again!</Text>
                  <Pressable style={styles.reservationButton}>
                    <Text style={styles.reservationButtonText}>Make Reservation</Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>

          {/* Featured Course Preview */}
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>
              {isChef ? 'Most Popular Dish' : "Chef's Special"}
            </Text>
            <View style={styles.featuredCard}>
              <Text style={styles.featuredName}>Grilled Salmon</Text>
              <Text style={styles.featuredDescription}>
                Fresh Atlantic salmon with herb butter and seasonal vegetables
              </Text>
              <Text style={styles.featuredPrice}>$24.99</Text>
              {isChef && (
                <Text style={styles.featuredStats}>
                  📊 45 orders this week • ⭐ 4.9/5
                </Text>
              )}
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
  userBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 12,
    backgroundColor: '#FFF8DC',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D2B48C',
  },
  userText: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#654321', 
    marginRight: 12 
  },
  logoutButton: { 
    paddingHorizontal: 12, 
    paddingVertical: 4, 
    backgroundColor: '#8B4513', 
    borderRadius: 12 
  },
  logoutText: { 
    color: '#FFF8DC', 
    fontSize: 12, 
    fontWeight: '600' 
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
  customerStats: { 
    flexDirection: 'row', 
    justifyContent: 'space-around',
    backgroundColor: '#FFF8DC',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D2B48C',
    width: '100%',
  },
  customerStatText: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#654321' 
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
  signUpButton: {
    backgroundColor: '#CD853F',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  authSection: {
    marginTop: 8,
  },
  chefTools: {
    marginTop: 16,
  },
  chefToolsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#654321',
    marginBottom: 8,
    textAlign: 'center',
  },
  toolButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toolButton: {
    flex: 0.48,
    padding: 12,
    backgroundColor: '#D2B48C',
    borderRadius: 8,
    alignItems: 'center',
  },
  toolButtonText: {
    color: '#654321',
    fontWeight: '600',
  },
  customerTools: {
    alignItems: 'center',
    marginTop: 16,
  },
  customerWelcome: {
    fontSize: 16,
    color: '#654321',
    marginBottom: 8,
  },
  reservationButton: {
    padding: 12,
    backgroundColor: '#8B4513',
    borderRadius: 8,
    paddingHorizontal: 24,
  },
  reservationButtonText: {
    color: '#FFF8DC',
    fontWeight: '600',
  },
  loginOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  loginPrompt: {
    fontSize: 14,
    color: '#654321',
    marginRight: 8,
  },
  loginLink: {
    fontSize: 14,
    color: '#8B4513',
    fontWeight: '600',
    textDecorationLine: 'underline',
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
  featuredStats: {
    fontSize: 12,
    color: '#CD853F',
    marginTop: 8,
    fontStyle: 'italic',
  },
});

