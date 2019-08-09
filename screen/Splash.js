import React from "react";
import { View, StyleSheet, Image } from "react-native";

class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../images/bestmart-back.png")}
          resizeMode="center"
          style={{ height: 300, width: 300 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E31E25",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Splash;
