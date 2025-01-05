import React from 'react';
import { View } from 'react-native';
import JobForm from '../components/JobForm';

const CreateJobScreen = ({ navigation }) => {
  const handleSubmit = (formData) => {
    navigation.navigate('PostedJobs', { newJob: formData });
  };

  return (
    <View style={{ flex: 1 }}>
      <JobForm 
        onSubmit={handleSubmit}
        submitButtonText="Post Job"
      />
    </View>
  );
};

export default CreateJobScreen; 