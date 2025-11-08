# MovieFlix 🎬

A modern, cross-platform mobile movie application built with React Native and Expo. Discover trending movies, search for your favorites, and explore detailed movie information powered by The Movie Database (TMDB) API.

## 📱 Features

- **Home Screen**: Browse latest movies and trending selections
- **Search Functionality**: Real-time movie search with debounced search queries
- **Trending Movies**: View the most searched movies tracked via Appwrite backend
- **Movie Details**: Detailed information about each movie including ratings, genres, and descriptions
- **Responsive Design**: Beautiful UI built with NativeWind (Tailwind CSS for React Native)
- **Cross-Platform**: Works on iOS, Android, and Web
- **Tab Navigation**: Easy navigation between Home, Search, Saved, and Profile screens

## 🛠️ Tech Stack

### Core Technologies
- **React Native** (0.81.5) - Mobile framework
- **Expo** (~54.0.22) - Development platform
- **TypeScript** - Type-safe development
- **Expo Router** (~6.0.14) - File-based routing

### UI & Styling
- **NativeWind** (^4.2.1) - Tailwind CSS for React Native
- **Tailwind CSS** (^3.4.18) - Utility-first CSS framework
- **React Native Reanimated** (~4.1.1) - Smooth animations
- **Expo Image** (~3.0.10) - Optimized image component

### Backend & APIs
- **The Movie Database (TMDB) API** - Movie data and search functionality
- **Appwrite** - Backend-as-a-Service for trending movies tracking
- **React Native Appwrite** (^0.18.0) - Appwrite SDK integration

### Navigation
- **React Navigation** - Navigation library
- **Expo Router** - File-based routing system

## 📁 Project Structure

```
mobile_movie_app/
├── app/                    # App screens and routing
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home screen
│   │   ├── search.tsx     # Search screen
│   │   ├── saved.tsx      # Saved movies screen
│   │   └── profile.tsx    # Profile screen
│   ├── movies/            # Movie detail screens
│   │   └── [id].tsx       # Dynamic movie detail route
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── MovieCard.tsx      # Movie card component
│   ├── SearchBar.tsx      # Search input component
│   └── TrendingCard.tsx   # Trending movie card
├── constants/             # App constants
│   ├── icons.ts          # Icon mappings
│   └── images.ts         # Image asset mappings
├── services/              # API and data services
│   ├── api.ts            # TMDB API integration
│   ├── appwrite.ts       # Appwrite backend service
│   └── usefetch.ts       # Custom fetch hook
├── interfaces/            # TypeScript interfaces
│   └── interfaces.d.ts   # Type definitions
├── types/                 # Additional type definitions
├── assets/                # Static assets
│   ├── icons/            # App icons
│   └── images/           # Image assets
└── package.json          # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (installed globally or via npx)
- iOS Simulator (for iOS development) or Android Emulator (for Android development)
- TMDB API Key ([Get one here](https://www.themoviedb.org/settings/api))
- Appwrite Project (for trending movies feature)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mobile_movie_app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_MOVIE_API_KEY=your_tmdb_api_key_here
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
   EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_appwrite_database_id
   EXPO_PUBLIC_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```

5. **Run on your preferred platform**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser
   - Scan QR code with Expo Go app on your physical device

## 📋 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start on Android emulator
- `npm run ios` - Start on iOS simulator
- `npm run web` - Start on web browser
- `npm run lint` - Run ESLint to check code quality

## 🔧 Configuration

### Appwrite Setup

1. Create an Appwrite project at [cloud.appwrite.io](https://cloud.appwrite.io)
2. Create a database and collection
3. Set up the following attributes in your collection:
   - `searchTerms` (string)
   - `movie_id` (integer)
   - `title` (string)
   - `count` (integer)
   - `poster_url` (string)
4. Add your Appwrite credentials to the `.env` file

### TMDB API Setup

1. Sign up at [themoviedb.org](https://www.themoviedb.org)
2. Generate an API key from your account settings
3. Add the API key to your `.env` file as `EXPO_PUBLIC_MOVIE_API_KEY`

## 🎯 Key Features Explained

### Trending Movies
The app tracks search queries and displays the top 5 most searched movies on the home screen. This data is stored and managed via Appwrite backend.

### Search Functionality
- Real-time search with 1-second debounce
- Automatic trending tracking for search queries
- Displays search results in a responsive grid layout

### Movie Details
Navigate to individual movie pages to view:
- Movie poster and backdrop
- Title and overview
- Release date
- Rating and vote count
- Genres
- Production details

## 🎨 UI/UX Features

- **Dark Theme**: Modern dark color scheme optimized for movie viewing
- **Responsive Grid Layout**: Adaptive movie card grid that works on all screen sizes
- **Smooth Animations**: Enhanced user experience with React Native Reanimated
- **Loading States**: Proper loading indicators during data fetching
- **Error Handling**: User-friendly error messages

## 📱 Platform Support

- ✅ iOS (iPhone & iPad)
- ✅ Android (Phones & Tablets)
- ✅ Web (Progressive Web App)

## 🔐 Environment Variables

Make sure to set up the following environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `EXPO_PUBLIC_MOVIE_API_KEY` | TMDB API key | Yes |
| `EXPO_PUBLIC_APPWRITE_PROJECT_ID` | Appwrite project ID | Yes (for trending) |
| `EXPO_PUBLIC_APPWRITE_DATABASE_ID` | Appwrite database ID | Yes (for trending) |
| `EXPO_PUBLIC_APPWRITE_COLLECTION_ID` | Appwrite collection ID | Yes (for trending) |

## 🐛 Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Ensure your TMDB API key is valid and has proper permissions
   - Check that the key is correctly set in `.env` file

2. **Appwrite Connection Issues**
   - Verify your Appwrite project credentials
   - Ensure your database and collection are properly configured
   - Check network connectivity

3. **Build Errors**
   - Clear cache: `npx expo start -c`
   - Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

## 📚 Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [Appwrite Documentation](https://appwrite.io/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 👤 Author

Heyru.b - E-Learning Project

---

**Note**: This is a learning project built as part of an E-Learning course. Make sure to replace placeholder values and configure your own API keys before deploying to production.
