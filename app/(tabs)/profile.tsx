import { icons } from "@/constants/icons";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { logout } from "@/lib/auth";

export default function Profile() {
  const { user, loading, setUser } = useAuth() as {
    user: any;
    loading: boolean;
    setUser: (user: any) => void;
  };
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
            setUser(null);
            router.replace("/(auth)/login");
          } catch (err) {
            console.error("Logout failed", err);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    if (!loading) {
      if (!user) router.replace("/(auth)/login");
    }
  }, [user, loading]);

  return (
    <SafeAreaView className="bg-primary flex-1 px-10">
      <View className=" flex-1 p-6">
        <Image source={icons.person} className="size-10" tintColor="#fff" />
        <Text className="text-gray-500 text-base mb-5">Profile</Text>

        <View className="mb-5">
          <Text className="text-gray-400 text-sm">Name</Text>
          <Text className="text-white text-lg font-medium">{user?.name}</Text>
        </View>

        <View className="mb-10">
          <Text className="text-gray-400 text-sm">Email</Text>
          <Text className="text-white text-lg font-medium">{user?.email}</Text>
        </View>

        <TouchableOpacity
          className="bg-red-600 py-3 rounded-lg items-center"
          onPress={handleLogout}
        >
          <Text className="text-white text-lg font-bold">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
