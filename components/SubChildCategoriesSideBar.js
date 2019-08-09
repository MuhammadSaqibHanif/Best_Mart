import React, { Component } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { Card } from "native-base";

class ChildCategoriesSideBar extends Component {
  render() {
    const { childData, getSubCategoriesId } = this.props;

    return (
      <View>
        {childData.map(val => (
          <TouchableOpacity
            key={val.id}
            onPress={() => getSubCategoriesId(val.sub_category)}
          >
            <Card style={{ marginTop: -3 }}>
              <View
                style={{ flex: 1, marginLeft: 5, marginRight: 5, marginTop: 5 }}
              >
                <Image
                  style={{ height: 60 }}
                  source={{ uri: val.image }}
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
                    {val.sub_category}
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

export default ChildCategoriesSideBar;
