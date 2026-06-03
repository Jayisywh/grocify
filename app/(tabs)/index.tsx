import { Show, useClerk, useUser } from "@clerk/expo";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import CustomUserButton from "../components/CustomUserButton";

export default function HomeScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <View className="flex-1 bg-background text-muted-foreground px-6 pt-16 dark:bg-black">
      <Text className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        Grocifys
      </Text>

      <Show when="signed-out">
        <View className="gap-4">
          <Link href="/(auth)/sign-in" asChild>
            <Pressable className="items-center rounded-lg bg-blue-600 py-3 active:opacity-70">
              <Text className="text-base font-semibold text-white">
                Sign in
              </Text>
            </Pressable>
          </Link>
          <Link href="/(auth)/sign-up" asChild>
            <Pressable className="items-center rounded-lg border border-blue-600 py-3 active:opacity-70">
              <Text className="text-base font-semibold text-blue-600">
                Sign up
              </Text>
            </Pressable>
          </Link>
        </View>
      </Show>

      <Show when="signed-in">
        <View className="gap-4">
          <Text className="text-lg text-gray-700 dark:text-gray-300">
            Welcome, {user?.primaryEmailAddress?.emailAddress ?? user?.id}
          </Text>
          <Pressable
            className="items-center rounded-lg bg-gray-800 py-3 active:opacity-70 dark:bg-gray-200"
            onPress={() => signOut()}
          >
            <Text className="text-base font-semibold text-white dark:text-gray-900">
              Sign out
            </Text>
          </Pressable>
          <View className="h-9 w-9 rounded-full overflow-hidden">
            <CustomUserButton />
          </View>
        </View>
      </Show>
    </View>
  );
}
