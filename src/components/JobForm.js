import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const JobForm = ({ initialValues = {}, onSubmit, submitButtonText = 'Submit' }) => {
  const [jobData, setJobData] = useState({
    jobTitle: '',
    jobPosition: '',
    category: '',
    companyDetails: '',
    jobDescription: '',
    image: '',
    packageUrl: '',
    ...initialValues
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setJobData({ ...jobData, image: result.assets[0].uri });
    }
  };

  const handleSubmit = () => {
    if (!jobData.jobTitle || !jobData.jobPosition) {
      alert('Please fill in all required fields (Job Title and Position)');
      return;
    }

    const finalJobData = {
      ...jobData,
      image: jobData.image || 'https://picsum.photos/200'
    };

    onSubmit(finalJobData);
  };

  return (
    <ScrollView style={styles.container}>
     
      
      <Text style={styles.label}>
        <Text style={styles.required}>* </Text>
        Job Title
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Job Title"
        value={jobData.jobTitle}
        onChangeText={(text) => setJobData({ ...jobData, jobTitle: text })}
      />
      
      <Text style={styles.label}>
        <Text style={styles.required}>* </Text>
        Job Position
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Job Position"
        value={jobData.jobPosition}
        onChangeText={(text) => setJobData({ ...jobData, jobPosition: text })}
      />
      
      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Category"
        value={jobData.category}
        onChangeText={(text) => setJobData({ ...jobData, category: text })}
      />
      
      <Text style={styles.label}>Company Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Company Details"
        value={jobData.companyDetails}
        onChangeText={(text) => setJobData({ ...jobData, companyDetails: text })}
      />
      
      <Text style={styles.label}>Job Description</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Enter Job Description"
        value={jobData.jobDescription}
        onChangeText={(text) => setJobData({ ...jobData, jobDescription: text })}
        multiline
      />

      <Text style={styles.label}>Image</Text>
      {jobData.image ? (
        <Image source={{ uri: jobData.image }} style={styles.imagePreview} />
      ) : null}
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>
          {jobData.image ? 'Change Image' : 'Pick an image'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>{submitButtonText}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingVertical: 18,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  requiredField: {
    color: '#FF3B30',
    marginBottom: 10,
    fontSize: 14,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  imageButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  imageButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  required: {
    color: '#FF0000',
    fontSize: 16,
  },
});

export default JobForm; 