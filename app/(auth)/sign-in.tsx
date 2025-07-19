

import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SocialLogin } from '@/types';

const SOCIAL_LOGINS: SocialLogin[] = [
  { id: 'google', name: 'Google', icon: 'logo-google' },
  { id: 'apple', name: 'Apple', icon: 'logo-apple' },
  { id: 'facebook', name: 'Facebook', icon: 'logo-facebook' }
];

export default function SignInScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // Here you would typically validate credentials with your backend
    router.replace('/(tabs)' as const);
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert('Coming Soon', `${provider} login will be available soon!`);
  };

  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <View className="items-center mb-8">
        <Image
          source={require('@/assets/images/travel-booking.png')}
          className="w-32 h-32"
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold mt-4 text-gray-800">Welcome Back!</Text>
        <Text className="text-gray-600 mt-2">Sign in to continue</Text>
      </View>

      <View className="gap-4">
        <View className="bg-gray-100 rounded-xl px-4 py-3">
          <Text className="text-gray-500 text-sm mb-1">Email or Phone</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email or phone"
            keyboardType="email-address"
            autoCapitalize="none"
            className="text-base"
          />
        </View>

        <View className="bg-gray-100 rounded-xl px-4 py-3">
          <Text className="text-gray-500 text-sm mb-1">Password</Text>
          <View className="flex-row items-center">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              className="flex-1 text-base"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          onPress={handleSignIn}
          className="bg-blue-500 rounded-xl py-4 mt-6"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Sign In
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center py-4">
          <Text className="text-blue-500 font-medium">Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-8">
        <View className="flex-row items-center">
          <View className="flex-1 h-[1px] bg-gray-300" />
          <Text className="mx-4 text-gray-500">Or continue with</Text>
          <View className="flex-1 h-[1px] bg-gray-300" />
        </View>

        <View className="flex-row justify-center space-x-6 mt-6">
          {SOCIAL_LOGINS.map((social) => (
            <TouchableOpacity
              key={social.id}
              onPress={() => handleSocialLogin(social.name)}
              className="w-14 h-14 bg-gray-100 rounded-full items-center justify-center"
            >
              <Ionicons name={social.icon} size={28} color="#374151" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="flex-row justify-center mt-8">
        <Text className="text-gray-600">Don't have an account? </Text>
        <Link href="/(auth)/sign-up" asChild>
          <TouchableOpacity>
            <Text className="text-blue-500 font-medium">Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}