import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { useColorScheme } from "react-native";
import { useGroceryStore } from "../store/grocery-store";

export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const { loadItem } = useGroceryStore();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const tabsTintColor = isDark ? "hsl(142 70% 54%)" : "hsl(147 75% 33%)";

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <NativeTabs tintColor={tabsTintColor}>
      <NativeTabs.Trigger name="index">
        <Label>List</Label>
        <Icon
          sf={{
            default: "list.bullet.clipboard",
            selected: "list.bullet.clipboard.fill",
          }}
          drawable="list"
        ></Icon>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="planner">
        <Label>Planner</Label>
        <Icon
          sf={{ default: "plus.circle", selected: "plus.circle.fill" }}
          drawable="add"
        ></Icon>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="insights">
        <Label>Insights</Label>
        <Icon
          sf={{ default: "chart.bar", selected: "chart.bar.fill" }}
          drawable="analytics"
        ></Icon>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
