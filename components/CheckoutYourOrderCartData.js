import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Button, ListItem, CheckBox, Body, Card } from "native-base";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";

class CheckoutYourOrderCartData extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.state;
    const {} = this.props;

    return (
      <View style={{ marginTop: 10 }}>
        <View
          style={{
            width: "95%",
            alignSelf: "center",
            marginTop: 10
          }}
        >
          {this.props.user &&
          this.props.user.CartData &&
          Object.keys(this.props.user.CartData).length == 0 ? (
            <View>
              <Card style={{ height: 200, justifyContent: "center" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }}
                >
                  <TouchableOpacity>
                    <Text style={{ color: "gray" }}>
                      There is no item available in this cart right now
                    </Text>
                  </TouchableOpacity>
                </View>
              </Card>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              {this.props.user &&
                this.props.user.CartData &&
                Object.values(this.props.user.CartData).map((value, index) => {
                  if (value !== "") {
                    return (
                      <View key={value.id}>
                        <Card>
                          <Image
                            source={{ uri: value.image }}
                            style={{ height: 200 }}
                            resizeMode="cover"
                          />
                          <View style={{ flexDirection: "column" }}>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between"
                              }}
                            >
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  marginLeft: 10,
                                  marginTop: 10,
                                  color: "#ff6801"
                                }}
                              >
                                {Number(value.sale_price) > 0
                                  ? `Rs : ${value.sale_price}`
                                  : `Rs : ${value.cost_price}`}
                              </Text>
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  // fontSize: 12,
                                  textDecorationLine: "line-through",
                                  marginRight: 10,
                                  marginTop: 10,
                                  color: "#ff6801"
                                }}
                              >
                                {Number(value.sale_price) > 0
                                  ? `Rs : ${value.cost_price}`
                                  : ``}
                              </Text>
                            </View>
                          
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "flex-end"
                              }}
                            >
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  marginLeft: 10,
                                  marginTop: 5,
                                  color: "#1A5CAD"
                                }}
                              >
                                {value.name}
                              </Text>
                            </View>
                          
                            <View style={{ width: "90%" }}>
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  marginLeft: 10,
                                  marginTop: 3,
                                  color: "black"
                                }}
                              >
                                {`Description: `}
                              </Text>
                              <Text
                                style={{
                                  marginLeft: 10,
                                  marginTop: 2,
                                  color: "black"
                                }}
                              >
                                {`${value.description}`}
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
                                  flexDirection: "column",
                                  justifyContent: "flex-start",
                                  marginLeft: 10
                                }}
                              >
                                <Counter
                                  counterState={this.counterState}
                                  value={value}
                                  location="Cart"
                                />
                              </View>

                              <View
                                style={{
                                  flexDirection: "column",
                                  marginTop: 20,
                                  marginRight: 15
                                }}
                              >
                                <TouchableOpacity
                                  onPress={() =>
                                    this._toggleModal("remove", value.id)
                                  }
                                >
                                  <Text style={{ color: "red" }}>Remove</Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </Card>
                      </View>
                    );
                  }
                })}
            </View>
          )}
        </View>
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
)(CheckoutYourOrderCartData);
