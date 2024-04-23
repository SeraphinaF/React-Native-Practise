import * as React from "react";
import { Pressable, StyleSheet, Text, View, ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import HTML from "react-native-render-html";

const ArticleDetails = ({ route, navigation, richTextContent }) => {
  const { id, title, description, image, subheadline} = route.params;

  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground source={{ uri: image }} style={styles.image}>
          <View style={styles.overlay} />
          <Text style={styles.title}>{title}</Text>
        </ImageBackground>
        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
        <View style={styles.textContainer}>
          <Text style={styles.description}>{description}</Text>
          <Text>{subheadline}</Text>
          <HTML source={{ html: richTextContent }} />
        </View>
      </View>
    </ScrollView>
  );
};

export default ArticleDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 300,
    justifyContent: "flex-end",
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)", 
    borderRadius: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "500",
    color: "white",
    margin: 10,
  },
  textContainer: {
    marginHorizontal: 20,
  },
  description: {
    marginTop: 10,
    color: "black", 
  },
  button: {
    position: "absolute",
    top: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});
