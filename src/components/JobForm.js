import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

const CATEGORY_OPTIONS = [
  { label: 'WFH', value: 'WFH' },
  { label: 'Internship', value: 'Internship' },
  { label: 'Drive', value: 'Drive' },
  { label: 'Batches', value: 'Batches' },
  { label: 'Openings', value: 'Openings' },
];

const JobForm = ({ initialValues, onSubmit, submitButtonText, category }) => {
  const [formData, setFormData] = useState({
    jobTitle: initialValues?.jobTitle || '',
    jobPosition: initialValues?.jobPosition || '',
    companyDetails: initialValues?.companyDetails || '',
    package: initialValues?.package || '',
    jobDescription: initialValues?.jobDescription || '',
    category: category || initialValues?.category || 'Openings'
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
      setFormData({ ...formData, image: result.assets[0].uri });
    }
  };

  const handleSubmit = () => {
    if (!formData.jobTitle || !formData.jobPosition || !formData.companyDetails) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    onSubmit({
      ...formData,
      category: category
    });
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
        value={formData.jobTitle}
        onChangeText={(text) => setFormData({ ...formData, jobTitle: text })}
      />
      
      <Text style={styles.label}>
        <Text style={styles.required}>* </Text>
        Job Position
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Job Position"
        value={formData.jobPosition}
        onChangeText={(text) => setFormData({ ...formData, jobPosition: text })}
      />
      
      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={formData.category}
          onValueChange={(value) => setFormData({ ...formData, category: value })}
        >
          <Picker.Item label="Select Category" value="" enabled={false} />
          {CATEGORY_OPTIONS.map((option) => (
            <Picker.Item 
              key={option.value} 
              label={option.label} 
              value={option.value}
            />
          ))}
        </Picker>
      </View>
      
      <Text style={styles.label}>Company Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Company Details"
        value={formData.companyDetails}
        onChangeText={(text) => setFormData({ ...formData, companyDetails: text })}
      />
      
      <Text style={styles.label}>Job Description</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Enter Job Description"
        value={formData.jobDescription}
        onChangeText={(text) => setFormData({ ...formData, jobDescription: text })}
        multiline
      />

      <Text style={styles.label}>Image</Text>
      {formData.image ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: formData.image }} style={styles.imagePreview} />
          <TouchableOpacity 
            style={styles.removeImageButton}
            onPress={() => setFormData({ ...formData, image: '' })}
          >
            <Text style={styles.removeImageText}>×</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>
          {formData.image ? 'Change Image' : 'Pick an image'}
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
  imageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  imagePreview: {
    width: '100%',
    height: 200,
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
  removeImageButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default JobForm; 