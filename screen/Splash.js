import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Text
} from "react-native";

class Splash extends React.Component {
  //   static navigationOptions = {
  //     header: null
  //   }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={{ fontSize: 40, fontWeight: "500", color: "white" }}>
          BEST MART
        </Text> */}
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
    // marginTop: 22,
    backgroundColor: "#E31E25",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Splash;
