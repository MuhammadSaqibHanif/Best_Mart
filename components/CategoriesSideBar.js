import React, { Component } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { Card } from "native-base";

class CategoriesSideBar extends Component {
  render() {
    const { data, getCategoriesId } = this.props;

    return (
      <View>
        {data.map(value => (
          <TouchableOpacity
            key={value.id}
            onPress={() => getCategoriesId(value)}
          >
            <Card style={{ marginTop: -3 }}>
              <View
                style={{ flex: 1, marginLeft: 5, marginRight: 5, marginTop: 5 }}
              >
                <Image
                  style={{ height: 60 }}
                  source={{ uri: value.image }}
                  resizeMode="contain"
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Text
                    adjustsFontSizeToFit={true}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      color: "gray"
                    }}
                  >
                    {value.category}
                  </Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

export default CategoriesSideBar;
