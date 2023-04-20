import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useFonts } from "expo-font";

import { useState, useCallback } from "react";

import LoginScreen from "./src/Screens/LoginScreen";
import RegistrationScreen from "./src/Screens/RegistrationScreen";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

export default function App() {
  const image = require("./assets/Images/backgr.jpg");
  const [login, setLogin] = useState(false);
  const [fontsLoaded] = useFonts({
    "Roboto-Regulat": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <ImageBackground style={styles.imageBacgr} source={image}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            {login ? (
              <LoginScreen setLogin={setLogin} />
            ) : (
              <RegistrationScreen setLogin={setLogin} />
            )}
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBacgr: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});
