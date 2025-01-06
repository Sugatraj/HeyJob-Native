import React from 'react';
import { View } from 'react-native';
import JobForm from '../components/JobForm';
import Toast from 'react-native-toast-message';
import { jobService } from '../services/jobService';

const CreateJobScreen = ({ navigation, route }) => {
  const category = route.params?.category || 'Openings';
  const isEditing = route.params?.job !== undefined;
  const initialValues = isEditing ? route.params.job : { category: category };

  const handleSubmit = async (jobData) => {
    try {
      console.log('Submitting job data:', { ...jobData, category }); // Debug log

      if (isEditing) {
        await jobService.updateJob(jobData.id, {
          ...jobData,
          category: category
        });
      } else {
        await jobService.createJob({
          ...jobData,
          category: category
        });
      }

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: `Job ${isEditing ? 'updated' : 'created'} successfully!`
      });

      // Force a refresh when navigating back
      navigation.navigate('CategoryJobs', {
        category: category,
        refresh: true,
        timestamp: Date.now() // Force refresh
      });
    } catch (error) {
      console.error('Error saving job:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to save job'
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <JobForm 
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitButtonText={isEditing ? 'Update Job' : 'Create Job'}
        category={category}
      />
    </View>
  );
};

export default CreateJobScreen; 