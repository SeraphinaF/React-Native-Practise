import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RestaurantDetailsScreen from "../screens/RestaurantDetailsScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();
export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="RestaurantDetails"
          component={RestaurantDetailsScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
