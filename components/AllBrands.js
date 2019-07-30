import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    fetch(`https://bestmart.com.pk/best_mart/api/get/all-brands`)
      .then(resp => resp.json())
      .then(response => {
        if (response[0].id) {
          this.setState({
            data: response
          });
        }
      })
      .catch(() => {});
  }

  render() {
    const { data } = this.state;

    return (
      <ScrollView horizontal={true} style={{ backgroundColor: "red" }}>
        {data != null &&
          data.map((value, index) => (
            <View
              style={{
                padding: 10,
                width: Dimensions.get("window").width / 4
              }}
              key={index}
            >
              <Image
                source={{ uri: value.image }}
                style={{ flex: 1, height: 50, width: 50 }}
                resizeMode="center"
              />
            </View>
          ))}
      </ScrollView>
    );
  }
}

export default Products;
