import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import CompletedItems from "../components/lists/CompletedItems";
import ListHeroCard from "../components/lists/ListHeroCard";
import PendingItemCard from "../components/lists/PendingItemCard";
import TabScreenBackground from "../components/TabScreenBackground";
import { useGroceryStore } from "../store/grocery-store";

export default function ListScreen() {
  const { items, loadItems } = useGroceryStore();
  const pendingItems = items.filter((item) => !item.purchased);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return (
    <FlatList
      className="flex-1 bg-background"
      data={pendingItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PendingItemCard item={item} />}
      contentContainerStyle={{ padding: 20, gap: 14 }}
      contentInsetAdjustmentBehavior="automatic"
      ListHeaderComponent={
        <View style={{ gap: 14 }}>
          <TabScreenBackground />
          <ListHeroCard />
          <View className="flex-row items-center justify-between px-1">
            <Text className="text-sm font-semibold uppercase tracking-[1px] text-muted-foreground">
              Shopping Items
            </Text>
            <Text className="text-sm text-muted-foreground">
              {pendingItems.length} active
            </Text>
          </View>
        </View>
      }
      ListFooterComponent={<CompletedItems />}
      ListEmptyComponent={<Text>No items in database</Text>}
    />
  );
}
