import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Alert,
  ActivityIndicator
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { auth } from '../config/firebase';
import { doc, getDoc } from '@firebase/firestore';
import { db } from '../config/firebase';
import { authService } from '../services/authService';

const ProfileScreen = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authDetails, setAuthDetails] = useState(null);

  useEffect(() => {
    loadUserProfile();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setAuthDetails({
        email: currentUser.email,
        emailVerified: currentUser.emailVerified,
        createdAt: currentUser.metadata.creationTime,
        lastLogin: currentUser.metadata.lastSignInTime,
      });
    }
  }, []);

  const loadUserProfile = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserProfile({
            id: user.uid,
            email: user.email,
            ...userDoc.data()
          });
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      Alert.alert('Error', 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await authService.logout();
              // Navigation will be handled by the auth state listener in App.js
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout');
            }
          },
          style: 'destructive'
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <FontAwesome name="user-circle" size={80} color="#007AFF" />
          </View>
          {/* <Text style={styles.name}>{userProfile?.fullName || 'User'}</Text> */}
          <Text style={styles.email}>{authDetails?.email}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <View style={styles.infoRow}>
            <FontAwesome name="envelope" size={20} color="#666" />
            <Text style={styles.infoText}>{authDetails?.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome name="check-circle" size={20} color={authDetails?.emailVerified ? "#4CAF50" : "#FF3B30"} />
            <Text style={styles.infoText}>
              {authDetails?.emailVerified ? 'Email Verified' : 'Email Not Verified'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome name="clock-o" size={20} color="#666" />
            <Text style={styles.infoText}>
              Last Login: {new Date(authDetails?.lastLogin).toLocaleString()}
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <FontAwesome name="sign-out" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    gap: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default ProfileScreen; 