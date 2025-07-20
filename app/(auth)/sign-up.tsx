import { useRegister } from '@/hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending, error } = useRegister();

  const handleSignUp = () => {
    mutate(
      {
        full_name: name,
        email,
        phone,
        password,
        password_confirmation: confirmPassword,
      },
      {
        onSuccess: () => {
          router.push('/(tabs)');
        },
        onError: (error: any) => {
          if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            const firstField = Object.keys(errors)[0];
            const firstMessage = errors[firstField][0];

            // tampilkan alert atau toast
            Alert.alert('Validation Error', firstMessage);
          } else {
            Alert.alert('Error', 'Something went wrong');
          }

        }
      }
    );
  };

  return (
    <View className="flex-1 bg-white p-6">
      <View className="items-center mb-8">
        <Image
          source={require('@/assets/images/logo.png')}
          className="w-64 h-64"
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-gray-800">Create Account</Text>
        <Text className="text-gray-600 mt-2">Sign up to get started</Text>
      </View>

      <View className="gap-4">
        <View className="bg-gray-100 rounded-xl px-4 py-3">
          <Text className="text-gray-500 text-sm mb-1">Full Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            autoCapitalize="words"
            className="text-base"
          />
        </View>

        <View className="bg-gray-100 rounded-xl px-4 py-3">
          <Text className="text-gray-500 text-sm mb-1">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            className="text-base"
          />
        </View>

        <View className="bg-gray-100 rounded-xl px-4 py-3">
          <Text className="text-gray-500 text-sm mb-1">Phone Number</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            className="text-base"
          />
        </View>

        <View className="bg-gray-100 rounded-xl px-4 py-3">
          <Text className="text-gray-500 text-sm mb-1">Password</Text>
          <View className="flex-row items-center">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              secureTextEntry={!showPassword}
              className="flex-1 text-base"
            />
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm password"
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
          onPress={handleSignUp}
          className="bg-blue-500 rounded-xl py-4 mt-6"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Create Account
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center mt-8">
        <Text className="text-gray-600">Already have an account? </Text>
        <Link href="/(auth)/sign-in" asChild>
          <TouchableOpacity>
            <Text className="text-blue-500 font-medium">Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <Text className="text-gray-500 text-center text-sm mt-8 px-8">
        By signing up, you agree to our Terms of Service and Privacy Policy
      </Text>
    </View>
  );
}