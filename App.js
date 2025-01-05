import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PostedJobsScreen from './src/screens/PostedJobsScreen';
import CreateJobScreen from './src/screens/CreateJobScreen';
import JobDetailsScreen from './src/screens/JobDetailsScreen';
import UpdateJobScreen from './src/screens/UpdateJobScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="PostedJobs" 
          component={PostedJobsScreen} 
          options={{ title: 'Posted Jobs' }}
        />
        <Stack.Screen 
          name="CreateJob" 
          component={CreateJobScreen} 
          options={{ title: 'Create New Job' }}
        />
        <Stack.Screen 
          name="JobDetails" 
          component={JobDetailsScreen} 
          options={{ title: 'Job Details' }}
        />
        <Stack.Screen 
          name="UpdateJob" 
          component={UpdateJobScreen} 
          options={{ title: 'Update Job' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 