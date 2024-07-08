import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListOfRestaurants from "../components/ListOfRestaurants";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ListOfRestaurants />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    margin: 12,
  },
});
