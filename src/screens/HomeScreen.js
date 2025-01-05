import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CATEGORIES = [
  { id: '1', name: 'WFH', icon: 'home' },
  { id: '2', name: 'Internship', icon: 'graduation-cap' },
  { id: '3', name: 'Drive', icon: 'car' },
  { id: '4', name: 'Batches', icon: 'users' },
  { id: '5', name: 'Openings', icon: 'briefcase' },
];

const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('Openings');
  const [jobs, setJobs] = useState([
    {
      id: '1',
      jobTitle: 'Software Developer',
      jobPosition: 'Senior Developer',
      category: 'Openings',
      image: 'https://picsum.photos/200',
      companyDetails: 'Tech Corp Inc.',
      jobDescription: 'Looking for an experienced developer...',
      packageUrl: 'https://example.com/job/1'
    },
    // Add more sample jobs as needed
  ]);

  const filteredJobs = jobs.filter(job => job.category === selectedCategory);

  const handleCategoryPress = (categoryName) => {
    setSelectedCategory(categoryName);
    navigation.navigate('CategoryJobs', {
      category: categoryName,
      title: categoryName
    });
  };

  const renderJobItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <TouchableOpacity 
          style={styles.jobContent}
          onPress={() => navigation.navigate('JobDetails', { job: item })}
          activeOpacity={0.6}
        >
          <View style={styles.mainContent}>
            <View style={styles.titleSection}>
              <Text style={styles.jobTitle}>{item.jobTitle}</Text>
              <View style={styles.positionRow}>
                <Text style={styles.jobPosition}>{item.jobPosition}</Text>
                <Text style={styles.packageText}>3.5 LPA</Text>
              </View>
              <Text style={styles.dateText}>{new Date().toLocaleDateString()}</Text>
            </View>
          </View>

          <View style={styles.socialIcons}>
            <View style={styles.socialIconsGroup}>
              <TouchableOpacity style={styles.iconContainer}>
                <FontAwesome name="whatsapp" size={24} color="#25D366" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <FontAwesome name="facebook" size={24} color="#4267B2" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <FontAwesome name="linkedin" size={24} color="#0077B5" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <FontAwesome name="telegram" size={24} color="#0088cc" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <FontAwesome name="instagram" size={24} color="#E1306C" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.copyButton}>
              <FontAwesome name="copy" size={24} color="#666" />
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCategories = () => (
    <View style={styles.categoriesGrid}>
      {CATEGORIES.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryTab,
            selectedCategory === category.name && styles.selectedCategoryTab
          ]}
          onPress={() => handleCategoryPress(category.name)}
        >
          <FontAwesome 
            name={category.icon} 
            size={24} 
            color={selectedCategory === category.name ? '#fff' : '#666'} 
          />
          <Text style={[
            styles.categoryText,
            selectedCategory === category.name && styles.selectedCategoryText
          ]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderCategories()}
     
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('CreateJob', { category: selectedCategory })}
      >
        <FontAwesome name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%', // slightly less than 50% to account for spacing
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  selectedCategoryTab: {
    backgroundColor: '#4CAF50',
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  jobsList: {
    padding: 10,
  },
  cardContainer: {
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
  },
  jobContent: {
    flex: 1,
  },
  mainContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  titleSection: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  positionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  jobPosition: {
    fontSize: 16,
    color: "#666",
  },
  packageText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  socialIconsGroup: {
    flexDirection: "row",
    gap: 10,
  },
  iconContainer: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 5,
    width: 50,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  copyButton: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    height: 45,
  },
  copyButtonText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default HomeScreen; 