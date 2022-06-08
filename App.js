import { ActivityIndicator } from "react-native";
import HomeScreen from "./app/screens/HomeScreen";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config";
import { UserContext } from "./app/context/UserContext";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }

      return unsubscribe;
    });
  }, []);

  let [fontsLoaded] = useFonts({
    "Inter-Black": require("./app/assets/fonts/Inter-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  const Stack = createNativeStackNavigator();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator>
          {!user ? (
            <>
              <Stack.Screen name="Login" options={{ headerShown: false }}>
                {() => <LoginScreen />}
              </Stack.Screen>
              <Stack.Screen name="Register" options={{ headerShown: false }}>
                {() => <RegisterScreen />}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name="Home" options={{ headerShown: false }}>
                {() => <HomeScreen />}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
