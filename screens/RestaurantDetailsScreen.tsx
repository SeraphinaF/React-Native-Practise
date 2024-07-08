import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useRestaurants from "../fetchData/fetchRestaurants";
import { useNavigation } from "@react-navigation/native";
import { useFavorites } from "../components/FavoritesContext";

const RestaurantDetailsScreen = ({ route }) => {
  const { placeId } = route.params;
  const navigation = useNavigation();
  const restaurantList = useRestaurants();
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  // Find the restaurant based on placeId
  const restaurant = restaurantList.find(
    (restaurant) => restaurant.place_id === placeId
  );

  // Check if restaurant is a favorite
  const isFavorite = favorites.some((fav) => fav.place_id === placeId);

  // Toggle favorite status
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(placeId);
    } else {
      addFavorite(restaurant);
    }
  };
  // Check if restaurant exists
  if (!restaurant) {
    return (
      <View style={styles.container}>
        <Text>Restaurant not found.</Text>
        <Pressable>
          <Text style={styles.close} onPress={() => navigation.goBack()}>
            X
          </Text>
        </Pressable>
      </View>
    );
  }

  const openingHours = restaurant.current_opening_hours || {};
  const weekOpeningHours = openingHours.weekday_text || [];
  const editorialSummary = restaurant.editorial_summary || {};
  const delivery = restaurant.delivery;
  const reviews = restaurant.reviews || [];

  return (
    <SafeAreaView style={styles.container}>
      <Pressable>
        <Text style={styles.close} onPress={() => navigation.goBack()}>
          X
        </Text>
      </Pressable>
      <ScrollView horizontal style={styles.photosContainer}>
        {restaurant.photos && restaurant.photos.length > 0 ? (
          restaurant.photos.map((photo, index) => (
            <Image
              key={index}
              style={styles.photo}
              source={{
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyCGw7Zgznj8Pny4qqSz1z6kkhBsCIkvyi4`,
                cache: "force-cache",
              }}
            />
          ))
        ) : (
          <Text>No photos available.</Text>
        )}
      </ScrollView>
      <Text style={styles.name}>{restaurant.name}</Text>
      <View style={styles.headerInfo}>
        <View style={styles.openStatus}>
          <Text>
            {openingHours.open_now ? (
              <Text style={{ color: "green" }}>Open</Text>
            ) : (
              <Text style={{ color: "red" }}>Closed</Text>
            )}
          </Text>
        </View>
        <View style={styles.delivery}>
          <Text>
            {delivery ? (
              <Text style={{ color: "green" }}>Delivery</Text>
            ) : (
              <Text style={{ color: "orange" }}>No delivery</Text>
            )}
          </Text>
        </View>
      </View>
      <Pressable onPress={toggleFavorite} style={styles.favoriteButton}>
        <Text style={styles.favoriteButtonText}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Text>
      </Pressable>
      <ScrollView>
        <View style={styles.description}>
          <Text>{editorialSummary.overview || ""}</Text>
        </View>
        <View style={styles.weekOpeningHours}>
          {weekOpeningHours.map((hours, index) => (
            <Text key={index} style={styles.openingHoursText}>
              {hours}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
  },
  close: {
    alignSelf: "flex-end",
    fontSize: 18,
    fontWeight: "bold",
  },
  photosContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  photo: {
    width: 350,
    height: 200,
    marginRight: 10,
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  headerInfo: {
    flexDirection: "row",
  },
  openStatus: {
    fontWeight: "700",
  },
  delivery: {
    fontWeight: "700",
    marginLeft: 20,
  },
  favoriteButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  favoriteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    marginBottom: 32,
  },
  weekOpeningHours: {
    marginTop: 20,
  },
  openingHoursText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default RestaurantDetailsScreen;
