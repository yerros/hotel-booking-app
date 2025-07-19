import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { BookingItem } from '@/types';

const BOOKING_HISTORY: BookingItem[] = [
  {
    id: '1',
    hotelName: 'Grand Luxury Hotel',
    location: 'Jakarta, Indonesia',
    checkIn: '2024-01-15',
    checkOut: '2024-01-18',
    guests: 2,
    totalPrice: 1500000,
    status: 'completed',
    bookingDate: '2024-01-10'
  },
  {
    id: '2',
    hotelName: 'Seaside Resort',
    location: 'Bali, Indonesia',
    checkIn: '2024-02-20',
    checkOut: '2024-02-25',
    guests: 4,
    totalPrice: 2800000,
    status: 'confirmed',
    bookingDate: '2024-02-01'
  },
  {
    id: '3',
    hotelName: 'Mountain View Lodge',
    location: 'Bandung, Indonesia',
    checkIn: '2024-03-10',
    checkOut: '2024-03-12',
    guests: 2,
    totalPrice: 800000,
    status: 'pending',
    bookingDate: '2024-03-05'
  },
  {
    id: '4',
    hotelName: 'City Center Hotel',
    location: 'Surabaya, Indonesia',
    checkIn: '2024-01-25',
    checkOut: '2024-01-27',
    guests: 1,
    totalPrice: 600000,
    status: 'cancelled',
    bookingDate: '2024-01-20'
  }
];

const getStatusColor = (status: BookingItem['status']) => {
  switch (status) {
    case 'confirmed':
      return '#10B981';
    case 'pending':
      return '#F59E0B';
    case 'cancelled':
      return '#EF4444';
    case 'completed':
      return '#6B7280';
    default:
      return '#6B7280';
  }
};

const getStatusText = (status: BookingItem['status']) => {
  switch (status) {
    case 'confirmed':
      return 'Confirmed';
    case 'pending':
      return 'Pending';
    case 'cancelled':
      return 'Cancelled';
    case 'completed':
      return 'Completed';
    default:
      return status;
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export default function BookingsScreen() {
  const renderBookingCard = (booking: BookingItem) => (
    <View key={booking.id} className="bg-white rounded-xl p-4 mb-4 shadow-sm">
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900 mb-1">{booking.hotelName}</Text>
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={14} color="#6B7280" />
            <Text className="text-sm text-gray-500 ml-1">{booking.location}</Text>
          </View>
        </View>
        <View className="px-3 py-1.5 rounded-2xl" style={{ backgroundColor: getStatusColor(booking.status) + '20' }}>
          <Text className="text-xs font-semibold" style={{ color: getStatusColor(booking.status) }}>
            {getStatusText(booking.status)}
          </Text>
        </View>
      </View>
      
      <View className="mb-4">
        <View className="flex-row justify-between mb-3">
          <View className="flex-1 items-start">
            <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            <Text className="text-xs text-gray-500 mt-1 mb-0.5">Check-in</Text>
            <Text className="text-sm text-gray-900 font-medium">{formatDate(booking.checkIn)}</Text>
          </View>
          <View className="flex-1 items-start">
            <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            <Text className="text-xs text-gray-500 mt-1 mb-0.5">Check-out</Text>
            <Text className="text-sm text-gray-900 font-medium">{formatDate(booking.checkOut)}</Text>
          </View>
        </View>
        
        <View className="flex-row justify-between">
          <View className="flex-1 items-start">
            <Ionicons name="people-outline" size={16} color="#6B7280" />
            <Text className="text-xs text-gray-500 mt-1 mb-0.5">Guests</Text>
            <Text className="text-sm text-gray-900 font-medium">{booking.guests} people</Text>
          </View>
          <View className="flex-1 items-start">
            <Ionicons name="card-outline" size={16} color="#6B7280" />
            <Text className="text-xs text-gray-500 mt-1 mb-0.5">Total</Text>
            <Text className="text-sm text-green-600 font-bold">{formatCurrency(booking.totalPrice)}</Text>
          </View>
        </View>
      </View>
      
      <View className="flex-row justify-between items-center pt-4 border-t border-gray-200">
        <Text className="text-xs text-gray-500">
          Booked on {formatDate(booking.bookingDate)}
        </Text>
        <Link href={`/booking/${booking.id}`} asChild>
          <TouchableOpacity className="flex-row items-center">
            <Text className="text-sm text-blue-500 font-medium mr-1">View Details</Text>
            <Ionicons name="chevron-forward" size={16} color="#3B82F6" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-5 pt-15 bg-white">
        <Text className="text-3xl font-bold text-gray-900 mb-1">Booking History</Text>
        <Text className="text-base text-gray-500">Manage and view all your reservations</Text>
      </View>
      
      <View className="flex-row px-5 py-4 bg-white border-b border-gray-200">
        <TouchableOpacity className="px-4 py-2 rounded-full mr-3 bg-blue-500">
          <Text className="text-sm text-white font-medium">All</Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-4 py-2 rounded-full mr-3 bg-gray-100">
          <Text className="text-sm text-gray-500 font-medium">Confirmed</Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-4 py-2 rounded-full mr-3 bg-gray-100">
          <Text className="text-sm text-gray-500 font-medium">Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-4 py-2 rounded-full mr-3 bg-gray-100">
          <Text className="text-sm text-gray-500 font-medium">Completed</Text>
        </TouchableOpacity>
      </View>
      
      <View className="p-5">
        {BOOKING_HISTORY.map(renderBookingCard)}
      </View>
    </ScrollView>
  );
}