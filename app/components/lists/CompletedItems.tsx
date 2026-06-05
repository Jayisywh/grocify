import { useGroceryStore } from "@/app/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

const CompletedItems = () => {
  const { removeItem, togglePurchased, items } = useGroceryStore();
  const completedItems = items.filter((item) => item.purchased);
  if (!completedItems.length) return null;

  return (
    <View className="mt-3 rounded-3xl border border-border bg-secondary p-4">
      <Text className="text-sm font-semibold uppercase tracking-[1px] text-secondary-foreground">
        Completed Items
      </Text>
      {completedItems.map((item) => (
        <View
          key={item.id}
          className="mt-3 flex-row items-center justify-between rounded-2xl border border-border bg-card px-3 py-2"
        >
          <View className="flex-row items-center gap-2">
            <Pressable
              onPress={() => {
                togglePurchased(item.id);
              }}
              className="h-6 w-6 items-center justify-center rounded-full bg-success"
            >
              <FontAwesome6 name="check" size={12} color="#ffffff" />
            </Pressable>
            <Text className="text-base text-muted-foreground line-through">
              {item.name}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default CompletedItems;
