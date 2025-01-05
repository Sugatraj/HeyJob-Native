import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CATEGORIES = [
  { id: '1', name: 'WFH', icon: 'home', color: '#4CAF50' },
  { id: '2', name: 'Internship', icon: 'graduation-cap', color: '#2196F3' },
  { id: '3', name: 'Drive', icon: 'car', color: '#FF9800' },
  { id: '4', name: 'Batches', icon: 'users', color: '#9C27B0' },
  { id: '5', name: 'Openings', icon: 'briefcase', color: '#F44336' },
];

const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('Openings');

  const handleCategoryPress = (categoryName) => {
    setSelectedCategory(categoryName);
    navigation.navigate('CategoryJobs', {
      category: categoryName,
      title: categoryName
    });
  };

  const renderCategoryCard = (category) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryCard,
        { backgroundColor: category.color }
      ]}
      onPress={() => handleCategoryPress(category.name)}
    >
      <View style={styles.cardContent}>
        <View style={styles.iconContainer}>
          <FontAwesome 
            name={category.icon} 
            size={32} 
            color="#fff"
          />
        </View>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryName}>{category.name}</Text>
          <Text style={styles.categoryDescription}>
            View all {category.name.toLowerCase()} opportunities
          </Text>
        </View>
        <FontAwesome 
          name="chevron-right" 
          size={24} 
          color="#fff"
          style={styles.arrowIcon}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Job Categories</Text>
      </View>
      <View style={styles.categoriesContainer}>
        {CATEGORIES.map(category => renderCategoryCard(category))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  categoriesContainer: {
    padding: 16,
  },
  categoryCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryInfo: {
    flex: 1,
    marginLeft: 16,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  arrowIcon: {
    marginLeft: 16,
  },
});

export default HomeScreen; 