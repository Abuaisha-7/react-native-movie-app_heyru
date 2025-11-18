
import SavedCard from "@/components/SavedCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useAuth } from "@/context/AuthContext";
import  events  from "@/lib/events";
import { getSavedMovies } from "@/services/appwrite";
import useFetch from "@/services/usefetch";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";


const Save = () => {
  const { user, loading, setUser } = useAuth() as {
    user: any;
    loading: boolean;
    setUser: (user: any) => void;
  };
  const router = useRouter();

  // Always define values safely first
const userId = user?.$id ?? null;

 // Always call hooks unconditionally
const {
  data: savedMovies,
  loading: savedLoading,
  error: savedError,
 refetch
} = useFetch(() => {
  if (!userId) {
    return Promise.resolve(undefined);
  }
  return getSavedMovies(userId);
});



// Redirect after calling hooks
useEffect(() => {
  if (!loading && !user) {
    router.replace("/(auth)/login");
  }
}, [user, loading]);

// Listen for refresh requests
useEffect(() => {
  const refresh = () => {
    refetch();
  };

  events.on("refreshSaved", refresh);

  return () => {
    events.off("refreshSaved", refresh);
  };
}, [refetch]);

// Don’t render UI until redirect completes
if (!loading && !user) {
  return null;
}

  return (
    <View className="flex-1 bg-primary">
    <Image source={images.bg} className="absolute w-full z-0" />
    <ScrollView
      className="flex-1 px-5"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
    >
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

      {savedLoading? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          className="mt-10 self-center"
        />
      ) : savedError ? (
        <Text>Error: {savedError?.message}</Text>
      ) : (
        <View>
        
                 <>
            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Saved Movies
            </Text>

            <FlatList
              data={savedMovies}
              renderItem={({item, index}) => (
                <SavedCard
                movie={item} index={index}
                />
              )}
              keyExtractor={(item, index) => item.$id ?? `${item.movie_id}-${index}`}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: 'flex-start',
                gap: 20,
                paddingRight: 5,
                marginBottom: 10
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />
          </>
        </View>
      )}
    </ScrollView>
  </View>
  );
};

export default Save;
