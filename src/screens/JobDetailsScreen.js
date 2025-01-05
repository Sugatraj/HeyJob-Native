import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';

const JobDetailsScreen = ({ route, navigation }) => {
  const { job } = route.params;

  const openUrl = async () => {
    if (await Linking.canOpenURL(job.packageUrl)) {
      await Linking.openURL(job.packageUrl);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {job.image && (
        <Image source={{ uri: job.image }} style={styles.image} />
      )}
      
      <View style={styles.content}>
        <Text style={styles.title}>{job.jobTitle}</Text>
        <Text style={styles.position}>{job.jobPosition}</Text>
        
        <Text style={styles.sectionTitle}>Company Details</Text>
        <Text style={styles.text}>{job.companyDetails}</Text>
        
        <Text style={styles.sectionTitle}>Job Description</Text>
        <Text style={styles.text}>{job.jobDescription}</Text>
        
        <Text style={styles.category}>Category: {job.category}</Text>
        
        <TouchableOpacity style={styles.button} onPress={openUrl}>
          <Text style={styles.buttonText}>View Package Details</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate('CreateJob', { job, category: job.category })}
        >
          <Text style={styles.buttonText}>Edit Job</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  position: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginTop: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JobDetailsScreen; 