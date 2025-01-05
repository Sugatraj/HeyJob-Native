import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import CreateJobScreen from './src/screens/CreateJobScreen';
import JobDetailsScreen from './src/screens/JobDetailsScreen';
import UpdateJobScreen from './src/screens/UpdateJobScreen';
import CategoryJobsScreen from './src/screens/CategoryJobsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Hey Job' }}
        />
        <Stack.Screen 
          name="CategoryJobs" 
          component={CategoryJobsScreen}
          options={({ route }) => ({ 
            title: route.params.title 
          })}
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