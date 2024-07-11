import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from "./screens/MapScreen";
import SettingsScreen from "./components/DarkModeSwitch";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import StackNavigator from "./components/StackNavigator";
import { FavoritesProvider } from "./components/FavoritesContext";
import { ThemeProvider, ThemeContext } from "./components/ThemeContext";
import FavoritesScreen from "./screens/FavoritesScreen";
import { StatusBar } from "react-native";

const Tab = createBottomTabNavigator();

function MyTabs() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <StatusBar barStyle={theme.darkMode ? "light-content" : "dark-content"} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            } else if (route.name === "Map") {
              iconName = focused ? "map" : "map-outline";
            } else if (route.name === "Favorites") {
              iconName = focused ? "favorite" : "favorite-outline";
            }
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.iconFocused,
          tabBarInactiveTintColor: theme.iconUnFocused,
          headerShown: false,
          tabBarStyle: {
            height: 90,
            paddingHorizontal: 5,
            paddingTop: 0,
            backgroundColor: theme.backgroundColor,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={StackNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="map" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="favorite" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
