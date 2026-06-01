import { useClerk, useUser } from "@clerk/expo";
import React from "react";
import { Image, Pressable, View } from "react-native";
import ProfileModal from "./ProfileModal";

export default function CustomUserButton() {
  const { user } = useUser();
  const { signOut } = useClerk();

  const [open, setOpen] = React.useState(false);
  return (
    <View>
      <Pressable onPress={() => setOpen(true)}>
        <Image
          source={{ uri: user?.imageUrl }}
          className="h-9 w-9 rounded-full"
        />
      </Pressable>
      {open && (
        <ProfileModal
          user={user}
          onClose={() => setOpen(false)}
          onSignOut={signOut}
        />
      )}
    </View>
  );
}
