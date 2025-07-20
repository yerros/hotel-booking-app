// Hotel related types
export interface Hotel {
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

export interface ExploreHotel {
  id: number;
  name: string;
  city: string;
  price: number;
  rating: number;
  image: string;
  description: string;
}

export interface RenderHotelCardProps {
  item: Hotel;
}

export interface RenderExploreHotelCardProps {
  item: ExploreHotel;
}

// Room and Hotel Detail types
export interface Room {
  id: number;
  type: string;
  price: number;
  description: string;
  capacity: string;
}

export interface Amenity {
  icon: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
  name: string;
}

export interface HotelDetail {
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

export type HotelDetails = {
  [key: number]: HotelDetail;
};

// Booking related types
export interface BookingItem {
  id: string;
  hotelName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  bookingDate: string;
}

export interface BookingDetail {
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

// Profile related types
export type MenuAction = 'profile' | 'bookings' | 'payments' | 'notifications' | 'settings' | 'support';

export interface MenuItem {
  icon: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
  label: string;
  action: MenuAction;
}

export interface UserData {
  name: string;
  email: string;
  phone: string;
  joinDate: string;
}

// Component types
export type ThemedViewProps = import('react-native').ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export type ThemedTextProps = import('react-native').TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export type ExternalLinkProps = Omit<import('react').ComponentProps<typeof import('expo-router').Link>, 'href'> & { 
  href: import('expo-router').Href & string 
};

// Auth related types
export interface SocialLogin {
  id: string;
  name: string;
  icon: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
}

// ParallaxScrollView types
export type ParallaxScrollViewProps = import('react').PropsWithChildren<{
  headerImage: import('react').ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

// IconSymbol types
export type IconMapping = Record<import('expo-symbols').SymbolViewProps['name'], import('react').ComponentProps<typeof import('@expo/vector-icons/MaterialIcons').default>['name']>;
export type IconSymbolName = 'house.fill' | 'paperplane.fill' | 'chevron.left.forwardslash.chevron.right' | 'chevron.right';

export interface IconSymbolProps {
  name: IconSymbolName;
  size?: number;
  color: string | import('react-native').OpaqueColorValue;
  style?: import('react-native').StyleProp<import('react-native').TextStyle>;
  weight?: import('expo-symbols').SymbolWeight;
}

export interface Customer {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  profile_image_url: string;
}