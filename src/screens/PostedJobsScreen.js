import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Image, Alert, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const PostedJobsScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([
    {
      id: '1',
      jobTitle: 'Software Developer',
      jobPosition: 'Senior Developer',
      category: 'Technology',
      image: 'https://picsum.photos/200', // placeholder image
      companyDetails: 'Tech Corp Inc.',
      jobDescription: 'Looking for an experienced developer...',
      packageUrl: 'https://example.com/job/1'
    },
    {
      id: '2',
      jobTitle: 'UI Designer',
      jobPosition: 'Mid-level Designer',
      category: 'Design',
      image: 'https://picsum.photos/201', // placeholder image
      companyDetails: 'Design Studio Ltd.',
      jobDescription: 'Seeking creative UI designer...',
      packageUrl: 'https://example.com/job/2'
    },
  ]); // Replace with API call later

  // Add new job
  React.useEffect(() => {
    if (route.params?.newJob) {
      setJobs(currentJobs => [...currentJobs, {
        id: String(Date.now()), // Simple way to generate unique ID
        ...route.params.newJob
      }]);
    }
  }, [route.params?.newJob]);

  // Update existing job
  React.useEffect(() => {
    if (route.params?.updatedJob) {
      setJobs(currentJobs =>
        currentJobs.map(job =>
          job.id === route.params.updatedJob.id ? route.params.updatedJob : job
        )
      );
    }
  }, [route.params?.updatedJob]);

  // Delete job
  const handleDeleteJob = (jobId) => {
    Alert.alert(
      "Delete Job",
      "Are you sure you want to delete this job?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setJobs(currentJobs => currentJobs.filter(job => job.id !== jobId));
          }
        }
      ]
    );
  };

  const filteredJobs = jobs.filter(job => 
    job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.jobPosition.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <FontAwesome name="whatsapp" size={styles.iconSize.fontSize} color="#25D366" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <FontAwesome name="facebook" size={styles.iconSize.fontSize} color="#4267B2" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <FontAwesome name="linkedin" size={styles.iconSize.fontSize} color="#0077B5" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <FontAwesome name="telegram" size={styles.iconSize.fontSize} color="#0088cc" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <FontAwesome name="instagram" size={styles.iconSize.fontSize} color="#E1306C" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.copyButton}>
              <FontAwesome name="copy" size={26} color="#666" style={styles.copyIcon} />
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </View>
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
        <TouchableOpacity style={styles.sortButton}>
          <FontAwesome name="sort" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredJobs}
        renderItem={renderJobItem}
        keyExtractor={(item) => item.id}
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
    backgroundColor: "#f5f5f5", // Light gray background
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
    alignItems: "flex-start",
    marginBottom: 15,
  },
  titleSection: {
    flex: 1,
    marginRight: 10,
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
    width: "100%",
    paddingRight: 1,
    flex: 1,
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
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconSize: {
    fontSize: 26, // You can adjust this value to change all icon sizes at once
  },
  socialIconsGroup: {
    flexDirection: "row",
    gap: 10,
  },
  iconContainer: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 5,
    width: 60,
    height: 50,
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
    justifyContent: "center",

    height: 50,
  },
  copyIcon: {
    marginRight: 6,
  },
  copyButtonText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  fab: {
    position: "absolute",
    right: 25,
    bottom: 25,
    width: 60,
    height: 60,
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
  searchContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "transparent",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  sortButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
  },
  dateText: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
});

export default PostedJobsScreen; 