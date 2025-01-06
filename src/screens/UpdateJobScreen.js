import React from 'react';
import { View, StyleSheet } from 'react-native';
import JobForm from '../components/JobForm';
import { jobService } from '../services/jobService';
import Toast from 'react-native-toast-message';

const UpdateJobScreen = ({ route, navigation }) => {
  const { job } = route.params;

  const handleSubmit = async (formData) => {
    try {
      await jobService.updateJob(job.id, {
        ...formData,
        category: job.category
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Job updated successfully!'
      });

      navigation.navigate('CategoryJobs', {
        category: job.category,
        refresh: true,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error updating job:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update job'
      });
    }
  };

  return (
    <View style={styles.container}>
      <JobForm 
        initialValues={job}
        onSubmit={handleSubmit}
        submitButtonText="Update Job"
        category={job.category}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  }
});

export default UpdateJobScreen; 