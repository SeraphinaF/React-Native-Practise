import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { Image } from "react-native";
import moonBlackIcon from "../assets/moonBlack.png";
import sunWhiteIcon from "../assets/sunWhite.png";

const DarkModeSwitch = () => {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  return (
    <SafeAreaView>
      <Pressable onPress={() => setIsDarkMode(!isDarkMode)}>
        <Image
          source={isDarkMode ? sunWhiteIcon : moonBlackIcon}
          style={styles.icon}
        />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
});

export default DarkModeSwitch;
