import { useSignIn } from "@clerk/expo";
import { Link, useRouter, type Href } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SignInScreen() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");

  const handleSubmit = async () => {
    const { error } = await signIn.password({
      emailAddress,
      password,
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl("/");
          router.push(url as Href);
        },
      });
    }
  };

  const handleVerify = async () => {
    await signIn.mfa.verifyEmailCode({ code });

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl("/");
          router.push(url as Href);
        },
      });
    }
  };

  if (signIn.status === "needs_client_trust") {
    return (
      <View className="flex-1 justify-center bg-white px-6 dark:bg-black">
        <Text className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
          Verify your account
        </Text>

        <TextInput
          className="mb-4 rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          value={code}
          placeholder="Enter verification code"
          onChangeText={setCode}
          keyboardType="numeric"
        />

        {errors.fields.code && (
          <Text className="mb-2 text-sm text-red-500">
            {errors.fields.code.message}
          </Text>
        )}

        <Pressable
          className="mb-3 items-center rounded-lg bg-blue-600 py-3"
          onPress={handleVerify}
          disabled={fetchStatus === "fetching"}
        >
          {fetchStatus === "fetching" ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold">Verify</Text>
          )}
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center bg-white px-6 dark:bg-black">
      <Text className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        Sign in
      </Text>

      {/* Email */}
      <Text className="mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
        Email address
      </Text>
      <TextInput
        className="mb-4 rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        value={emailAddress}
        onChangeText={setEmailAddress}
        placeholder="Enter email"
        autoCapitalize="none"
      />
      {errors.fields.identifier && (
        <Text className="mb-2 text-sm text-red-500">
          {errors.fields.identifier.message}
        </Text>
      )}

      {/* Password */}
      <Text className="mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
        Password
      </Text>
      <TextInput
        className="mb-4 rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
      />

      {errors.fields.password && (
        <Text className="mb-2 text-sm text-red-500">
          {errors.fields.password.message}
        </Text>
      )}

      {/* Button */}
      <Pressable
        className="mb-4 items-center rounded-lg bg-blue-600 py-3"
        onPress={handleSubmit}
        disabled={!emailAddress || !password || fetchStatus === "fetching"}
      >
        {fetchStatus === "fetching" ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold">Continue</Text>
        )}
      </Pressable>

      {/* Link */}
      <View className="flex-row justify-center">
        <Text className="text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
        </Text>
        <Link href="/(auth)/sign-up">
          <Text className="text-blue-600 font-semibold">Sign up</Text>
        </Link>
      </View>
    </View>
  );
}
