import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';

import { MenuAction, MenuItem, UserData } from '@/types';
import React from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const MENU_ITEMS: MenuItem[] = [
  { icon: 'person-outline', label: 'Personal Information', action: 'profile' },
  { icon: 'calendar-outline', label: 'Booking History', action: 'bookings' },
  { icon: 'card-outline', label: 'Payment Methods', action: 'payments' },
  { icon: 'notifications-outline', label: 'Notifications', action: 'notifications' },
  { icon: 'settings-outline', label: 'Settings', action: 'settings' },
  { icon: 'help-circle-outline', label: 'Help & Support', action: 'support' },
];

const USER_DATA: UserData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+62 812-3456-7890',
  joinDate: 'Member since Jan 2024'
};

export default function ProfileScreen() {
  const queryClient = useQueryClient();

  const handleMenuPress = (action: MenuAction) => {
    // Handle menu item press
    Alert.alert('Coming Soon', `${action} feature will be available soon!`);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          onPress: () => {
           AsyncStorage.removeItem('token');
            router.replace('/(auth)/sign-in' as const);
          },
          style: 'destructive'
        },
      ]
    );
  };

  return (
<SafeAreaView className="flex-1">
      <ScrollView className="flex-1 bg-gray-50">
      {/* Profile Header */}
      <View className="bg-white p-6">
        <View className="items-center">
          <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-4">
            <Ionicons name="person" size={48} color="#3B82F6" />
          </View>
          <Text className="text-2xl font-bold">{USER_DATA.name}</Text>
          <Text className="text-gray-500 mt-1">{USER_DATA.email}</Text>
          <Text className="text-gray-500">{USER_DATA.phone}</Text>
          <Text className="text-blue-500 text-sm mt-2">{USER_DATA.joinDate}</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View className="mt-2 bg-white">
        {MENU_ITEMS.map((item, index) => (
          <TouchableOpacity
            key={item.action}
            onPress={() => handleMenuPress(item.action)}
            className={`flex-row items-center p-4 ${index !== MENU_ITEMS.length - 1 ? 'border-b border-gray-100' : ''}`}
          >
            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
              <Ionicons name={item.icon} size={20} color="#3B82F6" />
            </View>
            <Text className="flex-1 ml-3 text-base font-medium">{item.label}</Text>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <View className="p-4 mt-4">
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 p-4 rounded-lg"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
</SafeAreaView>
  );
}