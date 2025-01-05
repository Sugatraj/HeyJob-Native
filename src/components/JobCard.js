import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { formatDate } from '../utils/dateUtils';
// import * as Clipboard from 'expo-clipboard';

const JobCard = ({ job, onPress }) => {
  const shareMessage = `Job Opening: ${job.jobTitle}\nPosition: ${job.jobPosition}\nPackage: ${job.package}\nCompany: ${job.companyDetails}\n\n${job.jobDescription}`;

  const handleShare = async (platform) => {
    try {
      let url = '';
      switch (platform) {
        case 'whatsapp':
          url = `whatsapp://send?text=${encodeURIComponent(shareMessage)}`;
          break;
        case 'facebook':
          url = `fb://feed?text=${encodeURIComponent(shareMessage)}`;
          break;
        case 'linkedin':
          url = `linkedin://sharing/share-offsite?subject=${encodeURIComponent(job.jobTitle)}&summary=${encodeURIComponent(shareMessage)}`;
          break;
        case 'telegram':
          url = `tg://msg?text=${encodeURIComponent(shareMessage)}`;
          break;
        case 'instagram':
          // Instagram doesn't support direct sharing through URL scheme
          // Opening the app instead
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
            await Linking.openURL(`https://www.facebook.com/dialog/feed?app_id=YOUR_APP_ID&link=&description=${encodeURIComponent(shareMessage)}&redirect_uri=fbconnect://success`);
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
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleCopy = async () => {
    try {
      await Clipboard.setString(shareMessage);
      // You might want to show a toast message here
    } catch (error) {
      console.error('Error copying:', error);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <TouchableOpacity 
          style={styles.jobContent}
          onPress={onPress}
          activeOpacity={0.6}
        >
          <View style={styles.mainContent}>
            <View style={styles.titleSection}>
              <Text style={styles.jobTitle}>{job.jobTitle}</Text>
              <View style={styles.positionRow}>
                <Text style={styles.jobPosition}>{job.jobPosition}</Text>
                <Text style={styles.packageText}>{job.package}</Text>
              </View>
              <Text style={styles.dateText}>{formatDate(job.date)}</Text>
            </View>
          </View>

          <View style={styles.socialIcons}>
            <View style={styles.socialIconsGroup}>
              <TouchableOpacity style={styles.iconContainer} onPress={() => handleShare('whatsapp')}>
                <FontAwesome name="whatsapp" size={26} color="#25D366" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer} onPress={() => handleShare('facebook')}>
                <FontAwesome name="facebook" size={26} color="#4267B2" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer} onPress={() => handleShare('linkedin')}>
                <FontAwesome name="linkedin" size={26} color="#0077B5" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer} onPress={() => handleShare('telegram')}>
                <FontAwesome name="telegram" size={26} color="#0088cc" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer} onPress={() => handleShare('instagram')}>
                <FontAwesome name="instagram" size={26} color="#E1306C" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
              <FontAwesome name="copy" size={26} color="#666" style={styles.copyIcon} />
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
  },
  jobContent: {
    flex: 1,
  },
  mainContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  titleSection: {
    flex: 1,
    marginRight: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  positionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingRight: 1,
    flex: 1,
  },
  jobPosition: {
    fontSize: 16,
    color: "#666",
  },
  packageText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  dateText: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  socialIconsGroup: {
    flexDirection: "row",
    gap: 10,
  },
  iconContainer: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 5,
    width: 60,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  copyButton: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  copyIcon: {
    marginRight: 6,
  },
  copyButtonText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
});

export default JobCard; 