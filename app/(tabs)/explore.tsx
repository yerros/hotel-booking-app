import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ExploreHotel, RenderExploreHotelCardProps } from '@/types';

const HOTELS: ExploreHotel[] = [
  {
    id: 1,
    name: 'Grand Hotel Plaza',
    city: 'Jakarta',
    price: 1200000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    description: 'Luxury hotel in the heart of Jakarta'
  },
  {
    id: 2,
    name: 'Sunset Beach Resort',
    city: 'Bali',
    price: 1500000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd',
    description: 'Beachfront resort with stunning views'
  },
  {
    id: 3,
    name: 'Mountain View Hotel',
    city: 'Bandung',
    price: 800000,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
    description: 'Peaceful retreat in the mountains'
  },
];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const renderHotelCard = ({ item: hotel }: RenderExploreHotelCardProps) => (
    <Link href={`/(tabs)/hotel/${hotel.id}` as const} asChild>
      <TouchableOpacity className="bg-white rounded-xl overflow-hidden shadow-md mb-4">
        <Image
          source={{ uri: hotel.image }}
          className="w-full h-48"
        />
        <View className="p-4">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="text-xl font-semibold">{hotel.name}</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="location" size={16} color="#6B7280" />
                <Text className="text-gray-500 ml-1">{hotel.city}</Text>
              </View>
            </View>
            <View className="flex-row items-center bg-yellow-100 px-2 py-1 rounded">
              <Text className="text-yellow-500 mr-1">★</Text>
              <Text className="font-semibold">{hotel.rating}</Text>
            </View>
          </View>
          
          <Text className="text-gray-600 mt-2" numberOfLines={2}>
            {hotel.description}
          </Text>
          
          <View className="flex-row justify-between items-center mt-3">
            <Text className="text-blue-500 font-semibold text-lg">
              ${(hotel.price / 15000).toFixed(0)}
            </Text>
            <Text className="text-gray-500">/night</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  const filteredHotels = HOTELS.filter(hotel =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white p-4 shadow-sm">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            placeholder="Search hotels..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-2 text-base"
          />
        </View>
      </View>

      <FlatList<ExploreHotel>
        data={filteredHotels}
        renderItem={renderHotelCard}
        keyExtractor={(hotel) => hotel.id.toString()}
        contentContainerClassName="p-4"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
