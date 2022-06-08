import React, { useContext } from "react";

import Navbar from "../components/Navbar";
import Feed from "../components/Feed";
import { KeyboardAvoidingView, StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClientProvider, QueryClient } from "react-query";
import { signOut } from "firebase/auth";
import { auth } from "../../config";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";

const queryClient = new QueryClient();

const HomeScreen = () => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);

  const navigation = useNavigation();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Feed />
          <Navbar signOut={handleSignOut} />
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
