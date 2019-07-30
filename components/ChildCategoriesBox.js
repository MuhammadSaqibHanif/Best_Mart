import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Card } from "native-base";
import Products from "../components/Products";

class ChildCategoriesBox extends Component {
  render() {
    const {
      values,
      showInitialData,
      data,
      navigate,
      showChildData
    } = this.props;

    const childData = data;

    return (
      <View>
        {showChildData ? (
          childData ? (
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
                    borderBottomWidth: 0,
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
                    style={{ height: 150, width: "100%", flex: 1 }}
                    resizeMode="center"
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
                      {value.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Card style={{ height: 100, justifyContent: "center" }}>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <Text style={{ color: "gray", fontSize: 18 }}>
                  No Item Available
                </Text>
              </View>
            </Card>
          )
        ) : showInitialData && values ? (
          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
            {values.map(value => (
              <TouchableOpacity
                key={value.id}
                style={{
                  width: "49%",
                  height: 130,
                  borderWidth: 1,
                  borderRadius: 2,
                  borderColor: "#ddd",
                  borderBottomWidth: 0,
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
                    childData: values,
                    navigate
                  })
                }
              >
                <Image
                  source={{ uri: value.image }}
                  style={{ height: 150, width: "100%", flex: 1 }}
                  resizeMode="center"
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
                    {value.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Card style={{ height: 100, justifyContent: "center" }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Text style={{ color: "gray", fontSize: 18 }}>
                No Item Available
              </Text>
            </View>
          </Card>
        )}
        <Products Heading="Also View" navigate={navigate} />
      </View>
    );
  }
}

export default ChildCategoriesBox;
