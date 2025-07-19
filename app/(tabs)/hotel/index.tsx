import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  image: string;
  amenities: string[];
  description: string;
  category: 'luxury' | 'business' | 'budget' | 'resort';
  distance: number;
}

interface RenderHotelCardProps {
  item: Hotel;
}

const HOTELS: Hotel[] = [
  {
    id: '1',
    name: 'Grand Luxury Hotel',
    location: 'Jakarta, Indonesia',
    rating: 4.8,
    price: 500000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant'],
    description: 'Hotel mewah di pusat kota Jakarta dengan fasilitas lengkap',
    category: 'luxury',
    distance: 2.5
  },
  {
    id: '2',
    name: 'Seaside Resort',
    location: 'Bali, Indonesia',
    rating: 4.6,
    price: 800000,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
    amenities: ['WiFi', 'Beach', 'Spa', 'Restaurant'],
    description: 'Resort tepi pantai dengan pemandangan laut yang menakjubkan',
    category: 'resort',
    distance: 15.2
  },
  {
    id: '3',
    name: 'Business Center Hotel',
    location: 'Surabaya, Indonesia',
    rating: 4.4,
    price: 350000,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
    amenities: ['WiFi', 'Meeting Room', 'Gym', 'Restaurant'],
    description: 'Hotel bisnis modern dengan fasilitas meeting lengkap',
    category: 'business',
    distance: 5.8
  },
  {
    id: '4',
    name: 'Budget Inn',
    location: 'Bandung, Indonesia',
    rating: 4.2,
    price: 200000,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400',
    amenities: ['WiFi', 'Parking', 'Restaurant'],
    description: 'Hotel budget dengan lokasi strategis dan fasilitas memadai',
    category: 'budget',
    distance: 8.1
  },
  {
    id: '5',
    name: 'Mountain View Lodge',
    location: 'Bandung, Indonesia',
    rating: 4.7,
    price: 450000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400',
    amenities: ['WiFi', 'Mountain View', 'Restaurant', 'Spa'],
    description: 'Lodge dengan pemandangan gunung yang indah dan udara sejuk',
    category: 'resort',
    distance: 12.3
  },
  {
    id: '6',
    name: 'City Center Hotel',
    location: 'Jakarta, Indonesia',
    rating: 4.3,
    price: 300000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
    amenities: ['WiFi', 'Pool', 'Restaurant', 'Parking'],
    description: 'Hotel di pusat kota dengan akses mudah ke berbagai tempat',
    category: 'business',
    distance: 1.2
  }
];

const CATEGORIES = [
  { id: 'all', name: 'Semua', icon: 'apps-outline' },
  { id: 'luxury', name: 'Mewah', icon: 'diamond-outline' },
  { id: 'business', name: 'Bisnis', icon: 'briefcase-outline' },
  { id: 'budget', name: 'Budget', icon: 'wallet-outline' },
  { id: 'resort', name: 'Resort', icon: 'sunny-outline' }
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Ionicons key={i} name="star" size={12} color="#F59E0B" />);
  }
  
  if (hasHalfStar) {
    stars.push(<Ionicons key="half" name="star-half" size={12} color="#F59E0B" />);
  }
  
  const remainingStars = 5 - Math.ceil(rating);
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={12} color="#D1D5DB" />);
  }
  
  return stars;
};

export default function HotelsScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'distance'>('rating');

  const filteredHotels = HOTELS.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || hotel.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'distance':
        return a.distance - b.distance;
      default:
        return 0;
    }
  });

  const renderHotelCard = ({ item }: RenderHotelCardProps) => (
    <Link href={`/hotel/${item.id}` as const} asChild>
      <TouchableOpacity className="bg-white rounded-xl overflow-hidden shadow-sm">
        <Image source={{ uri: item.image }} className="w-full h-48" resizeMode="cover" />
        <View className="p-4">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-lg font-bold text-gray-900 flex-1 mr-3">{item.name}</Text>
            <View className="items-end">
              <View className="flex-row mb-0.5">
                {renderStars(item.rating)}
              </View>
              <Text className="text-xs text-gray-500 font-medium">{item.rating}</Text>
            </View>
          </View>
          
          <View className="flex-row items-center mb-2">
            <Ionicons name="location-outline" size={14} color="#6B7280" />
            <Text className="text-sm text-gray-500 ml-1">{item.location}</Text>
            <Text className="text-sm text-gray-500 ml-1">• {item.distance} km</Text>
          </View>
          
          <Text className="text-sm text-gray-500 leading-5 mb-3" numberOfLines={2}>
            {item.description}
          </Text>
          
          <View className="flex-row items-center mb-3">
            {item.amenities.slice(0, 3).map((amenity, index) => (
              <View key={index} className="bg-blue-50 px-2 py-1 rounded-xl mr-1.5">
                <Text className="text-xs text-blue-500 font-medium">{amenity}</Text>
              </View>
            ))}
            {item.amenities.length > 3 && (
              <Text className="text-xs text-gray-500 font-medium">+{item.amenities.length - 3}</Text>
            )}
          </View>
          
          <View className="flex-row items-baseline">
            <Text className="text-xs text-gray-500 mr-1.5">Mulai dari</Text>
            <Text className="text-lg font-bold text-green-600">{formatCurrency(item.price)}</Text>
            <Text className="text-xs text-gray-500 ml-0.5">/malam</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="p-5 pt-15 bg-white">
        <Text className="text-3xl font-bold text-gray-900 mb-1">Hotel</Text>
        <Text className="text-base text-gray-500">Temukan hotel terbaik untuk Anda</Text>
      </View>
      
      {/* Search Bar */}
      <View className="px-5 py-4 bg-white border-b border-gray-200">
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
          <Ionicons name="search-outline" size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-3 text-base text-gray-900"
            placeholder="Cari hotel atau lokasi..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#6B7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {/* Categories */}
      <View className="bg-white border-b border-gray-200">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-5 py-4">
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              className={`flex-row items-center px-4 py-2 rounded-full mr-3 ${
                selectedCategory === category.id ? 'bg-blue-500' : 'bg-gray-100'
              }`}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Ionicons
                name={category.icon as keyof typeof Ionicons.glyphMap}
                size={16}
                color={selectedCategory === category.id ? '#FFFFFF' : '#6B7280'}
              />
              <Text
                className={`text-sm font-medium ml-1.5 ${
                  selectedCategory === category.id ? 'text-white' : 'text-gray-500'
                }`}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Sort Options */}
      <View className="flex-row items-center px-5 py-3 bg-white border-b border-gray-200">
        <Text className="text-sm text-gray-500 mr-3">Urutkan:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { key: 'rating', label: 'Rating' },
            { key: 'price', label: 'Harga' },
            { key: 'distance', label: 'Jarak' }
          ].map((option) => (
            <TouchableOpacity
              key={option.key}
              className={`px-3 py-1.5 rounded-2xl mr-2 ${
                sortBy === option.key ? 'bg-blue-50 border border-blue-500' : 'bg-gray-100'
              }`}
              onPress={() => setSortBy(option.key as 'price' | 'rating' | 'distance')}
            >
              <Text
                className={`text-xs font-medium ${
                  sortBy === option.key ? 'text-blue-500' : 'text-gray-500'
                }`}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Results Count */}
      <View className="px-5 py-3 bg-gray-50">
        <Text className="text-sm text-gray-500">
          {filteredHotels.length} hotel ditemukan
        </Text>
      </View>
      
      <FlatList
        data={filteredHotels}
        renderItem={renderHotelCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        className="p-5"
        ItemSeparatorComponent={() => <View className="h-4" />}
      />
    </View>
  );
}