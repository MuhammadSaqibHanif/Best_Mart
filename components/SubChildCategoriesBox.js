import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Card } from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import { DETAIL_PRODUCT } from "../Api";

class SubChildCategoriesBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  navigateFunc = id => {
    this.setState({
      loading: true
    });

    fetch(`${DETAIL_PRODUCT}?product_id=${id}`)
      .then(res => res.json())
      .then(response => {
        this.setState({
          loading: false
        });
        if (response[0].id) {
          this.props.navigate("ProductView", { response });
        }
      })
      .catch(error => {
        console.error(error);
        this.setState({
          loading: false
        });
      });
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
  
    return (
      <View>
        <Spinner
          visible={this.state.loading}
          textContent={"Loading..."}
          textStyle={{
            color: "#FFF"
          }}
        />
        {showChildData ? (
          childData ? (
            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
              {childData.map(value => (
                <TouchableOpacity
                  key={value.id}
                  style={{
                    width: "49%",
                    height: 200,
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
                    resizeMode="contain"
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
                  height: 200,
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
