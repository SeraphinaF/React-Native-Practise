import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useRestaurants from "../fetchData/fetchRestaurants";
import { useNavigation } from "@react-navigation/native";
// import SavedButton from "./addFavorite";

const ListOfRestaurants = () => {
  const navigation = useNavigation();
  const restaurantList = useRestaurants();

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.title}>Restaurant list</Text>
      </View>
      <FlatList
        data={restaurantList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate("RestaurantDetails", {
                placeId: item.place_id,
              });
            }}
          >
            <View style={styles.restaurants}>
              <ImageBackground
                style={styles.image}
                imageStyle={styles.imageStyle}
                source={{
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[1].photo_reference}&key=AIzaSyCGw7Zgznj8Pny4qqSz1z6kkhBsCIkvyi4`,
                  cache: "force-cache",
                }}
              >
                {/* <SavedButton /> */}
                <View style={styles.overlay}></View>
                <View>
                  <Text style={{ color: "white" }}>Favorite</Text>
                </View>
                <View style={styles.openNow}>
                  {item.opening_hours?.open_now ? (
                    <Text style={{ color: "#adff2f" }}>Open Now</Text>
                  ) : (
                    <Text style={{ color: "orange" }}>Closed</Text>
                  )}
                </View>
                <Text style={styles.name}>{item.name}</Text>
              </ImageBackground>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  restaurants: {
    paddingVertical: 8,
  },
  openNow: {
    padding: 3,
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    borderRadius: 5,
    position: "absolute",
    bottom: 24,
    margin: 12,
  },
  name: {
    position: "absolute",
    bottom: 0,
    padding: 12,
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
  image: {
    position: "relative",
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  imageStyle: {
    borderRadius: 10,
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(52, 52, 52, 0.2)",
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});
export default ListOfRestaurants;