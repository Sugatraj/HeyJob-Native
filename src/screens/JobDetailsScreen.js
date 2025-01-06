import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Linking,
  Share,
  Alert 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { formatDate } from '../utils/dateUtils';
import { auth } from '../config/firebase';
import { jobService } from '../services/jobService';
import Toast from 'react-native-toast-message';

const JobDetailsScreen = ({ route, navigation }) => {
  const { job } = route.params;
  const isOwner = auth.currentUser?.uid === job.userId;

  const handleShare = async () => {
    try {
      const shareMessage = `
Job Opening: ${job.jobTitle}
Position: ${job.jobPosition}
Company: ${job.companyDetails}
Location: ${job.location || 'Not specified'}

${job.jobDescription}

Package Details: ${job.packageUrl || 'Not specified'}
      `.trim();

      await Share.share({
        message: shareMessage,
        title: job.jobTitle,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Job',
      'Are you sure you want to delete this job? This action cannot be undone.',
      [
        { 
          text: 'Cancel', 
          style: 'cancel' 
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await jobService.deleteJob(job.id);
              Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Job deleted successfully'
              });
              navigation.navigate('CategoryJobs', {
                category: job.category,
                refresh: true,
                timestamp: Date.now()
              });
            } catch (error) {
              console.error('Error deleting job:', error);
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to delete job'
              });
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {job.image && (
        <Image source={{ uri: job.image }} style={styles.image} />
      )}
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{job.jobTitle}</Text>
            <Text style={styles.position}>{job.jobPosition}</Text>
          </View>
          <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
            <FontAwesome name="share-alt" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <FontAwesome name="building" size={20} color="#666" />
            <Text style={styles.infoText}>{job.companyDetails}</Text>
          </View>

          {job.location && (
            <View style={styles.infoRow}>
              <FontAwesome name="map-marker" size={20} color="#666" />
              <Text style={styles.infoText}>{job.location}</Text>
            </View>
          )}

          <View style={styles.infoRow}>
            <FontAwesome name="calendar" size={20} color="#666" />
            <Text style={styles.infoText}>Posted {formatDate(job.createdAt)}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="tag" size={20} color="#666" />
            <Text style={styles.infoText}>Category: {job.category}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Description</Text>
          <Text style={styles.description}>{job.jobDescription}</Text>
        </View>
        
        {job.packageUrl && (
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => Linking.openURL(job.packageUrl)}
          >
            <FontAwesome name="external-link" size={20} color="#fff" />
            <Text style={styles.linkButtonText}>View Package Details</Text>
          </TouchableOpacity>
        )}

        {isOwner && (
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.button, styles.editButton]}
              onPress={() => navigation.navigate('UpdateJob', { job })}
            >
              <FontAwesome name="edit" size={20} color="#fff" />
              <Text style={styles.buttonText}>Edit Job</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.deleteButton]}
              onPress={handleDelete}
            >
              <FontAwesome name="trash" size={20} color="#fff" />
              <Text style={styles.buttonText}>Delete Job</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  position: {
    fontSize: 18,
    color: '#666',
  },
  shareButton: {
    padding: 10,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#444',
    marginLeft: 12,
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  linkButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  linkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  editButton: {
    backgroundColor: '#28a745',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JobDetailsScreen; 