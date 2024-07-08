import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocation } from "./fetchLocation";

const CACHE_KEY = "restaurants_cache";
const CACHE_EXPIRATION = 3600 * 1000; // 1 hour in milliseconds

export const fetchRestaurants = async (latitude, longitude) => {
  const url = "https://maps.googleapis.com/maps/api/place/textsearch/json?";
  const location = `location=${latitude},${longitude}`;
  const radius = "&radius=2000";
  const query = "&query=restaurant";
  const apiKey = `&key=AIzaSyCGw7Zgznj8Pny4qqSz1z6kkhBsCIkvyi4`;
  const restaurantSearchUrl = `${url}${location}${radius}${query}${apiKey}`;

  console.log("Request URL:", restaurantSearchUrl);

  try {
    const response = await fetch(restaurantSearchUrl);
    const result = await response.json();

    if (result.status !== "OK") {
      console.error("API Error:", result.status, result.error_message);
      return [];
    }

    return result.results;
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
};

export const fetchRestaurantDetails = async (placeId) => {
  const url = "https://maps.googleapis.com/maps/api/place/details/json?";
  const placeIdParam = `place_id=${placeId}`;
  const apiKey = `&key=AIzaSyCGw7Zgznj8Pny4qqSz1z6kkhBsCIkvyi4`;
  const placeDetailsUrl = `${url}${placeIdParam}${apiKey}`;
  console.log(placeDetailsUrl);

  try {
    const response = await fetch(placeDetailsUrl);
    const result = await response.json();
    return result.result;
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
};

export default function useRestaurants() {
  const [restaurantList, setRestaurantList] = useState([]);
  const { latitude, longitude } = useLocation();

  useEffect(() => {
    const fetchNearbyRestaurants = async () => {
      if (latitude && longitude) {
        try {
          const cache = await AsyncStorage.getItem(CACHE_KEY);
          const cachedTime = await AsyncStorage.getItem(`${CACHE_KEY}_time`);

          if (
            cache &&
            cachedTime &&
            Date.now() - parseInt(cachedTime) < CACHE_EXPIRATION
          ) {
            setRestaurantList(JSON.parse(cache));
            console.log("Using cached data");
          } else {
            const restaurants = await fetchRestaurants(latitude, longitude);
            const detailedRestaurants = await Promise.all(
              restaurants.map(async (restaurant) => {
                const details = await fetchRestaurantDetails(
                  restaurant.place_id
                );
                return { ...restaurant, ...details };
              })
            );
            setRestaurantList(detailedRestaurants);
            await AsyncStorage.setItem(
              CACHE_KEY,
              JSON.stringify(detailedRestaurants)
            );
            await AsyncStorage.setItem(
              `${CACHE_KEY}_time`,
              Date.now().toString()
            );
            console.log("Using fetched data");
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchNearbyRestaurants();
  }, [latitude, longitude]);

  return restaurantList;
}
