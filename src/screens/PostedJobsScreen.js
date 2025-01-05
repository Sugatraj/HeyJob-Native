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
          <View style={styles.mainContent}>
            <View style={styles.titleSection}>
              <Text style={styles.jobTitle}>{item.jobTitle}</Text>
              <Text style={styles.jobPosition}>{item.jobPosition}</Text>
            </View>
            
            <View style={styles.packageSection}>
              <Text style={styles.packageText}>3.5 LPA</Text>
            </View>
          </View>

          <View style={styles.socialIcons}>
            <View style={styles.socialIconsGroup}>
              <TouchableOpacity style={styles.iconContainer}>
                <FontAwesome name="whatsapp" size={20} color="#25D366" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <FontAwesome name="facebook" size={20} color="#4267B2" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <FontAwesome name="twitter" size={20} color="#1DA1F2" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <FontAwesome name="linkedin" size={20} color="#0077B5" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <FontAwesome name="telegram" size={20} color="#0088cc" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <FontAwesome name="instagram" size={20} color="#E1306C" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.copyButton}>
              <FontAwesome name="copy" size={16} color="#666" style={styles.copyIcon} />
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
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
    flex: 1,
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  titleSection: {
    flex: 1,
    marginRight: 10,
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
  packageSection: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  packageText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  socialIconsGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  iconContainer: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 5,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyIcon: {
    marginRight: 6,
  },
  copyButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
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