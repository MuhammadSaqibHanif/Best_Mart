import React, { Component } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Card, CardItem } from "native-base";
// import { Card, Button } from "react-native-elements";

class CategoriesProducts extends Component {
  state = {
    data: []
  };

  componentWillMount() {
    fetch("https://www.isales.pk/api/parent_categories.php")
      .then(response => response.json())
      .then(response =>
        this.setState({
          data: response
        })
      )
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { Heading, navigate } = this.props;
    const { data } = this.state;

    return (
      <View style={{ flexDirection: "column" }}>
        <View>
          <Text
            style={{
              fontSize: 20,
              color: "gray",
              marginTop: 10,
              marginLeft: 10
            }}
          >
            {Heading}
          </Text>
        </View>
       
          
      
      </View>
    );
  }
}

export default CategoriesProducts;
