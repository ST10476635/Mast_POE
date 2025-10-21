// CourseScreen.tsx - Updated with more food items
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../App';

type CourseScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Courses'>;

type Props = {
  navigation: CourseScreenNavigationProp;
  isChef: boolean;
  currentUser: any;
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
  // Starters
  {
    id: '1',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan',
    price: 89.99,
    category: 'Starters',
    image: require('../assets/_salad.jpg'),
  },
  
  {
    id: '2',
    name: 'Caprese Salad',
    description: 'Fresh mozzarella, tomatoes, and basil with balsamic glaze',
    price: 79.99,
    category: 'Starters',
    image: require('../assets/_caprese_salad.jpg'),
  },
  {
    id: '3',
    name: 'Beef Carpaccio',
    description: 'Thinly sliced raw beef with arugula, capers, and parmesan',
    price: 149.99,
    category: 'Starters',
    image: require('../assets/_beef_carpaccio.jpg'),
  },

  // Mains
  {
    id: '4',
    name: 'Grilled Salmon',
    description: 'Atlantic salmon with herb butter and seasonal vegetables',
    price: 189.99,
    category: 'Mains',
    image: require('../assets/_salmon.jpg'),
  },
  {
    id: '5',
    name: 'Filet Mignon',
    description: '8oz premium beef tenderloin with red wine reduction',
    price: 289.99,
    category: 'Mains',
    image: require('../assets/_filet_mignon.jpg'),
  },

  // Desserts
  {
    id: '6',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center and vanilla ice cream',
    price: 89.99,
    category: 'Desserts',
    image: require('../assets/_lava_cake.jpg'),
  },
  {
    id: '7',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers',
    price: 79.99,
    category: 'Desserts',
    image: require('../assets/_tiramisu.jpg'),
  },

  // Drinks
  {
    id: '8',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 35.99,
    category: 'Drinks',
    image: require('../assets/_fresh_orange_juice.jpg'),
  },
];

const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

export default function CourseScreen({ navigation, isChef, currentUser }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuCard}>
      <View style={styles.menuImagePlaceholder}>
        <Text style={styles.menuImageText}>🍽️</Text>
        <Text style={styles.imagePlaceholderText}>{item.name}</Text>
      </View>
      <View style={styles.menuInfo}>
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.menuDescription}>{item.description}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.menuPrice}>R{item.price.toFixed(2)}</Text>
          <Text style={styles.menuCategory}>{item.category}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Navigation - Different for Chef vs Customer */}
      <View style={styles.headerNav}>
        <Pressable 
          style={styles.navButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.navButtonText}>Home</Text>
        </Pressable>
        
        {isChef ? (
          <Pressable 
            style={styles.navButton}
            onPress={() => navigation.navigate('AddMenu')}
          >
            <Text style={styles.navButtonText}>Add Course</Text>
          </Pressable>
        ) : (
          <Pressable 
            style={styles.navButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.navButtonText}>Chef Login</Text>
          </Pressable>
        )}
      </View>

      <ScrollView>
        {/* Category Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Filter by Course</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryContainer}>
              {categories.map(category => (
                <Pressable
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.categoryButtonSelected
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={[
                    styles.categoryText,
                    selectedCategory === category && styles.categoryTextSelected
                  ]}>
                    {category}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Menu Items List */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All' ? 'All Menu Items' : selectedCategory}
            <Text style={styles.itemCount}> ({filteredItems.length} items)</Text>
          </Text>
          <FlatList
            data={filteredItems}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
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
  filterSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#D2B48C',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#654321',
    marginBottom: 12,
  },
  itemCount: {
    fontSize: 14,
    color: '#8B4513',
    fontWeight: 'normal',
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#D2B48C',
    marginRight: 8,
  },
  categoryButtonSelected: {
    backgroundColor: '#8B4513',
  },
  categoryText: {
    color: '#654321',
    fontWeight: '600',
  },
  categoryTextSelected: {
    color: '#FFF8DC',
  },
  menuSection: {
    padding: 16,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#D2B48C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuImagePlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: '#D2B48C',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  menuImageText: {
    fontSize: 32,
    marginBottom: 8,
  },
  imagePlaceholderText: {
    fontSize: 14,
    color: '#654321',
    fontWeight: '600',
    textAlign: 'center',
  },
  menuInfo: {
    padding: 16,
  },
  menuName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#654321',
    marginBottom: 8,
  },
  menuDescription: {
    fontSize: 14,
    color: '#654321',
    marginBottom: 12,
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  menuCategory: {
    fontSize: 12,
    color: '#CD853F',
    fontWeight: '600',
    backgroundColor: '#FFF8DC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
});