import { icons } from "@/constants/icons";
import { SavedCardProps } from "@/interfaces/interfaces";
import events from "@/lib/events";
import { deleteSavedMovie } from "@/services/appwrite";
import { Link, router } from "expo-router";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

const SavedCard = ({
  movie: { $id, movie_id, title, poster_url, vote_average, release_date },
  index,
}: SavedCardProps) => {
  
  const handleDelete = async () => {
    if (!$id) {
      Alert.alert("Error", "Movie ID is missing. Cannot remove movie.");
      return;
    }

    Alert.alert(
      "Remove Movie",
      "Are you sure you want to remove this movie from your saved list?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            const res = await deleteSavedMovie($id);
            if (res.status === "success") {
              Alert.alert("Success", "Movie removed.");
              // Tell SavedScreen to refresh
              events.emit("refreshSaved");
              // Refresh SavedScreen AFTER showing the alert
              router.replace("/saved");
            } else {
              Alert.alert("Error", "Failed to remove movie.");
            }
          },
        },
      ]
    );
  };

  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity onLongPress={handleDelete} className="w-[30%]">
        <Image
          source={{ uri: poster_url }}
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
  );
};

export default SavedCard;
