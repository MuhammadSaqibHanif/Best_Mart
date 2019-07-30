import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import { Card, Button, Header, Left, Icon, Body } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";

class ProductView extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      showActivityIndicator: false
    };
  }

  _storeData = (key, item) => {
    const id = key.toString();

    this.props.user && this.props.user.UserId
      ? this.props.updateUser({
          UserId: this.props.user.UserId,
          userData: this.props.user.userData,
          CartData: {
            ...this.props.user.CartData,
            [`Cart${id}`]: item
          },
          productCount: this.state.productCount + 1
        })
      : this.props.user && this.props.user.CartData
      ? this.props.updateUser({
          CartData: {
            ...this.props.user.CartData,
            [`Cart${id}`]: item
          }
        })
      : this.props.updateUser({
          CartData: {
            [`Cart${id}`]: item
          }
        });

    setTimeout(() => {
      this.setState({
        showActivityIndicator: false
      });
      this.props.navigation.navigate("Cart", { cartProp: id });
    }, 2000);
  };

  render() {
    const { showActivityIndicator } = this.state;
    const { response } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <Header style={{ backgroundColor: "#3D3B48" }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon type="AntDesign" name="arrowleft" />
            </Button>
          </Left>
          <Body
            style={{
              flex: 1,
              justifyContent: "flex-start",
              flexDirection: "row",
              marginLeft: 10
            }}
          >
            <Text style={{ fontSize: 22, color: "white", fontWeight: "500" }}>
              Product Detail
            </Text>
          </Body>
        </Header>
        <ScrollView>
          <ImageBackground
            source={{ uri: response[0].image }}
            style={{ flex: 1, height: 300 }}
            resizeMode="contain"
          />

          <View>
            <Card>
              <View style={{ flexDirection: "column" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignSelf: "center",
                    width: "90%"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "bold",
                      marginTop: 10,
                      color: "#ff6801"
                    }}
                  >
                    PKR {response[0].selling_price}.00
                  </Text>
                  {response[0].old_price != "" && (
                    <Text
                      style={{
                        textDecorationLine: "line-through",
                        fontSize: 22,
                        fontWeight: "bold",
                        marginTop: 10,
                        color: "#ff6801"
                      }}
                    >
                      PKR {response[0].old_price}.00
                    </Text>
                  )}
                </View>
                {showActivityIndicator && (
                  <ActivityIndicator size="large" color="#00ff00" />
                )}
                <View
                  style={{ flexDirection: "column", alignItems: "flex-end" }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      textDecorationLine: "line-through",
                      marginRight: 10,
                      marginTop: 10,
                      color: "#ff6801"
                    }}
                  >
                    {/* {Number(response[0].sale_price) > 0
                        ? `Rs : ${response[0].cost_price}`
                        : ""} */}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginLeft: 10,
                      marginTop: 5,
                      color: "#1A5CAD"
                    }}
                  >
                    {response[0].name}
                  </Text>
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginLeft: 10,
                      marginTop: 5,
                      color: "gray"
                    }}
                  >
                    Availability:{" "}
                    {response[0]
                      .quantity == "0" ? "Out of stock" : "In Stock"}
                  </Text>
                </View>

                <View style={{ width: "90%" }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginLeft: 10,
                      marginTop: 10,
                      color: "black"
                    }}
                  >
                    Description :
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      marginLeft: 10,
                      marginTop: 2,
                      color: "black"
                    }}
                  >
                    {`${response[0].description}`}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      marginBottom: 5,
                      marginLeft: 10
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          showActivityIndicator: true
                        });
                        this._storeData(response[0].id, response[0]);
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#1A5CAD",
                          fontWeight: "bold",
                          marginTop: 5
                        }}
                      >
                        Cart it
                      </Text>
                    </TouchableOpacity>
                    <Image
                      source={require("../images/shopping-cart.png")}
                      style={{ width: 20, height: 20, marginTop: 5 }}
                    />
                  </View>
                </View>
              </View>
            </Card>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22
  }
});
