import React from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useFavorites } from "../components/FavoritesContext";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const FavoritesScreen = () => {
  const { favorites } = useFavorites();
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() =>
        navigation.navigate("RestaurantDetails", { placeId: item.place_id })
      }
    >
      <View style={styles.item}>
        <Text style={styles.titleRestaurant}>{item.name}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.place_id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: "gray",
    borderRadius: 5,
  },
  titleRestaurant: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
});

export default FavoritesScreen;
