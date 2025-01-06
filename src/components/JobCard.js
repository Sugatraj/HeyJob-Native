import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const JobCard = ({ job, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>{job.jobTitle}</Text>
          <Text style={styles.category}>{job.category}</Text>
        </View>
        
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <FontAwesome name="building" size={16} color="#666" />
            <Text style={styles.detailText}>{job.companyDetails}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <FontAwesome name="briefcase" size={16} color="#666" />
            <Text style={styles.detailText}>{job.jobPosition}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <FontAwesome name="money" size={16} color="#666" />
            <Text style={styles.detailText}>{job.package}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  category: {
    fontSize: 14,
    color: '#007AFF',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
  },
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
});

export default JobCard; 