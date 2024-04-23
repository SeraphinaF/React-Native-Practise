import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import StoryblokClient from "storyblok-js-client";
import ArticleDetails from "./components/ArticleDetails";

const Stack = createNativeStackNavigator();

const Storyblok = new StoryblokClient({
  accessToken: "ST45V030TD0vJSvinA2aQgtt",
});

export default function App() {
  const [articles, setArticles] = useState([]);
  const [richTextContent, setRichTextContent] = useState("");

  useEffect(() => {
    Storyblok.getAll("cdn/stories", {
      starts_with: "articles/",
    })
      .then((response) => {
        setArticles(response);
        const s = Storyblok.richTextResolver.render(response[2].content.text);
        setRichTextContent(s);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
     contentStyle:{
       backgroundColor:'#FFFFFF'
     }
  }}  initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
          }}
        >
          {(props) => <HomeScreen {...props} articles={articles} />}
        </Stack.Screen>
        <Stack.Screen
          name="Details"
          options={{
            headerShown: false,
          }}>
          {(props) => <ArticleDetails {...props} articles={articles} richTextContent={richTextContent} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
