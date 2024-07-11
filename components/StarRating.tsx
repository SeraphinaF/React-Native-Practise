import React from "react";
import { View, Image, StyleSheet } from "react-native";
import useRestaurants from "../fetchData/fetchRestaurants";
import StarIcon from "../assets/star.png";
import StarEmptyIcon from "../assets/starEmpty.png";

const StarRating = ({ route }) => {
  const restaurantList = useRestaurants();
  const { placeId } = route.params;

  const restaurant = restaurantList.find(
    (restaurant) => restaurant.place_id === placeId
  );

  return (
    <View style={styles.stars}>
      <Image source={StarIcon} style={styles.icon} />
      <Image source={StarIcon} style={styles.icon} />
      <Image source={StarIcon} style={styles.icon} />
      <Image source={StarEmptyIcon} style={styles.icon} />
      <Image source={StarEmptyIcon} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 15,
    height: 15,
    marginRight: 4,
  },
  stars: {
    flexDirection: "row",
    marginLeft: 20,
  },
});

export default StarRating;
