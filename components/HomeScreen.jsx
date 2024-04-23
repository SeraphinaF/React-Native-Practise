import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Empty from "./Empty";
import ArticleCards from "./ArticleCards";
import Categories from "./Categories";

const HomeScreen = ({ navigation, articles }) => {
  return (
    <View style={styles.pageContainer}>
      <FlatList
        ListEmptyComponent={Empty}
        data={articles}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Text> Welcome to my Blog</Text>
            <Text>Here, you'll find a lot of stuff about everything.</Text>
            <Categories 
            categorytitle/>
          </View>
        }
        renderItem={({ item }) => {
          console.log(articles)
          return (
            <Pressable
              onPress={() => {
                navigation.navigate("Details", {
                  id: item.id,
                  title: item.name,
                  published_at: item.published_at,
                  subheadline: item.subheadline,
                  description: item.content.teaser,
                  image: item.content.image.filename,
                });
              }}
            >
              <ArticleCards
                title={item.name}
                published_at={item.published_at}
                description={item.content.teaser}
                image={item.content.image.filename}
              />
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#fffff",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
});
