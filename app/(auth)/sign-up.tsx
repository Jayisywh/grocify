import { useAuth, useSignUp } from "@clerk/expo";
import { type Href, Link, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SignUpScreen() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");

  const handleSubmit = async () => {
    const { error } = await signUp.password({
      emailAddress,
      password,
    });
    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (!error) {
      await signUp.verifications.sendEmailCode();
    }
  };

  const handleVerify = async () => {
    await signUp.verifications.verifyEmailCode({ code });

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session.currentTask);
            return;
          }

          const url = decorateUrl("/(tabs)");
          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url as Href);
          }
        },
      });
    } else {
      console.error("Sign-up attempt not complete:", signUp);
    }
  };

  if (signUp.status === "complete" || isSignedIn) {
    return null;
  }

  if (
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0
  ) {
    return (
      <View className="flex-1 justify-center bg-white px-6 dark:bg-black">
        <Text className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
          Verify your account
        </Text>
        <TextInput
          className="mb-4 rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#9CA3AF"
          onChangeText={setCode}
          keyboardType="numeric"
        />
        {errors.fields.code && (
          <Text className="mb-2 text-sm text-red-500">
            {errors.fields.code.message}
          </Text>
        )}
        <Pressable
          className="mb-3 items-center rounded-lg bg-blue-600 py-3 active:opacity-70 disabled:opacity-50"
          onPress={handleVerify}
          disabled={fetchStatus === "fetching"}
        >
          {fetchStatus === "fetching" ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-base font-semibold text-white">Verify</Text>
          )}
        </Pressable>
        <Pressable
          className="items-center py-3 active:opacity-70"
          onPress={() => signUp.verifications.sendEmailCode()}
        >
          <Text className="text-base font-semibold text-blue-600">
            I need a new code
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center bg-white px-6 dark:bg-black">
      <Text className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        Sign up
      </Text>

      <Text className="mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
        Email address
      </Text>
      <TextInput
        className="mb-4 rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor="#9CA3AF"
        onChangeText={setEmailAddress}
        keyboardType="email-address"
      />
      {errors.fields.emailAddress && (
        <Text className="mb-2 text-sm text-red-500">
          {errors.fields.emailAddress.message}
        </Text>
      )}

      <Text className="mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
        Password
      </Text>
      <TextInput
        className="mb-4 rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        value={password}
        placeholder="Enter password"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        onChangeText={setPassword}
      />
      {errors.fields.password && (
        <Text className="mb-2 text-sm text-red-500">
          {errors.fields.password.message}
        </Text>
      )}

      <Pressable
        className="mb-4 items-center rounded-lg bg-blue-600 py-3 active:opacity-70 disabled:opacity-50"
        onPress={handleSubmit}
        disabled={!emailAddress || !password || fetchStatus === "fetching"}
      >
        {fetchStatus === "fetching" ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-base font-semibold text-white">Sign up</Text>
        )}
      </Pressable>

      <View className="flex-row items-center justify-center gap-1">
        <Text className="text-gray-600 dark:text-gray-400">
          Already have an account?
        </Text>
        <Link href="/(auth)/sign-in">
          <Text className="font-semibold text-blue-600">Sign in</Text>
        </Link>
      </View>

      <View nativeID="clerk-captcha" />
    </View>
  );
}
