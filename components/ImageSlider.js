import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  SafeAreaView,
  Image
} from "react-native";
import ImageSlider from "react-native-image-slider";
import { BANNERS } from "../Api";

class Slider extends Component {
  state = {
    data: []
  };

  componentWillMount() {
    fetch(`${BANNERS}`)
      .then(response => response.json())
      .then(response => {
        response.map(value =>
          this.setState(prevState => ({
            data: [...prevState.data, value.banner]
          }))
        );
      })
      .catch(error => {
        console.log("Error banner", error);
      });
  }

  render() {
    const { data } = this.state;
    const images = data;

    return (
      <SafeAreaView style={styles.containers}>
        <ImageSlider
          loop
          autoPlayWithInterval={3000}
          images={images}
          onPress={({ index }) => alert(index)}
          customSlide={({ index, item, style, width }) => (
          
            <View
              key={index}
              style={[
                style,
                styles.customSlide,
                { backgroundColor: index % 2 === 0 ? "" : "" }
              ]}
            >
              <Image source={{ uri: item }} style={styles.customImage} />
            </View>
          )}
          customButtons={(position, move) => (
            <View style={styles.buttons}>
              {images.map((image, index) => {
                return (
                  <TouchableHighlight
                    key={index}
                    underlayColor="#ccc"
                    onPress={() => move(index)}
                    style={styles.button}
                  >
                    <Text
                      style={position === index && styles.buttonSelected}
                      style={{ fontWeight: "bold", fontSize: 25 }}
                    >
                      {/* {index + 1} */}.
                    </Text>
                  </TouchableHighlight>
                );
              })}
            </View>
          )}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    justifyContent: "flex-start",
    height: 250
  },
  content1: {
    width: "100%",
    height: 50,
    marginBottom: 10,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center"
  },
  content2: {
    width: "100%",
    height: 100,
    marginTop: 10,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center"
  },
  contentText: { color: "#fff" },
  buttons: {
    zIndex: 1,
    height: 15,
    marginTop: -25,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  buttonSelected: {
    opacity: 1,
    color: "red"
  },
  customSlide: {
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    height: 250
  },
  customImage: {
    width: "100%",
    height: "100%"
  }
});

export default Slider;
