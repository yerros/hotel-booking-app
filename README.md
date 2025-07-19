# Hotel Booking App 🏨

A mobile application for hotel booking built with React Native and Expo, using NativeWind for consistent and modern styling.

## ✨ Key Features

### 🏠 **Home & Navigation**
- Main dashboard with intuitive tab navigation
- Modern and responsive UI/UX design

### 🏨 **Hotel Management**
- **Hotel Listing**: Browse hotel collection with complete information
- **Search & Filter**: Search hotels by name, location, and category
- **Sorting**: Sort by rating, price, or distance
- **Hotel Details**: Complete hotel information with amenities and pricing

### 📋 **Booking System**
- **Booking List**: Manage all reservations in one place
- **Status Filter**: Filter bookings by status (confirmed, pending, cancelled)
- **Booking Details**: Complete booking information including:
  - Booking status with colored badges
  - Hotel and room information
  - Check-in/check-out details
  - Guest information and contact
  - Included amenities
  - Payment information
  - Cancel booking and contact support actions

### 👤 **User Features**
- **Profile**: Manage user information
- **Explore**: Discover destinations and offers
- **Authentication**: Login and registration system (structure ready)

## 🛠️ Technology Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router with file-based routing
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Icons**: Expo Vector Icons (Ionicons)
- **Language**: TypeScript for type safety
- **Development**: Hot reload and fast refresh

## 📱 App Structure

```
app/
├── (tabs)/                 # Tab navigation
│   ├── index.tsx          # Home screen
│   ├── hotels.tsx         # Hotel listing
│   ├── bookings.tsx       # Booking list
│   ├── explore.tsx        # Explore screen
│   ├── profile.tsx        # User profile
│   ├── booking/[id].tsx   # Booking detail
│   └── hotel/[id].tsx     # Hotel detail
├── (auth)/                # Authentication
└── +not-found.tsx         # 404 page
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or newer)
- npm or yarn
- Expo CLI

### Installation

```bash
# Clone repository
git clone <repository-url>
cd hotel-booking-app

# Install dependencies
npm install

# Start development server
npx expo start
```

### Development

```bash
# Run on iOS simulator
npx expo start --ios

# Run on Android emulator
npx expo start --android

# Run on web
npx expo start --web
```

## 📋 Data Structure

The application uses mock data with the following structure:

- **Hotels**: Hotel information with ratings, amenities, and pricing
- **Bookings**: Booking details with status and complete information
- **Users**: User data and preferences

## 🎨 Design System

- **Colors**: Consistent color palette with blue and gray theme
- **Typography**: Clear text hierarchy with various sizes
- **Components**: Reusable component library
- **Spacing**: Consistent spacing system using Tailwind

## 📦 Dependencies

- `expo` - React Native development platform
- `expo-router` - File-based navigation
- `nativewind` - Tailwind CSS for React Native
- `@expo/vector-icons` - Icon library
- `react-native-safe-area-context` - Safe area handling

## 🔮 Future Development

- [ ] Backend API integration
- [ ] Real payment system
- [ ] Push notifications
- [ ] Offline support
- [ ] Testing suite
- [ ] Performance optimization

## 📄 License

MIT License - See LICENSE file for complete details.

---

**Built with ❤️ using React Native & Expo**