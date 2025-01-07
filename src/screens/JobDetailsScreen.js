import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Linking,
  Share,
  Alert,
  Dimensions,
  Clipboard 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { formatDate } from '../utils/dateUtils';
import { auth } from '../config/firebase';
import { jobService } from '../services/jobService';
import Toast from 'react-native-toast-message';

const formatPackage = (value) => {
  if (!value) return 'Not specified';
  return `${value} LPA`;
};

const socialIcons = [
  { platform: 'whatsapp', color: '#25D366' },
  { platform: 'facebook', color: '#4267B2' },
  { platform: 'linkedin', color: '#0077B5' },
  { platform: 'telegram', color: '#0088cc' },
  { platform: 'instagram', color: '#E1306C' }
];

const JobDetailsScreen = ({ route, navigation }) => {
  const { job } = route.params;
  const isOwner = auth.currentUser?.uid === job.userId;
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const { width } = Dimensions.get('window');
    setIsSmallScreen(width < 380);
  }, []);

  const handleShare = async (platform) => {
    try {
      const shareMessage = `
🔥 *New Job Opening* 🔥

*Position:* ${job.jobTitle}
*Role:* ${job.jobPosition}
*Company:* ${job.companyDetails}
${job.location ? `*Location:* ${job.location}` : ''}
${job.package ? `*Package:* ${formatPackage(job.package)}` : ''}

*Job Description:*
${job.jobDescription}

--------------------------------
📌 Apply now! 
Share this opportunity with your friends who might be interested.

#JobOpening #Career #Opportunity ${job.category ? `#${job.category.replace(/\s+/g, '')}` : ''}
`.trim();

      if (platform) {
        let url = '';
        switch (platform) {
          case 'whatsapp':
            url = `whatsapp://send?text=${encodeURIComponent(shareMessage)}`;
            break;
          case 'facebook':
            url = `fb://share?text=${encodeURIComponent(shareMessage)}`;
            break;
          case 'linkedin':
            url = `linkedin://sharing/share-offsite?subject=${encodeURIComponent(job.jobTitle)}&summary=${encodeURIComponent(shareMessage)}`;
            break;
          case 'telegram':
            url = `tg://msg?text=${encodeURIComponent(shareMessage)}`;
            break;
          case 'instagram':
            url = 'instagram://';
            break;
        }
        const canOpen = await Linking.canOpenURL(url);
        if (canOpen) {
          await Linking.openURL(url);
        } else {
          // If app is not installed, open in browser
          switch (platform) {
            case 'whatsapp':
              await Linking.openURL(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`);
              break;
            case 'facebook':
              await Linking.openURL(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareMessage)}`);
              break;
            case 'linkedin':
              await Linking.openURL(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareMessage)}`);
              break;
            case 'telegram':
              await Linking.openURL(`https://t.me/share/url?url=${encodeURIComponent(shareMessage)}`);
              break;
            case 'instagram':
              await Linking.openURL('https://www.instagram.com');
              break;
          }
        }
      } else {
        await Share.share({
          message: shareMessage,
          title: job.jobTitle,
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to share'
      });
    }
  };

  const handleCopy = async () => {
    try {
      const shareMessage = `
🔥 *New Job Opening* 🔥

*Position:* ${job.jobTitle}
*Role:* ${job.jobPosition}
*Company:* ${job.companyDetails}
${job.location ? `*Location:* ${job.location}` : ''}
${job.package ? `*Package:* ${formatPackage(job.package)}` : ''}

*Job Description:*
${job.jobDescription}

--------------------------------
📌 Apply now! 
Share this opportunity with your friends who might be interested.

#JobOpening #Career #Opportunity ${job.category ? `#${job.category.replace(/\s+/g, '')}` : ''}
`.trim();

      await Clipboard.setString(shareMessage);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Job details copied to clipboard! You can now paste and share.'
      });
    } catch (error) {
      console.error('Error copying:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to copy to clipboard'
      });
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
      
      <View style={styles.shareSection}>
        <View style={styles.socialIconsWrapper}>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.socialIconsContainer,
              isSmallScreen && styles.socialIconsContainerSmall
            ]}
          >
            {socialIcons.map((icon) => (
              <TouchableOpacity
                key={icon.platform}
                style={[
                  styles.iconButton,
                  isSmallScreen && styles.iconButtonSmall
                ]}
                onPress={() => handleShare(icon.platform)}
              >
                <FontAwesome 
                  name={icon.platform} 
                  size={isSmallScreen ? 20 : 24} 
                  color={icon.color}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.copyButtonWrapper}>
          <TouchableOpacity 
            style={[
              styles.copyButton,
              isSmallScreen && styles.copyButtonSmall
            ]} 
            onPress={handleCopy}
          >
            <FontAwesome 
              name="copy" 
              size={isSmallScreen ? 20 : 24} 
              color="#666" 
            />
            {!isSmallScreen && (
              <Text style={styles.copyButtonText}>Copy</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{job.jobTitle}</Text>
            <Text style={styles.position}>{job.jobPosition}</Text>
          </View>
          <TouchableOpacity onPress={() => handleShare()} style={styles.shareButton}>
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
            <Text style={styles.infoText}>{formatDate(job.createdAt)}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="tag" size={20} color="#666" />
            <Text style={styles.infoText}>{job.category}</Text>
          </View>

          {job.package && (
            <View style={styles.infoRow}>
              <FontAwesome name="money" size={20} color="#666" />
              <Text style={styles.infoText}>{formatPackage(job.package)}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Description</Text>
          <Text style={styles.description}>{job.jobDescription}</Text>
        </View>

        {isOwner && (
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.button, styles.editButton]}
              onPress={() => navigation.navigate('CreateJob', { 
                job,
                category: job.category 
              })}
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
  shareSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderRadius: 10,
  },
  socialIconsWrapper: {
    flex: 1,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 8,
  },
  socialIconsContainerSmall: {
    gap: 4,
    paddingRight: 4,
  },
  iconButton: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  iconButtonSmall: {
    padding: 8,
    width: 36,
    height: 36,
  },
  copyButtonWrapper: {
    marginLeft: 'auto',
  },
  copyButton: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 44,
  },
  copyButtonSmall: {
    padding: 8,
    paddingHorizontal: 8,
    height: 36,
  },
  copyButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  content: {
    padding: 20,
    paddingBottom: 0,
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
    marginBottom: 15,
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 5,
    marginBottom: 20,
    paddingHorizontal: 0,
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