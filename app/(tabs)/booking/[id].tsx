import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface BookingDetail {
  id: string;
  hotelName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  bookingDate: string;
  bookingNumber: string;
  roomType: string;
  nights: number;
  guestName: string;
  email: string;
  phone: string;
  paymentMethod: string;
  amenities: string[];
}

const BOOKING_DETAILS: { [key: string]: BookingDetail } = {
  '1': {
    id: '1',
    hotelName: 'Grand Luxury Hotel',
    location: 'Jakarta, Indonesia',
    checkIn: '2024-01-15',
    checkOut: '2024-01-18',
    guests: 2,
    totalPrice: 1500000,
    status: 'completed',
    bookingDate: '2024-01-10',
    bookingNumber: 'BK001234567',
    roomType: 'Deluxe Room',
    nights: 3,
    guestName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+62 812 3456 7890',
    paymentMethod: 'Credit Card',
    amenities: ['Free WiFi', 'Breakfast', 'Pool', 'Gym']
  },
  '2': {
    id: '2',
    hotelName: 'Seaside Resort',
    location: 'Bali, Indonesia',
    checkIn: '2024-02-20',
    checkOut: '2024-02-25',
    guests: 4,
    totalPrice: 2800000,
    status: 'confirmed',
    bookingDate: '2024-02-01',
    bookingNumber: 'BK001234568',
    roomType: 'Family Suite',
    nights: 5,
    guestName: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+62 813 4567 8901',
    paymentMethod: 'Bank Transfer',
    amenities: ['Free WiFi', 'Breakfast', 'Beach Access', 'Spa']
  }
};

const getStatusColor = (status: BookingDetail['status']) => {
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

const getStatusText = (status: BookingDetail['status']) => {
  switch (status) {
    case 'confirmed':
      return 'Dikonfirmasi';
    case 'pending':
      return 'Menunggu';
    case 'cancelled':
      return 'Dibatalkan';
    case 'completed':
      return 'Selesai';
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
    month: 'long',
    year: 'numeric'
  });
};

