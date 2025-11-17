import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import React, { useState } from "react";
import { account, login } from "@/lib/auth";
import { useRouter, Link } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { icons } from "@/constants/icons";

export default function LoginScreen() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");
    setLoading(true);

 
  
    try {
      // Create session
      await login({ email: email.trim(), password });
  
      // Get authenticated user
      const user = await account.get();
      setUser(user);
  
      // Move to home screen
      router.replace("/(tabs)/profile");
    } catch (err) {
      console.log("Login error:", err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 bg-black px-6 justify-center">
      <Text className="text-white text-3xl font-bold mb-6">Welcome Back</Text>

      {error ? <Text className="text-red-400 mb-2">{error}</Text> : null}

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        className="w-full bg-neutral-900 text-white px-4 py-3 rounded-lg mb-4"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className="w-full bg-neutral-900 text-white px-4 py-3 rounded-lg mb-4"
      />

      <TouchableOpacity
        onPress={handleLogin}
        className="bg-red-600 py-3 rounded-lg mt-2"
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-center text-white font-bold text-lg">
            Login
          </Text>
        )}
      </TouchableOpacity>

      <Link href="/(auth)/register" asChild>
        <TouchableOpacity className="mt-4">
          <Text className="text-center text-gray-300">
            Don't have an account? <Text className="text-red-500">Register</Text>
          </Text>
        </TouchableOpacity>
      </Link>
        <TouchableOpacity
        className="absolute bottom-6 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={() => router.replace("/")}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
