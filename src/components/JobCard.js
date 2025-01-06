import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Linking, 
  Alert,
  useWindowDimensions,
  Clipboard,
  ScrollView 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { formatDate } from '../utils/dateUtils';

const formatPackage = (value) => {
  if (!value) return '';
  return `${value} LPA`;
};

const JobCard = ({ job, onPress }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

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

  const handleShare = async (platform) => {
    try {
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
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleCopy = async () => {
    try {
      await Clipboard.setString(shareMessage);
      Alert.alert('Success', 'Job details copied to clipboard! You can now paste and share.');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      Alert.alert('Error', 'Failed to copy to clipboard');
    }
  };

  const socialIcons = [
    { platform: 'whatsapp', color: '#25D366' },
    { platform: 'facebook', color: '#4267B2' },
    { platform: 'linkedin', color: '#0077B5' },
    { platform: 'telegram', color: '#0088cc' },
    { platform: 'instagram', color: '#E1306C' }
  ];

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
                {job.package && (
                  <Text style={styles.packageText}>
                    <FontAwesome name="money" size={14} color="#666" /> {formatPackage(job.package)}
                  </Text>
                )}
              </View>
              <Text style={styles.dateText}>{formatDate(job.createdAt)}</Text>
            </View>
          </View>

          <View style={styles.socialIcons}>
            <ScrollView 
              horizontal={isMobile}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.socialIconsGroup}
            >
              {socialIcons.map((icon) => (
                <TouchableOpacity
                  key={icon.platform}
                  style={styles.iconContainer}
                  onPress={() => handleShare(icon.platform)}
                >
                  <FontAwesome 
                    name={icon.platform} 
                    size={26} 
                    color={icon.color}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <TouchableOpacity 
              style={styles.copyButton} 
              onPress={handleCopy}
            >
              <FontAwesome 
                name="copy" 
                size={26} 
                color="#666" 
                style={styles.copyIcon}
              />
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
  locationText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  socialIconsGroup: {
    flexDirection: 'row',
    flexGrow: 1,
    gap: 8,
    flexWrap: 'wrap',
  },
  iconContainer: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 5,
    minWidth: 50,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    marginLeft: 8,
  },
  copyIcon: {
    marginRight: 6,
  },
  copyButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  jobImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  packageText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
});

export default JobCard; 