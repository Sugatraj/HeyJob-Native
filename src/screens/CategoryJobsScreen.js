import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, TextInput, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import JobCard from '../components/JobCard';

const JOBS_DATA = {
  WFH: [
    {
      id: '1',
      jobTitle: 'Remote Developer',
      jobPosition: 'Frontend Developer',
      category: 'WFH',
      date: new Date('2024-03-15'),
      package: '6 LPA',
      companyDetails: 'Tech Corp Inc.',
      jobDescription: 'Looking for an experienced developer...',
    },
    {
      id: '2',
      jobTitle: 'Customer Support',
      jobPosition: 'Support Executive',
      category: 'WFH',
      date: new Date('2024-03-14'),
      package: '4 LPA',
      companyDetails: 'Support Co Ltd.',
      jobDescription: 'Looking for customer support executive...',
    },
  ],
  Internship: [
    {
      id: '3',
      jobTitle: 'Software Intern',
      jobPosition: 'Junior Developer',
      category: 'Internship',
      date: new Date('2024-03-15'),
      package: '25K/month',
      companyDetails: 'Tech Startup',
      jobDescription: 'Looking for passionate interns...',
    },
  ],
  Drive: [
    {
      id: '4',
      jobTitle: 'Campus Drive',
      jobPosition: 'Multiple Positions',
      category: 'Drive',
      date: new Date('2024-03-16'),
      package: '5-8 LPA',
      companyDetails: 'Major Corp',
      jobDescription: 'Campus recruitment drive...',
    },
  ],
  Batches: [
    {
      id: '5',
      jobTitle: 'MERN Stack',
      jobPosition: 'Training Program',
      category: 'Batches',
      date: new Date('2024-03-15'),
      package: '40K',
      companyDetails: 'Tech Academy',
      jobDescription: 'Complete MERN stack training...',
    },
  ],
  Openings: [
    {
      id: '6',
      jobTitle: 'Senior Developer',
      jobPosition: 'Full Stack',
      category: 'Openings',
      date: new Date('2024-03-15'),
      package: '15 LPA',
      companyDetails: 'Enterprise Solutions',
      jobDescription: 'Looking for senior full stack developer...',
    },
  ],
};

const CategoryJobsScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { category } = route.params;
  const [jobs, setJobs] = useState(JOBS_DATA[category] || []);

  // Add new job
  React.useEffect(() => {
    if (route.params?.newJob) {
      setJobs(currentJobs => [...currentJobs, {
        id: String(Date.now()),
        date: new Date(),
        category,
        ...route.params.newJob
      }]);
    }
  }, [route.params?.newJob]);

  // Update existing job
  React.useEffect(() => {
    if (route.params?.updatedJob) {
      setJobs(currentJobs =>
        currentJobs.map(job =>
          job.id === route.params.updatedJob.id ? { ...route.params.updatedJob, date: new Date() } : job
        )
      );
    }
  }, [route.params?.updatedJob]);

  const handleSort = () => {
    setJobs([...jobs].sort((a, b) => new Date(b.date) - new Date(a.date)));
  };

  const filteredJobs = jobs.filter(job => 
    job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.jobPosition.toLowerCase().includes(searchQuery.toLowerCase())
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
          <FontAwesome name="sort" size={24} color="#666" />
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

export default CategoryJobsScreen; 