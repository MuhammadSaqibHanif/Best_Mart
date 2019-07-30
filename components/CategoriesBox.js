import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Card } from "native-base";

class CategoriesBox extends Component {
  render() {
    const { navigate, childData, showchildData } = this.props;

    return (
      <View>
        {showchildData ? (
          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
            {childData.map(value => (
              <TouchableOpacity
                key={value.id}
                style={{
                  width: "49%",
                  height: 130,
                  borderWidth: 1,
                  borderRadius: 2,
                  borderColor: "#ddd",
                  borderBottomWidth: 1,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 1,
                  marginLeft: 1,
                  marginRight: 1,
                  marginTop: 2
                }}
                onPress={() =>
                  navigate("SubChildCategories", {
                    value,
                    childData,
                    navigate
                  })
                }
              >
                <Image
                  source={{ uri: value.image }}
                  style={{ flex: 1 }}
                  resizeMode="cover"
                />
                <View>
                  <Text
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      textAlignVertical: "center",
                      textAlign: "center",
                      marginLeft: 4,
                      marginRight: 4,
                      marginBottom: 2
                    }}
                  >
                    {value.sub_category}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Card style={{ height: 100, justifyContent: "center" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <Text style={{ color: "gray", fontSize: 18 }}>
                Select Any Category
              </Text>
            </View>
          </Card>
        )}
      </View>
    );
  }
}

export default CategoriesBox;
