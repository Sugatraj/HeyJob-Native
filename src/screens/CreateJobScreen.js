import React from 'react';
import { View, Alert } from 'react-native';
import { collection, addDoc, updateDoc, doc } from '@firebase/firestore';
import { db } from '../config/firebase';
import JobForm from '../components/JobForm';
import Toast from 'react-native-toast-message';

const CreateJobScreen = ({ navigation, route }) => {
  // Get category from navigation params
  const category = route.params?.category || 'Openings';
  const isEditing = route.params?.job !== undefined;
  const initialValues = isEditing ? route.params.job : { category: category };

  const handleSubmit = async (jobData) => {
    try {
      if (isEditing) {
        // Update existing document
        const jobRef = doc(db, 'jobs', jobData.id);
        await updateDoc(jobRef, {
          ...jobData,
          category: category, // Ensure category is preserved
          updatedAt: new Date().toISOString()
        });
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Job updated successfully!'
        });
      } else {
        // Create new document with specified category
        await addDoc(collection(db, 'jobs'), {
          ...jobData,
          category: category, // Set the category from route params
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Job created successfully!'
        });
      }
      
      // Navigate back to the specific category with refresh flag
      navigation.navigate('CategoryJobs', {
        category: category,
        refresh: true
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
        category={category} // Pass category to form
      />
    </View>
  );
};

export default CreateJobScreen; 