import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Card } from "native-base";

class SubChildCategoriesBox extends Component {
  navigateFunc = id => {
    fetch(
      `https://bestmart.com.pk/bestmart_api/Get/get_product_details.php?product_id=${id}`
    )
      .then(res => res.json())
      .then(response => {
        if (response[0].id) {
          this.props.navigate("ProductView", { response });
        }
      })
      .catch(error => console.error(error));
  };

  render() {
    const {
      values,
      showInitialData,
      data,
      showChildData,
      navigate
    } = this.props;

    const childData = data;

    // console.log('childData SubChildCategoriesBox', childData)

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
                  onPress={() => this.navigateFunc(value.id)}
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
                        textAlign: "left",
                        marginLeft: 5,
                        marginRight: 5,
                        marginBottom: 2
                      }}
                    >
                      {value.name}
                    </Text>
                    <Text
                      adjustsFontSizeToFit={true}
                      style={{
                        textAlignVertical: "center",
                        textAlign: "left",
                        marginLeft: 5,
                        marginBottom: 2,
                        marginTop: 2,
                        color: "red",
                        fontSize: 12
                      }}
                    >
                      {`PKR ${value.selling_price}.00`}
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
                onPress={() => this.navigateFunc(value.id)}
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
                      textAlign: "left",
                      marginLeft: 5,
                      marginRight: 5,
                      marginBottom: 2
                    }}
                  >
                    {value.name}
                  </Text>
                  <Text
                    adjustsFontSizeToFit={true}
                    style={{
                      textAlignVertical: "center",
                      textAlign: "left",
                      marginLeft: 5,
                      marginBottom: 2,
                      marginTop: 2,
                      color: "red",
                      fontSize: 12
                    }}
                  >
                    {`PKR ${value.selling_price}.00`}
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
      </View>
    );
  }
}

export default SubChildCategoriesBox;
