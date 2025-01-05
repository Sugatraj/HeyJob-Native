import React from 'react';
import { View } from 'react-native';
import JobForm from '../components/JobForm';

const CreateJobScreen = ({ navigation, route }) => {
  const initialCategory = route.params?.category || 'Openings';
  const isEditing = route.params?.job !== undefined;
  const initialValues = isEditing ? route.params.job : { category: initialCategory };

  const handleSubmit = (formData) => {
    if (isEditing) {
      // Update existing job
      navigation.navigate('CategoryJobs', {
        category: formData.category,
        updatedJob: {
          ...formData,
          id: route.params.job.id,
          date: route.params.job.date
        }
      });
    } else {
      // Create new job
      navigation.navigate('CategoryJobs', {
        category: formData.category,
        newJob: {
          ...formData,
          id: Date.now().toString(),
          date: new Date().toLocaleDateString()
        }
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <JobForm 
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitButtonText={isEditing ? 'Update Job' : 'Create Job'}
      />
    </View>
  );
};

export default CreateJobScreen; 