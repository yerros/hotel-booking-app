import DateTimePicker from '@react-native-community/datetimepicker';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const RECOMMENDED_HOTELS = [
  {
    id: 1,
    name: 'Grand Hotel Plaza',
    city: 'Jakarta',
    price: 1200000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945'
  },
  {
    id: 2,
    name: 'Sunset Beach Resort',
    city: 'Bali',
    price: 1500000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd'
  },
];

export default function HomeScreen() {
  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);

  return (
    <SafeAreaView className='flex-1'>
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-4 bg-white shadow-sm">
          <Text className="text-2xl font-bold mb-4">Find your perfect stay</Text>

          {/* Search Form */}
          <View className="gap-4">
            <View className="bg-gray-100 rounded-lg p-3">
              <TextInput
                placeholder="Enter city or hotel name"
                value={city}
                onChangeText={setCity}
                className="text-base"
              />
            </View>

            {/* Date Pickers */}
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => setShowCheckIn(true)}
                className="flex-1 mr-2 bg-gray-100 p-3 rounded-lg"
              >
                <Text className="text-gray-600">Check-in</Text>
                <Text className="text-base font-semibold">
                  {checkIn.toLocaleDateString()}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowCheckOut(true)}
                className="flex-1 ml-2 bg-gray-100 p-3 rounded-lg"
              >
                <Text className="text-gray-600">Check-out</Text>
                <Text className="text-base font-semibold">
                  {checkOut.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity className="bg-blue-500 p-4 rounded-lg">
              <Text className="text-white text-center font-semibold text-lg">Search Hotels</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recommended Hotels */}
        <View className="p-4">
          <Text className="text-xl font-bold mb-4">Recommended Hotels</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 p-4">
            {RECOMMENDED_HOTELS.map((hotel) => (
              <Link key={hotel.id} href={`/hotel/${hotel.id}`} asChild>
                <TouchableOpacity className="w-72 mr-4 bg-white rounded-xl overflow-hidden shadow-md">
                  <Image
                    source={{ uri: hotel.image }}
                    className="w-full h-48"
                  />
                  <View className="p-3">
                    <Text className="text-lg font-semibold">{hotel.name}</Text>
                    <Text className="text-gray-500">{hotel.city}</Text>
                    <View className="flex-row justify-between items-center mt-2">
                      <Text className="text-blue-500 font-semibold">
                        ${(hotel.price / 15000).toFixed(0)}/night
                      </Text>
                      <View className="flex-row items-center">
                        <Text className="text-yellow-500 mr-1">★</Text>
                        <Text>{hotel.rating}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </ScrollView>
        </View>

        {/* Date Picker Modals */}
        {showCheckIn && (
          <DateTimePicker
            value={checkIn}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowCheckIn(false);
              if (selectedDate) setCheckIn(selectedDate);
            }}
          />
        )}
        {showCheckOut && (
          <DateTimePicker
            value={checkOut}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowCheckOut(false);
              if (selectedDate) setCheckOut(selectedDate);
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}