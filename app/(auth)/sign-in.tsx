import { useSignIn } from "@clerk/expo";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useRouter, type Href } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useSocialAuth from "../hooks/useSocialAuth";

export default function SignInScreen() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");

  const { handleSocialAuth, loadingStrategy } = useSocialAuth();

  const isGoogleClicked = loadingStrategy === "oauth_google";
  const isAppleClicked = loadingStrategy === "oauth_apple";
  const isGithubClicked = loadingStrategy === "oauth_github";

  const isLoading = isGithubClicked || isAppleClicked || isGithubClicked;

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
    // <View className="flex-1 justify-center bg-white px-6 dark:bg-black">
    //   <Text className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
    //     Sign in
    //   </Text>

    //   {/* Email */}
    //   <Text className="mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
    //     Email address
    //   </Text>
    //   <TextInput
    //     className="mb-4 rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
    //     value={emailAddress}
    //     onChangeText={setEmailAddress}
    //     placeholder="Enter email"
    //     autoCapitalize="none"
    //   />
    //   {errors.fields.identifier && (
    //     <Text className="mb-2 text-sm text-red-500">
    //       {errors.fields.identifier.message}
    //     </Text>
    //   )}

    //   {/* Password */}
    //   <Text className="mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
    //     Password
    //   </Text>
    //   <TextInput
    //     className="mb-4 rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
    //     value={password}
    //     onChangeText={setPassword}
    //     placeholder="Enter password"
    //     secureTextEntry
    //   />

    //   {errors.fields.password && (
    //     <Text className="mb-2 text-sm text-red-500">
    //       {errors.fields.password.message}
    //     </Text>
    //   )}

    //   {/* Button */}
    //   <Pressable
    //     className="mb-4 items-center rounded-lg bg-blue-600 py-3"
    //     onPress={handleSubmit}
    //     disabled={!emailAddress || !password || fetchStatus === "fetching"}
    //   >
    //     {fetchStatus === "fetching" ? (
    //       <ActivityIndicator color="#fff" />
    //     ) : (
    //       <Text className="text-white font-semibold">Continue</Text>
    //     )}
    //   </Pressable>

    //   {/* Link */}
    //   <View className="flex-row justify-center">
    //     <Text className="text-gray-600 dark:text-gray-400">
    //       Don’t have an account?{" "}
    //     </Text>
    //     <Link href="/(auth)/sign-up">
    //       <Text className="text-blue-600 font-semibold">Sign up</Text>
    //     </Link>
    //   </View>
    // </View>
    <SafeAreaView
      className="flex-1 bg-primary dark:bg-secondary"
      edges={["top"]}
    >
      <View className="absolute -left-16 top-12 h-56 w-56 rounded-full bg-primary/80 dark:bg-background/40"></View>
      <View className="absolute right-[-74px] top-40 h-72 w-72 rounded-full bg-primary/70 dark:bg-background/35"></View>

      <View className="px-6 pt-4">
        <Text className="text-center text-5xl font-extrabold tracking-tight text-primary-foreground uppercase font-mono dark:text-foreground">
          Grocify
        </Text>
        <Text className="mt-1 text-center text-[14px] text-primary-foreground/80 dark:text-foreground/75">
          Plan smarter. Shop happier.
        </Text>
        <View className="mt-6 rounded-[30px] border border-white/20 bg-white/10 p-3">
          <Image
            source={require("../../assets/images/auth.png")}
            style={{ width: "100%", height: 300 }}
            resizeMode="contain"
          />
        </View>
      </View>

      <View className="mt-8 flex-1 rounded-t-[36px] bg-card px-6 pb-8 pt-6">
        <View className="self-center rounded-full bg-secondary px-3 py-1">
          <Text className="text-xs font-semibold uppercase tracking-[1px] text-secondary-foreground">
            Welcome back
          </Text>
        </View>

        <Text className="mt-2 text-center text-sm loading-6 text-muted-foreground">
          Choose a social provider and jump right into your personalized grocery
          experience.
        </Text>

        <View className="mt-6">
          <Pressable
            className={`mb-3 h-14 flex-row items-center rounded-2xl border border-border bg-card px-4 active:opacity-90 ${isLoading ? "opacity-70" : ""}`}
            disabled={isLoading}
            onPress={() => handleSocialAuth("oauth_google")}
          >
            <View className="h-8 w-8 items-center justify-center rounded-full bg-white">
              <Image
                source={require("../../assets/images/google.png")}
                style={{ width: 20, height: 20 }}
              />
            </View>

            <Text className="ml-3 flex-1 text-lg font-semibold text-card-foreground">
              {isGoogleClicked
                ? "Connecting Google..."
                : "Continue with Google"}
            </Text>

            <FontAwesome name="angle-right" size={18} color="#5f6e66" />
          </Pressable>

          <Pressable
            className={`mb-3 h-14 flex-row items-center rounded-2xl border border-border bg-card px-4 active:opacity-90 ${isLoading ? "opacity-70" : ""}`}
            disabled={isLoading}
            onPress={() => handleSocialAuth("oauth_github")}
          >
            <View className="h-8 w-8 items-center justify-center rounded-full bg-white">
              <FontAwesome name="github" size={24} color="#111" />
            </View>

            <Text className="ml-3 flex-1 text-lg font-semibold text-card-foreground">
              {isGithubClicked
                ? "Connecting GitHub..."
                : "Continue with GitHub"}
            </Text>

            <FontAwesome name="angle-right" size={18} color="#5f6e66" />
          </Pressable>

          <Pressable
            className={`mb-3 h-14 flex-row items-center rounded-2xl border border-border bg-card px-4 active:opacity-90 ${isLoading ? "opacity-70" : ""}`}
            disabled={isLoading}
            onPress={() => handleSocialAuth("oauth_apple")}
          >
            <View className="h-8 w-8 items-center justify-center rounded-full bg-white">
              <FontAwesome6 name="apple" size={22} color="#111" />
            </View>

            <Text className="ml-3 flex-1 text-lg font-semibold text-card-foreground">
              {isAppleClicked ? "Connecting Apple..." : "Continue with Apple"}
            </Text>

            <FontAwesome name="angle-right" size={18} color="#5f6e66" />
          </Pressable>
        </View>

        <Text className="mt-3 text-center text-sm leading-5 text-muted-foreground">
          By continuing, you agree to our Terms and Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
}
