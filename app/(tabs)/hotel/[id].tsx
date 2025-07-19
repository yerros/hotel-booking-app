import { Ionicons } from '@expo/vector-icons';
import { Link, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface Room {
  id: number;
  type: string;
  price: number;
  description: string;
  capacity: string;
}

interface Amenity {
  icon: keyof typeof Ionicons.glyphMap;
  name: string;
}

interface HotelDetail {
  id: number;
  name: string;
  city: string;
  address: string;
  rating: number;
  description: string;
  images: string[];
  rooms: Room[];
  amenities: Amenity[];
}

type HotelDetails = {
  [key: number]: HotelDetail;
};

const HOTEL_DETAILS: HotelDetails = {
  1: {
    id: 1,
    name: 'Grand Hotel Plaza',
    city: 'Jakarta',
    address: 'Jl. MH Thamrin No. 123, Jakarta Pusat',
    rating: 4.8,
    description: 'Experience luxury in the heart of Jakarta. Our 5-star hotel offers world-class amenities and exceptional service.',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb'
    ],
    rooms: [
      {
        id: 1,
        type: 'Deluxe Room',
        price: 1200000,
        description: 'Spacious room with city view',
        capacity: '2 Adults'
      },
      {
        id: 2,
        type: 'Executive Suite',
        price: 2500000,
        description: 'Luxury suite with living room',
        capacity: '2 Adults, 2 Children'
      }
    ],
    amenities: [
        { icon: 'wifi-outline', name: 'Free WiFi' },
        { icon: 'car-outline', name: 'Parking' },
        { icon: 'water-outline', name: 'Pool' },
        { icon: 'fitness-outline', name: 'Gym' },
        { icon: 'restaurant-outline', name: 'Restaurant' },
        { icon: 'shirt-outline', name: 'Laundry' }
      ]
  }
};

export default function HotelDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const hotelId = parseInt(id, 10);
  const hotel = HOTEL_DETAILS[hotelId];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!hotel) return null;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(
      e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width
    );
    setActiveImageIndex(newIndex);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Image Carousel */}
      <View className="relative">
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
        >
          {hotel.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              className="w-screen h-72"
            />
          ))}
        </ScrollView>
        
        {/* Image Indicators */}
        <View className="absolute bottom-4 flex-row justify-center w-full space-x-2">
          {hotel.images.map((_, index) => (
            <View
              key={index}
              className={`w-2 h-2 rounded-full ${index === activeImageIndex ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </View>
      </View>

      {/* Hotel Info */}
      <View className="p-4 bg-white">
        <Text className="text-2xl font-bold">{hotel.name}</Text>
        <View className="flex-row items-center mt-2">
          <Ionicons name="location" size={16} color="#6B7280" />
          <Text className="text-gray-500 ml-1">{hotel.address}</Text>
        </View>
        <View className="flex-row items-center mt-2">
          <View className="flex-row items-center bg-yellow-100 px-2 py-1 rounded">
            <Text className="text-yellow-500 mr-1">★</Text>
            <Text className="font-semibold">{hotel.rating}</Text>
          </View>
        </View>
        <Text className="mt-4 text-gray-600 leading-6">{hotel.description}</Text>
      </View>

      {/* Amenities */}
      <View className="mt-2 p-4 bg-white">
        <Text className="text-xl font-semibold mb-4">Amenities</Text>
        <View className="flex-row flex-wrap justify-between">
          {hotel.amenities.map((amenity, index) => (
            <View key={index} className="w-1/3 items-center mb-6">
              <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center">
                <Ionicons name={amenity.icon} size={24} color="#3B82F6" />
              </View>
              <Text className="text-sm text-gray-600 mt-2">{amenity.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Room Options */}
      <View className="mt-2 p-4 bg-white">
        <Text className="text-xl font-semibold mb-4">Available Rooms</Text>
        {hotel.rooms.map((room) => (
          <View key={room.id} className="border border-gray-200 rounded-lg p-4 mb-4 last:mb-0">
            <View className="flex-row justify-between items-start">
              <View>
                <Text className="text-lg font-semibold">{room.type}</Text>
                <Text className="text-gray-500 mt-1">{room.capacity}</Text>
              </View>
              <Text className="text-blue-500 font-semibold">
                Rp {room.price.toLocaleString('id-ID')}
              </Text>
            </View>
            <Text className="text-gray-600 mt-2">{room.description}</Text>
            <Link href={`/(tabs)/booking/${hotel.id}?room=${room.id}` as const} asChild>
              <TouchableOpacity className="bg-blue-500 rounded-lg mt-4 p-3">
                <Text className="text-white text-center font-semibold">Book Now</Text>
              </TouchableOpacity>
            </Link>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
