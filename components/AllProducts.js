import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Root } from "native-base";
import { Divider } from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";
import { PRODUCTS } from "../Api";

class Products extends Component {
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

    fetch(`${PRODUCTS}`)
      .then(resp => resp.json())
      .then(response => {
        // console.log("response get_allproducts", response)
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

  navigateFunc = (id, value, navigate, data) => {
    this.setState({
      loading: true
    });

    fetch(
      `https://bestmart.com.pk/bestmart_api/Get/get_product_details.php?product_id=${id}`
    )
      .then(res => res.json())
      .then(response => {
        // console.log("response get_product_details", response)

        this.setState({
          loading: false
        });

        if (response[0].name) {
          this.props.navigate("ProductView", { response });
        }
      })
      .catch(() => {
        this.setState({
          loading: false
        });
      });
  };

  render() {
    const { Heading, navigate } = this.props;
    const { data, loading } = this.state;

    return (
      <Root style={{ backgroundColor: "#3D3B48" }}>
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{
            color: "#FFF"
          }}
        />
        <View>
          <View>
            <Text
              style={{
                fontSize: 22,
                color: "black",
                marginTop: 10,
                marginLeft: 10
              }}
            >
              {Heading}
            </Text>
          </View>
          <Divider
            style={{
              backgroundColor: "black",
              marginLeft: 5,
              marginRight: 5,
              marginBottom: 5
            }}
          />
          {data != null && (
            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
              {data.map(
                (value, index) =>
                  index < 50 && (
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
                      onPress={() =>
                        this.navigateFunc(value.id, value, navigate, data)
                      }
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
                          PKR {value.selling_price}.00
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )
              )}
            </View>
          )}
        </View>
      </Root>
    );
  }
}

export default Products;
