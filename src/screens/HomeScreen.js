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
  { id: '2', name: 'WFH', icon: 'home' },
  { id: '3', name: 'Internship', icon: 'graduation-cap' },
  { id: '4', name: 'Drive', icon: 'car' },
  { id: '5', name: 'Batches', icon: 'users' },
];

const HomeScreen = ({ navigation }) => {
  const handleCategoryPress = (categoryName) => {
    if (categoryName === 'All Openings') {
      navigation.navigate('AllOpenings');
    } else {
      navigation.navigate('CategoryJobs', {
        category: categoryName,
        title: categoryName
      });
    }
  };

  const renderAllOpeningsCard = () => (
    <TouchableOpacity
      style={styles.allOpeningsCard}
      onPress={() => handleCategoryPress('All Openings')}
    >
      <View style={styles.allOpeningsContent}>
        <FontAwesome name="briefcase" size={32} color="#666" />
        <Text style={styles.allOpeningsTitle}>All Openings</Text>
      </View>
    </TouchableOpacity>
  );

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
        <View style={styles.allOpeningsContainer}>
          {renderAllOpeningsCard()}
        </View>
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
  allOpeningsContainer: {
    padding: 12,
  },
  allOpeningsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
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
    height: 100,
  },
  allOpeningsContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 15,
  },
  allOpeningsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  categoriesContainer: {
    padding: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -4,
  },
  categoryCard: {
    width: '25%',
    aspectRatio: 1,
    padding: 4,
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
    padding: 6,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default HomeScreen; 