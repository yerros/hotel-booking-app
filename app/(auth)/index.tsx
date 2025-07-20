import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    key: 'one',
    title: 'Welcome to StayEasy',
    text: 'Find and book the best hotels with just a few taps.',
    image: require('@/assets/images/travel-booking.png'),
    bg: '#FFFFFF'
  },
  {
    key: 'two',
    title: 'Explore Destinations',
    text: 'Discover new places and exclusive deals for your next trip.',
    image: require('@/assets/images/tourist-map.png'),
    bg: '#FFFFFF'
  },
  {
    key: 'three',
    title: 'Book Instantly',
    text: 'Seamless booking experience, secure and fast.',
    image: require('@/assets/images/booking.png'),
    bg: '#FFFFFF'
  }
];

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#F6F8FB' }}>
      <Swiper
        loop={false}
        dot={<View style={{ backgroundColor: '#D1D5DB', width: 8, height: 8, borderRadius: 4, margin: 4 }} />}
        activeDot={<View style={{ backgroundColor: '#2563EB', width: 24, height: 8, borderRadius: 4, margin: 4 }} />}
        paginationStyle={{ bottom: 60 }}
      >
        {slides.map((slide, idx) => (
          <View key={slide.key} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: slide.bg }}>
            <Image 
              source={slide.image} 
              style={{ width: width * 0.6, height: height * 0.3, resizeMode: 'contain', marginBottom: 40 }} 
            />
            <Text style={{ fontSize: 28, fontWeight: '700', color: '#111827', marginBottom: 16, textAlign: 'center' }}>
              {slide.title}
            </Text>
            <Text style={{ fontSize: 16, color: '#6B7280', marginBottom: 40, textAlign: 'center', paddingHorizontal: 32 }}>
              {slide.text}
            </Text>
            {idx === slides.length - 1 && (
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <Link href="/(auth)/sign-in" asChild>
                  <TouchableOpacity style={{ backgroundColor: '#2563EB', borderRadius: 12, paddingVertical: 16, paddingHorizontal: 32 }}>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>Login</Text>
                  </TouchableOpacity>
                </Link>
                <Link href="/(auth)/sign-in" asChild>
                  <TouchableOpacity style={{ backgroundColor: '#fff', borderRadius: 12, paddingVertical: 16, paddingHorizontal: 32, borderWidth: 1, borderColor: '#2563EB' }}>
                    <Text style={{ color: '#2563EB', fontSize: 18, fontWeight: '600' }}>Sign Up</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            )}
          </View>
        ))}
      </Swiper>
    </View>
  );
}

