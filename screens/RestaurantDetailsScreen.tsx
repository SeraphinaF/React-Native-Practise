import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import useRestaurants from "../fetchData/fetchRestaurants";
import { useNavigation } from "@react-navigation/native";
import { useFavorites } from "../components/FavoritesContext";
import { useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";
import StarRating from "../components/StarRating";

const RestaurantDetailsScreen = ({ route }) => {
  const { placeId } = route.params;
  const navigation = useNavigation();
  const restaurantList = useRestaurants();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { theme } = useContext(ThemeContext);

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
        <Pressable style={styles.closeButton}>
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

  return (
    <View style={{ backgroundColor: theme.backgroundColor, flex: 1 }}>
      <Pressable style={styles.closeButton}>
        <Text
          style={[styles.close, { color: theme.textColor }]}
          onPress={() => navigation.goBack()}
        >
          X
        </Text>
      </Pressable>
      <View style={styles.container}>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
          <View style={styles.headerInfo}>
            <View style={[styles.closed, { backgroundColor: theme.opacity }]}>
              <Text style={{ fontSize: 14, fontWeight: "700" }}>
                {openingHours.open_now ? (
                  <Text style={{ color: "green" }}>Open</Text>
                ) : (
                  <Text style={{ color: "#D22B2B" }}>Closed</Text>
                )}
              </Text>
            </View>
            <View
              style={[
                styles.closed,
                { backgroundColor: theme.opacity, marginLeft: 12 },
              ]}
            >
              <Text style={{ fontSize: 14, fontWeight: "700" }}>
                {delivery ? (
                  <Text style={{ color: "green" }}>Delivery</Text>
                ) : (
                  <Text style={{ color: "#D22B2B" }}>No delivery</Text>
                )}
              </Text>
            </View>
            <StarRating route={placeId} />
          </View>
          <Pressable
            onPress={toggleFavorite}
            style={[styles.favoriteButton, { backgroundColor: theme.primary }]}
          >
            <Text style={styles.favoriteButtonText}>
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Text>
          </Pressable>
          <Text style={[styles.name, { color: theme.textColor }]}>
            {restaurant.name}
          </Text>
        </View>
        <ScrollView>
          <View style={styles.description}>
            <Text style={{ color: theme.textColor }}>
              {editorialSummary.overview || ""}
            </Text>
          </View>
          <View style={styles.weekOpeningHours}>
            {weekOpeningHours.map((hours, index) => (
              <Text
                key={index}
                style={[styles.openingHoursText, { color: theme.textColor }]}
              >
                {hours}
              </Text>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    top: 48,
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 16,
    zIndex: 1,
  },
  close: {
    fontSize: 26,
    fontWeight: "normal",
  },
  photo: {
    width: 380,
    height: 240,
    marginRight: 10,
    borderRadius: 10,
  },
  name: {
    fontSize: 36,
    fontWeight: "bold",
    marginVertical: 8,
  },
  headerInfo: {
    flexDirection: "row",
    alignItems: "center",
    // paddingBottom: 16,
    paddingTop: 16,
    // borderBottomColor: "#365E32",
    // borderBottomWidth: 0.5,
  },
  openStatus: {
    fontWeight: "700",
  },
  closed: {
    padding: 4,
    paddingHorizontal: 14,
    borderRadius: 15,
  },
  delivery: {
    padding: 4,
    paddingHorizontal: 14,
    borderRadius: 15,
  },
  favoriteButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 16,
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
    fontWeight: "700",
    marginBottom: 5,
  },
});

export default RestaurantDetailsScreen;
