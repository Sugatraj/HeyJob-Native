import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const PostedJobsScreen = ({ navigation, route }) => {
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

  const renderJobItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <TouchableOpacity 
          style={styles.jobContent}
          onPress={() => navigation.navigate('JobDetails', { job: item })}
          activeOpacity={0.6}
        >
         
          <View style={styles.jobInfo}>
            <Text style={styles.jobTitle}>{item.jobTitle}</Text>
            <Text style={styles.jobPosition}>{item.jobPosition}</Text>
            <Text style={styles.category}>{item.category}</Text>
          </View>
        </TouchableOpacity>
{/*         
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('UpdateJob', { job: item })}
            style={styles.editButton}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => handleDeleteJob(item.id)}
            style={styles.deleteButton}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        renderItem={renderJobItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('CreateJob')}
      >
        <FontAwesome name="plus" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light gray background
    padding: 10,
  },
  cardContainer: {
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },
  jobContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  jobPosition: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  category: {
    fontSize: 14,
    color: '#888',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4CAF50', // Green color
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default PostedJobsScreen; 