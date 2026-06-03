import { clearPurchasedItems } from "@/app/lib/server/db-actions";

export async function POST() {
  try {
    await clearPurchasedItems();
    return Response.json({ status: "success" });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to clear purchased items";
    return Response.json({ error: message }, { status: 500 });
  }
}
