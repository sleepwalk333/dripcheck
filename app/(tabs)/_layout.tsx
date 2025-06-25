import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faComments, faCircleUser } from '@fortawesome/free-solid-svg-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
          borderBottomWidth: 0, // <<< entfernt weiße Linie
          shadowColor: 'transparent', // <<< entfernt Schatten (iOS)
          elevation: 0, // <<< entfernt Schatten (Android)
        },
        headerTintColor: 'white',
        tabBarStyle: {
          backgroundColor: 'black',
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#888',
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="Chat"
        options={{
          title: 'AI Stylist',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faComments} size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faSearch} size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faCircleUser} size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
