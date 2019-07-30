import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Toast, Root } from "native-base";
import { Divider } from "react-native-elements";

class ProductsDO extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    fetch("https://bestmart.com.pk/best_mart/api/get/parent-categories")
      .then(res => res.json())
      .then(respons => {
        if (respons[0].id) {
          respons.map(val => {
            if (val.name == "Inside Out") {
              fetch(
                `https://bestmart.com.pk/best_mart/api/get/child-categories/${
                  val.id
                }`
              )
                .then(resp => resp.json())
                .then(response => {
                  if (response[0].id) {
                    this.setState({
                      data: response
                    });
                  }
                })
                .catch(() => {
                  // Toast.show({
                  //   text: "Network Error",
                  //   position: "bottom",
                  //   duration: 3000
                  // });
                });
            }
          });
        }
      })
      .catch(() => {
        // Toast.show({
        //   text: "Network Error",
        //   position: "bottom",
        //   duration: 3000
        // })
      });
  }

  navigateFunc = (id, value, navigate, data) => {
    fetch(
      `https://bestmart.com.pk/best_mart/api/get/products-by-category/${id}`
    )
      .then(res => res.json())
      .then(response => {
        if (response[0].id) {
          navigate("SubChildCategories", {
            value: value,
            childData: data,
            navigate: navigate,
            response: response
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { Heading, navigate } = this.props;
    const { data } = this.state;

    return (
      <Root>
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
              {data.map(value => (
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
                    this.navigateFunc(value.id, value, navigate, data)
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
                        textAlign: "left",
                        marginLeft: 3,
                        marginRight: 2,
                        marginBottom: 2,
                        marginTop: 5,
                        fontSize: 14,
                        color: "gray"
                      }}
                    >
                      {value.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </Root>
    );
  }
}

export default ProductsDO;
