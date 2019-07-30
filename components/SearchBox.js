import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Input, Item, Icon } from "native-base";

class SearchBox extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          borderWidth: 0.5,
          borderRadius: 20,
          width: "90%",
          marginLeft: "5%",
          marginTop: 10,
          height: 40,
          backgroundColor: "#E8EAED"
        }}
      >
        <Item style={{ width: "90%" }}>
          <Input
            placeholder="Search"
            value={this.state.search}
            onChangeText={search => this.setState({ search })}
          />
          <TouchableOpacity
            onPress={() => this.search()}
            style={{
              borderLeftWidth: 1,
              paddingLeft: 10,
              borderLeftColor: "darkgray"
            }}
          >
            <Icon name="ios-search" style={{ fontSize: 28 }} />
          </TouchableOpacity>
        </Item>
      </View>
    );
  }
}

export default SearchBox;
