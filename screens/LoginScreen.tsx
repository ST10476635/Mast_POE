import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, ScrollView, Alert, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../App';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
  setIsChef: (isChef: boolean) => void;
  setCurrentUser: (user: any) => void;
};

export default function LoginScreen({ navigation, setIsChef, setCurrentUser }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChefLogin = () => {
    // Simple chef authentication
    const chefCredentials = {
      chef: { username: 'chef', password: 'chef123' },
      admin: { username: 'admin', password: 'admin123' }
    };

    if ((username === 'chef' && password === 'chef123') || 
        (username === 'admin' && password === 'admin123')) {
      
      setIsChef(true);
      setCurrentUser({
        username,
        role: 'chef',
        name: 'Master Chef',
        restaurant: 'Taste Toffel'
      });
      
      Alert.alert('Welcome Chef!', 'You have successfully logged into the chef portal.');
      navigation.navigate('Home');
    } else {
      Alert.alert('Login Failed', 'Invalid chef credentials. Please try again.');
    }
  };

   return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>👨‍🍳 Chef Portal</Text>
          <Text style={styles.subtitle}>
            Restaurant Management Login
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Chef Username</Text>
            <TextInput
              style={styles.textInput}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter chef username"
              placeholderTextColor="#999"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.textInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter chef password"
              placeholderTextColor="#999"
              secureTextEntry
            />
          </View>

          <Pressable 
            style={styles.loginButton}
            onPress={handleChefLogin}
          >
            <Text style={styles.loginButtonText}>Access Chef Portal</Text>
          </Pressable>

          <View style={styles.demoCredentials}>
            <Text style={styles.demoTitle}>Demo Chef Credentials:</Text>
            <Text style={styles.demoText}>Username: chef | Password: chef123</Text>
            <Text style={styles.demoText}>Username: admin | Password: admin123</Text>
          </View>

          <View style={styles.signupPrompt}>
            <Text style={styles.signupText}>Looking to join as a customer?</Text>
            <Pressable onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signupLink}>Sign up here</Text>
            </Pressable>
          </View>

          <Pressable 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back to Home</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  
  signupPrompt: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#654321',
    marginBottom: 4,
  },
  signupLink: {
    fontSize: 14,
    color: '#8B4513',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#D2B48C',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#654321',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#654321',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#654321',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D2B48C',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#654321',
    backgroundColor: '#FFF8DC',
  },
  loginButton: {
    backgroundColor: '#8B4513',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#FFF8DC',
    fontSize: 18,
    fontWeight: '600',
  },
  demoCredentials: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#FFF8DC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D2B48C',
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#654321',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 12,
    color: '#654321',
    marginBottom: 4,
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#8B4513',
    fontSize: 16,
    fontWeight: '600',
  },
});