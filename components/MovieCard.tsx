import { icons } from '@/constants/icons'
import { useAuth } from '@/context/AuthContext'
import { Movie } from '@/interfaces/interfaces'
import { saveMovie } from '@/services/appwrite'
import { Link, router } from 'expo-router'
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'


const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {

  const { user } = useAuth() as { user: any };

  const handleLongPress = async () => {
    const posterUrl = poster_path
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : "https://placehold.co/600x400/1a1a1a/FFFFFF.png";

    const result = await saveMovie({
      movie_id: id,
      title,
      poster_url: posterUrl,
      user_id: user?.$id,
      vote_average,
      release_date,
    });


    if (result.status === "saved") {
      Alert.alert("Saved", "Movie added to Saved!");
    } else if (result.status === "exists") {
      Alert.alert("Already Saved", "This movie is already in Saved.");
    } else {
      Alert.alert("Error", "Could not save movie.");
    }

      // 👇 Refresh SavedScreen AFTER showing the alert
  router.replace("/saved");
  };

  return (
    <Link href={`/movies/${id}`}  asChild>
        <TouchableOpacity onLongPress={handleLongPress} className="w-[30%]">
            <Image
                source={{
                    uri: poster_path 
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    :  "https://placehold.co/600x400/1a1a1a/FFFFFF.png"
                }}
                className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
         <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>

         <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>

         <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>
          <Text className="text-xs font-medium text-light-300 uppercase">
            Movie
          </Text>
        </View>

        </TouchableOpacity>
     </Link>
  )
}

export default MovieCard