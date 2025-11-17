import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { register } from "@/lib/auth";
import { useRouter, Link } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister() {
    setError("");
    setLoading(true);

    try {
      await register({email, password, name});
      router.replace("/(auth)/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }

    setLoading(false);
  }

  return (
    <View className="flex-1 bg-black px-6 justify-center">
      <Text className="text-white text-3xl font-bold mb-6">Create Account</Text>

      {error ? <Text className="text-red-400 mb-2">{error}</Text> : null}

      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
        className="w-full bg-neutral-900 text-white px-4 py-3 rounded-lg mb-4"
      />

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
        onPress={handleRegister}
        className="bg-red-600 py-3 rounded-lg mt-2"
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-center text-white font-bold text-lg">
            Register
          </Text>
        )}
      </TouchableOpacity>

      <Link href="/(auth)/login" asChild>
        <TouchableOpacity className="mt-4">
          <Text className="text-center text-gray-300">
            Already have an account? <Text className="text-red-500">Login</Text>
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
