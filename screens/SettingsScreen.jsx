import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Switch } from "react-native";
import { useState } from "react";
import lightTheme from "./colors.js";
import darkTheme from "./colors.js";

const [isSwitchOn, setIsSwitchOn] = useState(false);
const [currentTheme, setCurrentTheme] = useState(darkTheme);

const SettingsScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Darkmode</Text>
        <Switch />
      </View>
      <View>
        <Text>Push notificaties</Text>
        <Switch />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
