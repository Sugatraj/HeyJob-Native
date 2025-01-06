import React from 'react';
import { View } from 'react-native';
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

      // Navigate back to category with refresh flag
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
    <View style={{ 
      flex: 1, 
      backgroundColor: '#fff',
      paddingBottom: 80
    }}>
      <JobForm 
        initialValues={job}
        onSubmit={handleSubmit}
        submitButtonText="Update Jobs"
        category={job.category}
      />
    </View>
  );
};

export default UpdateJobScreen; 