import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Text,
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CATEGORIES = [
  { id: '1', name: 'WFH', icon: 'home' },
  { id: '2', name: 'Internship', icon: 'graduation-cap' },
  { id: '3', name: 'Drive', icon: 'car' },
  { id: '4', name: 'Batches', icon: 'users' },
  { id: '5', name: 'Openings', icon: 'briefcase' },
];

const HomeScreen = ({ navigation }) => {
  const handleCategoryPress = (categoryName) => {
    navigation.navigate('CategoryJobs', {
      category: categoryName,
      title: categoryName
    });
  };

  const renderCategoryCard = (category) => (
    <View key={category.id} style={styles.categoryCard}>
      <TouchableOpacity
        style={styles.cardInner}
        onPress={() => handleCategoryPress(category.name)}
      >
        <View style={styles.cardContent}>
          <FontAwesome name={category.icon} size={32} color="#666" />
          <Text style={styles.categoryName}>{category.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.categoriesContainer}>
          <View style={styles.gridContainer}>
            {CATEGORIES.map(category => renderCategoryCard(category))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  categoriesContainer: {
    padding: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  categoryCard: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 6,
  },
  cardInner: {
    flex: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    padding: 8,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
    textAlign: 'center',
  },
});

export default HomeScreen; 