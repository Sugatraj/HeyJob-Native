import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageComponent = ({ source, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={source}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageComponent; 