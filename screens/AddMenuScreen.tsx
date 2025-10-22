import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { MenuItem, RootStackParamList } from './../App';

type AddMenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddMenu'>;

type Props = {
  navigation: AddMenuScreenNavigationProp;
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
};

export default function AddMenuScreen({ navigation, menuItems,setMenuItems }: Props) {
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const categories = ['Starters', 'Mains', 'Desserts', 'Drinks'];

  const handleAddCourse = () => {
    if (!courseName || !description || !price || !category) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Validate price is a number
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    // Create new menu item
    const newItem: MenuItem = {
      id: Date.now().toString(), // Generate unique ID
      name: courseName,
      description: description,
      price: priceValue,
      category: category,
    };

    // Actually save to global state
    setMenuItems([...menuItems, newItem]);

    Alert.alert('Success', 'Course added successfully!');
    
    // Reset form
    setCourseName('');
    setDescription('');
    setPrice('');
    setCategory('');
    
    // Navigate back to courses
    navigation.navigate('Courses');
  };

   const handleDiscard = () => {
    if (courseName || description || price || category) {
      Alert.alert(
        'Discard Changes',
        'Are you sure you want to discard this course?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Discard', 
            style: 'destructive',
            onPress: () => navigation.navigate('Home')
          },
        ]
      );
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Navigation */}
      <View style={styles.headerNav}>
        <Pressable 
          style={styles.navButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.navButtonText}>Home</Text>
        </Pressable>
        <Pressable 
          style={styles.navButton}
          onPress={() => navigation.navigate('Courses')}
        >
          <Text style={styles.navButtonText}>Courses</Text>
        </Pressable>
        <Pressable 
          style={styles.navButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.navButtonText}>Login</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Add New Course</Text>

          {/* Course Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Course Name</Text>
            <TextInput
              style={styles.textInput}
              value={courseName}
              onChangeText={setCourseName}
              placeholder="Enter course name"
              placeholderTextColor="#999"
            />
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter course description"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Price */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.textInput}
              value={price}
              onChangeText={setPrice}
              placeholder="Enter price"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
            />
          </View>

          {/* Category */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.categoryContainer}>
              {categories.map((cat) => (
                <Pressable
                  key={cat}
                  style={[
                    styles.categoryOption,
                    category === cat && styles.categoryOptionSelected
                  ]}
                  onPress={() => setCategory(cat)}
                >
                  <Text style={[
                    styles.categoryOptionText,
                    category === cat && styles.categoryOptionTextSelected
                  ]}>
                    {cat}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <Pressable 
              style={[styles.button, styles.discardButton]}
              onPress={handleDiscard}
            >
              <Text style={styles.discardButtonText}>Discard</Text>
            </Pressable>

            <Pressable 
              style={[styles.button, styles.addButton]}
              onPress={handleAddCourse}
            >
              <Text style={styles.addButtonText}>Add Course</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
  },
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#8B4513',
  },
  navButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  navButtonText: {
    color: '#FFF8DC',
    fontWeight: '600',
    fontSize: 16,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#D2B48C',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#654321',
    marginBottom: 24,
    textAlign: 'center',
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#D2B48C',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryOptionSelected: {
    backgroundColor: '#8B4513',
    borderColor: '#654321',
  },
  categoryOptionText: {
    color: '#654321',
    fontWeight: '600',
  },
  categoryOptionTextSelected: {
    color: '#FFF8DC',
  },
  imageUpload: {
    height: 150,
    borderWidth: 2,
    borderColor: '#D2B48C',
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8DC',
  },
  imageUploadText: {
    color: '#8B4513',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 0.48,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  discardButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#8B4513',
  },
  addButton: {
    backgroundColor: '#8B4513',
  },
  discardButtonText: {
    color: '#8B4513',
    fontSize: 18,
    fontWeight: '600',
  },
  addButtonText: {
    color: '#FFF8DC',
    fontSize: 18,
    fontWeight: '600',
  },
});