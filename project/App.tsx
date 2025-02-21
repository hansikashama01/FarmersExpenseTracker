import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { LinearGradient } from 'expo-linear-gradient'; // For gradient backgrounds
import { StyleSheet, Text } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // Custom header with gradient
          header: ({ navigation, route, options }) => (
            <LinearGradient
              colors={['#4caf50', '#2e7d32']} // Modern green gradient
              style={styles.headerContainer}
            >
              <Text style={styles.headerTitle}>{options.title}</Text>
            </LinearGradient>
          ),
          headerStyle: {
            backgroundColor: 'transparent', // Transparent since gradient is used
          },
          headerTintColor: '#fff', // Text and icon color
          headerTitleStyle: {
            fontSize: 22, // Modern and readable text size
            fontWeight: '700', // Bold for emphasis
          },
        }}
      >
        <Stack.Screen 
          name="Farm Expense Tracker" 
          component={HomeScreen} 
          options={{ title: 'Farm Expense Tracker' }} // Set the app bar title
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 80, // Make the app bar taller for a modern feel
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20, // Add padding for better alignment
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
