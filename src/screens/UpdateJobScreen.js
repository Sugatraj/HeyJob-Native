import React from 'react';
import { View } from 'react-native';
import JobForm from '../components/JobForm';

const UpdateJobScreen = ({ route, navigation }) => {
  const { job } = route.params;

  const handleSubmit = (formData) => {
    // Here you would typically update the data in your backend
    console.log('Updated Job Data:', formData);
    // Navigate back to the job details
    navigation.goBack();
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