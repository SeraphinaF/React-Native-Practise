import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const ArticleCards = ({ navigation, route, title, description, published_at, image, id }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={4} ellipsizeMode="tail">{description}</Text>
        </View>
      </View>
    </View>
  );
};

export default ArticleCards;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    margin: 6,
    borderRadius: 20,
    padding: 16,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "600",
  },
  description: {
    marginBottom: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
