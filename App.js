import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import CreateJobScreen from './src/screens/CreateJobScreen';
import JobDetailsScreen from './src/screens/JobDetailsScreen';
import UpdateJobScreen from './src/screens/UpdateJobScreen';
import CategoryJobsScreen from './src/screens/CategoryJobsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import Toast, { BaseToast } from 'react-native-toast-message';
import { Platform } from 'react-native';
import AllOpeningsScreen from './src/screens/AllOpeningsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const auth = getAuth();

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#00C851',
        marginBottom: 40,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: '500'
      }}
      text2Style={{
        fontSize: 13
      }}
    />
  ),
  error: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#ff4444',
        marginBottom: 40,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: '500'
      }}
      text2Style={{
        fontSize: 13
      }}
    />
  ),
};

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
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
        options={{ 
          title: 'Hey Job',
        }}
      />
      <Stack.Screen 
        name="AllOpenings" 
        component={AllOpeningsScreen}
        options={{ 
          title: 'All Openings',
        }}
      />
      <Stack.Screen 
        name="CategoryJobs" 
        component={CategoryJobsScreen}
        options={({ route }) => ({ 
          title: `${route.params.category} Jobs`,
        })}
      />
      <Stack.Screen 
        name="CreateJob" 
        component={CreateJobScreen} 
        options={({ route }) => ({ 
          title: route.params?.job ? 'Edit Job' : 'Create New Job',
        })}
      />
      <Stack.Screen 
        name="JobDetails" 
        component={JobDetailsScreen} 
        options={{ 
          title: 'Job Details',
        }}
      />
      <Stack.Screen 
        name="UpdateJob" 
        component={UpdateJobScreen} 
        options={{ 
          title: 'Update Job',
        }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          paddingBottom: 5,
          height: 55,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AllOpeningsTab"
        component={AllOpeningsScreen}
        options={{
          headerShown: true,
          title: "All Openings",
          headerTitleAlign: "center",
          tabBarLabel: "All Openings",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="briefcase" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          title: "Profile",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer
      documentTitle={{
        formatter: (options, route) => 
          `${options?.title ?? route?.name} - HeyJob`,
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={TabNavigator} />
        ) : (
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ 
                title: 'Login',
                headerShown: true,
                headerTitleAlign: 'center'
              }}
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen}
              options={{ 
                title: 'Create Account',
                headerShown: true,
                headerTitleAlign: 'center'
              }}
            />
          </>
        )}
      </Stack.Navigator>
      <Toast 
        config={toastConfig}
        position='bottom'
        bottomOffset={20}
        visibilityTime={2000}
      />
    </NavigationContainer>
  );
} 