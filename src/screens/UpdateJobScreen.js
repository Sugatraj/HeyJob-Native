import React from 'react';
import { View } from 'react-native';
import JobForm from '../components/JobForm';

const UpdateJobScreen = ({ route, navigation }) => {
  const { job } = route.params;

  const handleSubmit = (formData) => {
    // Navigate back with the updated job data
    navigation.navigate('PostedJobs', { 
      updatedJob: {
        ...formData,
        id: job.id // Important: Keep the original job ID
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <JobForm 
        initialValues={job}
        onSubmit={handleSubmit}
        submitButtonText="Update Job"
      />
    </View>
  );
};

export default UpdateJobScreen; 