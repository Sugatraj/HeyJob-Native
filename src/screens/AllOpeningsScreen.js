import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, TextInput, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import JobCard from '../components/JobCard';
import { collection, query, getDocs, orderBy } from '@firebase/firestore';
import { db } from '../config/firebase';
import Toast from 'react-native-toast-message';
import { jobService } from '../services/jobService';

const AllOpeningsScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [sortAscending, setSortAscending] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const jobsRef = collection(db, 'jobs');
      const q = query(jobsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const jobsList = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        }))
        .filter(job => job.status === 'active');

      setJobs(jobsList);
    } catch (error) {
      console.error('Error loading jobs:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load jobs'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    if (route?.params?.refresh) {
      loadJobs();
      navigation.setParams({ refresh: false });
    }
  }, [route?.params?.refresh, navigation]);

  const handleSort = () => {
    setSortAscending(!sortAscending);
    setJobs([...jobs].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortAscending ? dateA - dateB : dateB - dateA;
    }));
  };

  const filteredJobs = jobs.filter(job => 
    job.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.jobPosition?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderJobItem = ({ item }) => (
    <JobCard 
      job={item}
      onPress={() => navigation.navigate('JobDetails', { job: item })}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <FontAwesome name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
          <FontAwesome6 
            name={sortAscending ? "arrow-up-wide-short" : "arrow-down-wide-short"} 
            size={24} 
            color="#666" 
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredJobs}
        renderItem={renderJobItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateJob')}
      >
        <FontAwesome name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  searchContainer: {
    flexDirection: "row",
    padding: 10,
    paddingTop: 20,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginRight: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  sortButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 10,
  },
  fab: {
    position: "absolute",
    right: 25,
    bottom: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
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

export default AllOpeningsScreen; 