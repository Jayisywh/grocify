import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Image, Modal, Pressable, Text, TextInput, View } from "react-native";

export default function ProfileModal({ user, onClose, onSignOut }: any) {
  const [editMode, setEditMode] = React.useState(false);

  const [firstName, setFirstName] = React.useState(user?.firstName || "");

  const [lastName, setLastName] = React.useState(user?.lastName || "");

  const [image, setImage] = React.useState(user?.imageUrl || "");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const updateProfile = async () => {
    try {
      await user?.update({
        firstName,
        lastName,
      });

      if (image !== user?.imageUrl) {
        await user?.setProfileImage({
          file: image,
        });
      }

      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal visible transparent animationType="slide">
      <View className="flex-1 justify-end bg-black/50">
        <View className="rounded-t-3xl bg-white p-6 dark:bg-black">
          {/* CLOSE BUTTON (always visible) */}
          <Pressable onPress={onClose} className="absolute right-5 top-5 z-50">
            <Text className="text-2xl text-neutral-500">✕</Text>
          </Pressable>

          {/* ========================= */}
          {/* VIEW MODE (ACCOUNT PAGE) */}
          {/* ========================= */}
          {!editMode && (
            <View>
              {/* HEADER */}
              <View className="items-center mb-6">
                <Image
                  source={{ uri: image }}
                  className="h-24 w-24 rounded-full"
                />

                <Text className="mt-4 text-xl font-bold dark:text-white">
                  Account
                </Text>

                <Text className="text-lg font-semibold dark:text-white">
                  {user?.firstName} {user?.lastName}
                </Text>

                <Text className="text-neutral-500">
                  {user?.primaryEmailAddress?.emailAddress}
                </Text>
              </View>

              {/* INFO CARD */}
              <View className="rounded-xl border p-4 mb-5">
                <Text className="text-neutral-500">First Name</Text>
                <Text className="font-semibold dark:text-white mb-2">
                  {user?.firstName || "Not set"}
                </Text>

                <Text className="text-neutral-500">Last Name</Text>
                <Text className="font-semibold dark:text-white">
                  {user?.lastName || "Not set"}
                </Text>
              </View>

              {/* BUTTONS */}
              <View className="gap-3">
                <Pressable
                  onPress={() => setEditMode(true)}
                  className="rounded-xl bg-blue-600 p-4"
                >
                  <Text className="text-center text-white font-bold">
                    Update Profile
                  </Text>
                </Pressable>

                <Pressable
                  onPress={onSignOut}
                  className="rounded-xl bg-red-500 p-4"
                >
                  <Text className="text-center text-white font-bold">
                    Sign Out
                  </Text>
                </Pressable>
              </View>
            </View>
          )}

          {editMode && (
            <View>
              <Text className="text-xl font-bold mb-5 dark:text-white text-center">
                Update Profile
              </Text>

              {/* CHANGE PHOTO */}
              <Pressable onPress={pickImage} className="items-center mb-6">
                <Image
                  source={{ uri: image }}
                  className="h-24 w-24 rounded-full"
                />

                <Text className="text-blue-500 mt-2">Change Photo</Text>
              </Pressable>

              {/* FIRST NAME */}
              <Text className="mb-2 text-neutral-500">First Name</Text>

              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                className="mb-4 rounded-xl border p-3 dark:text-white"
              />

              {/* LAST NAME */}
              <Text className="mb-2 text-neutral-500">Last Name</Text>

              <TextInput
                value={lastName}
                onChangeText={setLastName}
                className="mb-5 rounded-xl border p-3 dark:text-white"
              />

              {/* SAVE */}
              <Pressable
                onPress={updateProfile}
                className="rounded-xl bg-blue-600 p-4 mb-3"
              >
                <Text className="text-center text-white font-bold">
                  Save Changes
                </Text>
              </Pressable>

              {/* BACK */}
              <Pressable
                onPress={() => setEditMode(false)}
                className="rounded-xl border p-4"
              >
                <Text className="text-center font-semibold dark:text-white">
                  Back
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
