import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Image, Alert } from 'react-native';

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
    <TouchableOpacity 
      style={styles.jobCard}
      onPress={() => navigation.navigate('JobDetails', { job: item })}
    >
      <View style={styles.jobContent}>
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.jobImage} />
        )}
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{item.jobTitle}</Text>
          <Text style={styles.jobPosition}>{item.jobPosition}</Text>
          <Text style={styles.category}>{item.category}</Text>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('UpdateJob', { job: item })}
          style={styles.editButton}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => handleDeleteJob(item.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  jobCard: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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
  },
  jobPosition: {
    fontSize: 16,
    color: '#666',
  },
  category: {
    fontSize: 14,
    color: '#888',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  fabText: {
    fontSize: 24,
    color: 'white',
  },
  jobContent: {
    flex: 1,
    flexDirection: 'row',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#007AFF',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 5,
    borderRadius: 5,
  },
  editButtonText: {
    color: 'white',
    fontSize: 12,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
  },
});

export default PostedJobsScreen; 