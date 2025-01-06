const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Add AsyncStorage polyfill for web
  config.resolve.alias = {
    ...config.resolve.alias,
    '@react-native-async-storage/async-storage': 'react-native-web/dist/exports/AsyncStorage',
  };
  
  return config;
}; 