import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import CreateJobScreen from './src/screens/CreateJobScreen';
import JobDetailsScreen from './src/screens/JobDetailsScreen';
import UpdateJobScreen from './src/screens/UpdateJobScreen';
import CategoryJobsScreen from './src/screens/CategoryJobsScreen';
import PostedJobsScreen from './src/screens/PostedJobsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
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
        name="HomeScreen" 
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
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            paddingBottom: 5,
            height: 55,
          }
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeStack} 
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            headerShown: true,
            headerTitle: 'Profile',
            headerTitleAlign: 'center',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
} 