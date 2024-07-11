import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListOfRestaurants from "../components/ListOfRestaurants";
import { useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";
import DarkModeSwitch from "../components/DarkModeSwitch";

const HomeScreen = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={{ backgroundColor: theme.backgroundColor }}>
      <View style={styles.container}>
        <View style={styles.switchIcon}>
          <DarkModeSwitch />
        </View>
        <Text style={[styles.title, { color: theme.textColor }]}>
          Find all your favorite
        </Text>
        <Text style={[styles.titleRes, { color: theme.primary }]}>
          Restaurants
        </Text>
      </View>
      <View style={styles.container}>
        <ListOfRestaurants />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  switchIcon: {
    alignItems: "flex-end",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
    fontWeight: "300",
  },
  titleRes: {
    fontSize: 40,
    fontWeight: "700",
    marginBottom: 24,
  },
});
export default HomeScreen;
