import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import JobCard from '../components/JobCard';

// Dummy data for each category
const DUMMY_JOBS = {
  WFH: [
    {
      id: 'wfh1',
      jobTitle: 'Remote Developer',
      jobPosition: 'Frontend Developer',
      category: 'WFH',
      package: '6 LPA',
      date: '2024-03-15',
      companyDetails: 'TechCo Remote',
    },
    {
      id: 'wfh2',
      jobTitle: 'Customer Support',
      jobPosition: 'Support Executive',
      category: 'WFH',
      package: '4 LPA',
      date: '2024-03-14',
      companyDetails: 'ServiceHub Inc',
    },
  ],
  Internship: [
    {
      id: 'int1',
      jobTitle: 'Summer Intern',
      jobPosition: 'Web Developer',
      category: 'Internship',
      package: '25K/month',
      date: '2024-03-15',
      companyDetails: 'StartupX',
    },
    {
      id: 'int2',
      jobTitle: 'Marketing Intern',
      jobPosition: 'Digital Marketing',
      category: 'Internship',
      package: '20K/month',
      date: '2024-03-13',
      companyDetails: 'GrowthCo',
    },
  ],
  Drive: [
    {
      id: 'drv1',
      jobTitle: 'Campus Drive',
      jobPosition: 'Graduate Engineer',
      category: 'Drive',
      package: '4.5 LPA',
      date: '2024-03-20',
      companyDetails: 'TechGiant Corp',
    },
    {
      id: 'drv2',
      jobTitle: 'Placement Drive',
      jobPosition: 'Software Engineer',
      category: 'Drive',
      package: '5 LPA',
      date: '2024-03-18',
      companyDetails: 'InnovateX',
    },
  ],
  Batches: [
    {
      id: 'bat1',
      jobTitle: 'MERN Stack',
      jobPosition: 'Training Program',
      category: 'Batches',
      package: '30K/batch',
      date: '2024-03-15',
      companyDetails: 'CodeAcademy',
    },
    {
      id: 'bat2',
      jobTitle: 'Data Science',
      jobPosition: 'Certificate Course',
      category: 'Batches',
      package: '40K/batch',
      date: '2024-03-16',
      companyDetails: 'DataLabs',
    },
  ],
  Openings: [
    {
      id: 'op1',
      jobTitle: 'Senior Developer',
      jobPosition: 'Full Stack',
      category: 'Openings',
      package: '12 LPA',
      date: '2024-03-15',
      companyDetails: 'TechPro Solutions',
    },
    {
      id: 'op2',
      jobTitle: 'Product Manager',
      jobPosition: 'Technical PM',
      category: 'Openings',
      package: '15 LPA',
      date: '2024-03-14',
      companyDetails: 'ProductX Inc',
    },
  ],
};

const CategoryJobsScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const [jobs, setJobs] = useState(DUMMY_JOBS[category] || []);

  // Handle new job
  React.useEffect(() => {
    if (route.params?.newJob) {
      setJobs(currentJobs => [...currentJobs, route.params.newJob]);
    }
  }, [route.params?.newJob]);

  // Handle updated job
  React.useEffect(() => {
    if (route.params?.updatedJob) {
      setJobs(currentJobs =>
        currentJobs.map(job =>
          job.id === route.params.updatedJob.id ? route.params.updatedJob : job
        )
      );
    }
  }, [route.params?.updatedJob]);

  // Handle delete job
  const handleDeleteJob = (jobId) => {
    Alert.alert(
      "Delete Job",
      "Are you sure you want to delete this job?",
      [
        { text: "Cancel", style: "cancel" },
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

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        renderItem={({ item }) => (
          <JobCard 
            job={item}
            onPress={() => navigation.navigate('JobDetails', { job: item })}
            onDelete={() => handleDeleteJob(item.id)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
      
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('CreateJob', { category })}
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
  listContent: {
    padding: 16,
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

export default CategoryJobsScreen; 