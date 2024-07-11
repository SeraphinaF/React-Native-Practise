import React from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useFavorites } from "../components/FavoritesContext";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";

const FavoritesScreen = () => {
  const { favorites } = useFavorites();
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() =>
        navigation.navigate("RestaurantDetails", { placeId: item.place_id })
      }
    >
      <View style={[styles.item, { backgroundColor: theme.primary }]}>
        <Text style={[styles.titleRestaurant, { color: theme.textColorLight }]}>
          {item.name}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Text style={[styles.title, { color: theme.textColor }]}>Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.place_id}
        renderItem={renderItem}
        style={styles.favoritesList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  favoritesList: {
    marginTop: 24,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: "gray",
    borderRadius: 5,
  },
  titleRestaurant: {
    fontSize: 18,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
});

export default FavoritesScreen;
