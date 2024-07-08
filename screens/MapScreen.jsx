import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useLocation } from "../fetchData/fetchLocation";
import useRestaurants from "../fetchData/fetchRestaurants";
import { useNavigation } from "@react-navigation/native";

const MapScreen = () => {
  const { latitude, longitude } = useLocation();
  console.log(latitude);
  console.log(longitude);
  const restaurantList = useRestaurants();
  const navigation = useNavigation();

  const handleMarkerPress = (restaurantId) => {
    navigation.navigate("RestaurantDetails", { placeId: restaurantId });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        showsUserLocation={true}
        followsUserLocation={true}
        provider={MapView.PROVIDER_GOOGLE}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 5.135,
          longitudeDelta: 5.135,
        }}
        // provider="google"
        apiKey="AIzaSyCGw7Zgznj8Pny4qqSz1z6kkhBsCIkvyi4"
      >
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
          pinColor="blue"
        />
        {restaurantList.map((restaurant) => (
          <Marker
            key={restaurant.id}
            coordinate={{
              latitude: restaurant.geometry.location.lat,
              longitude: restaurant.geometry.location.lng,
            }}
            title={restaurant.name}
            onPress={() => handleMarkerPress(restaurant.place_id)}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  mapStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default MapScreen;