export default function BookingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const booking = BOOKING_DETAILS[id || '1'];

  if (!booking) {
    return (
      <View className="flex-1 justify-center items-center p-5 bg-gray-50">
        <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
        <Text className="text-xl font-bold text-gray-900 mt-4 mb-2">Booking Tidak Ditemukan</Text>
        <Text className="text-base text-gray-500 text-center mb-6">Detail booking yang Anda cari tidak tersedia.</Text>
        <TouchableOpacity className="bg-blue-500 px-6 py-3 rounded-lg" onPress={() => router.back()}>
          <Text className="text-base text-white font-medium">Kembali</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleCancelBooking = () => {
    Alert.alert(
      'Batalkan Booking',
      'Apakah Anda yakin ingin membatalkan booking ini?',
      [
        { text: 'Tidak', style: 'cancel' },
        { text: 'Ya, Batalkan', style: 'destructive', onPress: () => {
          Alert.alert('Booking Dibatalkan', 'Booking Anda telah berhasil dibatalkan.');
        }}
      ]
    );
  };

  const handleContactSupport = () => {
    Alert.alert(
      'Hubungi Support',
      'Anda akan dihubungkan dengan tim customer service kami.',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-15 pb-5 bg-white">
        <TouchableOpacity className="p-2" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900">Detail Booking</Text>
        <View className="w-10" />
      </View>

      {/* Booking Status */}
      <View className="flex-row items-center justify-between px-5 py-4 bg-white border-b border-gray-200">
        <View className="flex-row items-center px-3 py-2 rounded-full" style={{ backgroundColor: getStatusColor(booking.status) + '20' }}>
          <Ionicons name="checkmark-circle" size={20} color={getStatusColor(booking.status)} />
          <Text className="text-sm font-semibold ml-1.5" style={{ color: getStatusColor(booking.status) }}>
            {getStatusText(booking.status)}
          </Text>
        </View>
        <Text className="text-sm text-gray-500 font-medium">#{booking.bookingNumber}</Text>
      </View>

      {/* Hotel Information */}
      <View className="mt-4">
        <Text className="text-lg font-bold text-gray-900 px-5 mb-3">Informasi Hotel</Text>
        <View className="bg-white mx-5 p-4 rounded-xl shadow-sm">
          <Text className="text-xl font-bold text-gray-900 mb-2">{booking.hotelName}</Text>
          <View className="flex-row items-center mb-2">
            <Ionicons name="location-outline" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-500 ml-1">{booking.location}</Text>
          </View>
          <Text className="text-base text-blue-500 font-medium">{booking.roomType}</Text>
        </View>
      </View>

      {/* Booking Details */}
      <View className="mt-4">
        <Text className="text-lg font-bold text-gray-900 px-5 mb-3">Detail Pemesanan</Text>
        <View className="bg-white mx-5 p-4 rounded-xl shadow-sm">
          <View className="flex-row justify-between mb-4">
            <View className="flex-row items-center flex-1">
              <Ionicons name="calendar-outline" size={20} color="#6B7280" />
              <View className="ml-3">
                <Text className="text-xs text-gray-500 mb-0.5">Check-in</Text>
                <Text className="text-sm text-gray-900 font-medium">{formatDate(booking.checkIn)}</Text>
              </View>
            </View>
            <View className="flex-row items-center flex-1">
              <Ionicons name="calendar-outline" size={20} color="#6B7280" />
              <View className="ml-3">
                <Text className="text-xs text-gray-500 mb-0.5">Check-out</Text>
                <Text className="text-sm text-gray-900 font-medium">{formatDate(booking.checkOut)}</Text>
              </View>
            </View>
          </View>
          
          <View className="flex-row justify-between">
            <View className="flex-row items-center flex-1">
              <Ionicons name="time-outline" size={20} color="#6B7280" />
              <View className="ml-3">
                <Text className="text-xs text-gray-500 mb-0.5">Durasi</Text>
                <Text className="text-sm text-gray-900 font-medium">{booking.nights} malam</Text>
              </View>
            </View>
            <View className="flex-row items-center flex-1">
              <Ionicons name="people-outline" size={20} color="#6B7280" />
              <View className="ml-3">
                <Text className="text-xs text-gray-500 mb-0.5">Tamu</Text>
                <Text className="text-sm text-gray-900 font-medium">{booking.guests} orang</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Guest Information */}
      <View className="mt-4">
        <Text className="text-lg font-bold text-gray-900 px-5 mb-3">Informasi Tamu</Text>
        <View className="bg-white mx-5 p-4 rounded-xl shadow-sm">
          <View className="flex-row justify-between mb-4">
            <View className="flex-row items-center flex-1">
              <Ionicons name="person-outline" size={20} color="#6B7280" />
              <View className="ml-3">
                <Text className="text-xs text-gray-500 mb-0.5">Nama Tamu</Text>
                <Text className="text-sm text-gray-900 font-medium">{booking.guestName}</Text>
              </View>
            </View>
            <View className="flex-row items-center flex-1">
              <Ionicons name="mail-outline" size={20} color="#6B7280" />
              <View className="ml-3">
                <Text className="text-xs text-gray-500 mb-0.5">Email</Text>
                <Text className="text-sm text-gray-900 font-medium">{booking.email}</Text>
              </View>
            </View>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="call-outline" size={20} color="#6B7280" />
            <View className="ml-3">
              <Text className="text-xs text-gray-500 mb-0.5">Telepon</Text>
              <Text className="text-sm text-gray-900 font-medium">{booking.phone}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Amenities */}
      <View className="mt-4">
        <Text className="text-lg font-bold text-gray-900 px-5 mb-3">Fasilitas Termasuk</Text>
        <View className="flex-row flex-wrap px-5">
          {booking.amenities.map((amenity, index) => (
            <View key={index} className="bg-blue-50 px-3 py-1.5 rounded-full mr-2 mb-2 flex-row items-center">
              <Ionicons name="checkmark-circle" size={14} color="#10B981" />
              <Text className="text-xs text-blue-600 font-medium ml-1">{amenity}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Payment Information */}
      <View className="mt-4">
        <Text className="text-lg font-bold text-gray-900 px-5 mb-3">Informasi Pembayaran</Text>
        <View className="bg-white mx-5 p-4 rounded-xl shadow-sm">
          <View className="flex-row justify-between mb-4">
            <View className="flex-row items-center flex-1">
              <Ionicons name="card-outline" size={20} color="#6B7280" />
              <View className="ml-3">
                <Text className="text-xs text-gray-500 mb-0.5">Metode Pembayaran</Text>
                <Text className="text-sm text-gray-900 font-medium">{booking.paymentMethod}</Text>
              </View>
            </View>
            <View className="flex-row items-center flex-1">
              <Ionicons name="calendar-outline" size={20} color="#6B7280" />
              <View className="ml-3">
                <Text className="text-xs text-gray-500 mb-0.5">Tanggal Booking</Text>
                <Text className="text-sm text-gray-900 font-medium">{formatDate(booking.bookingDate)}</Text>
              </View>
            </View>
          </View>
          <View className="flex-row justify-between">
            <View className="flex-row items-center flex-1">
              <Ionicons name="wallet-outline" size={20} color="#6B7280" />
              <View className="ml-3">
                <Text className="text-xs text-gray-500 mb-0.5">Total Pembayaran</Text>
                <Text className="text-base text-green-600 font-bold">{formatCurrency(booking.totalPrice)}</Text>
              </View>
            </View>
            <View className="flex-row items-center flex-1">
              <Ionicons name="checkmark-circle-outline" size={20} color="#10B981" />
              <View className="ml-3">
                <Text className="text-xs text-gray-500 mb-0.5">Status Pembayaran</Text>
                <Text className="text-sm text-green-500 font-medium">Lunas</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="px-5 mt-6 mb-8 space-y-3">
        {booking.status === 'confirmed' && (
          <TouchableOpacity className="flex-row items-center justify-center bg-red-50 py-3 px-4 rounded-xl border border-red-200" onPress={handleCancelBooking}>
            <Ionicons name="close-circle-outline" size={20} color="#EF4444" />
            <Text className="text-red-600 font-medium ml-2">Batalkan Booking</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity className="flex-row items-center justify-center bg-blue-500 py-3 px-4 rounded-xl" onPress={handleContactSupport}>
          <Ionicons name="headset-outline" size={20} color="#FFFFFF" />
          <Text className="text-white font-medium ml-2">Hubungi Support</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}