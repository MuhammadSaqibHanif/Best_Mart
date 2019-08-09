import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { PROMOTION } from "../Api";

class DealsDiscountsProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });

    fetch(`${PROMOTION}`)
      .then(resp => resp.json())
      .then(response => {
        // console.log("promotions >>>", response)
        if (response[0].name) {
          this.setState({
            data: response
          });
        }

        this.setState({
          loading: false
        });
      })
      .catch(() => {
        this.setState({
          loading: false
        });
      });
  }

  navigateFunc = id => {
    this.setState({
      loading: true
    });

    fetch(
      `https://bestmart.com.pk/bestmart_api/Get/get_product_details.php?product_id=${id}`
    )
      .then(res => res.json())
      .then(response => {
        // console.log("get_product_details >>>", response)

        this.setState({
          loading: false
        });

        if (response[0].name) {
          this.props.navigate("ProductView", {
            response,
            address: "DealsDiscountsProducts"
          });
        }
      })
      .catch(() => {
        this.setState({
          loading: false
        });
      });
  };

  render() {
    const { Heading } = this.props;
    const { data, loading } = this.state;

    return (
      <View style={{ backgroundColor: "white" }}>
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{
            color: "#FFF"
          }}
        />
        <View>
          <View style={{ alignSelf: "center", marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 22,
                color: "red",
                marginTop: 10,
                marginLeft: 10,
                fontWeight: "bold"
              }}
            >
              {Heading}
            </Text>
          </View>

          {data != null && (
            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
              {data.map((value, index) => (
                <TouchableOpacity
                  key={index}
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
                    source={{
                      uri: `https://bestmart.com.pk/assets/img/product/${value.id}_${value.image}`
                    }}
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
                        marginLeft: 3,
                        marginRight: 2,
                        marginBottom: 2,
                        marginTop: 5,
                        fontSize: 14,
                        color: "gray"
                      }}
                    >
                      {value.description}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <Text
                      adjustsFontSizeToFit={true}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        textAlignVertical: "center",
                        textAlign: "left",
                        marginLeft: 3,
                        marginBottom: 2,
                        marginTop: 5,
                        fontSize: 14
                      }}
                    >
                      PKR {value.selling_price}.00
                    </Text>

                    {Number(value.old_price) > 0 && (
                      <Text
                        adjustsFontSizeToFit={true}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          textAlignVertical: "center",
                          textAlign: "left",
                          textDecorationLine: "line-through",
                          marginRight: 3,
                          marginBottom: 2,
                          marginTop: 5,
                          fontSize: 12,
                          color: "gray",
                          fontWeight: "bold"
                        }}
                      >
                        PKR {value.old_price}.00
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default DealsDiscountsProducts;
