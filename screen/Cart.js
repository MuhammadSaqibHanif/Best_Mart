import React, { Component } from "react";
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { Card, Header, Body, Button } from "native-base";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";
import Modal from "react-native-modal";
import Counter from "../components/Counter";
import Spinner from "react-native-loading-spinner-overlay";

class Cart extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      id: "",
      whichModal: false,
      click: "1",
      product_id: [],
      price: [],
      quantity: [],
      grandTotal: 0,
      loading: false
    };
  }

  _toggleModal = (flag, id) =>
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      whichModal: flag,
      id
    });

  _goToCheckout = () => {
    this.props.user && this.props.user.CartData
      ? Object.values(this.props.user.CartData).map((value, index) => {
          const quantityClick =
            this.state[`click${value.id}`] == undefined
              ? 1
              : this.state[`click${value.id}`];

          const thisPrice = Number(value.selling_price) * Number(quantityClick);

          this.setState(prevState => ({
            product_id: [...prevState.product_id, value.id],
            quantity: [...prevState.quantity, quantityClick],
            price: [...prevState.price, thisPrice],
            grandTotal:
              Number(prevState.grandTotal) +
              Number(thisPrice) 
          }));

          if (Object.keys(this.props.user.CartData).length == index + 1) {
            this.setState({ ready: "Yes" }, () => {
              this.props.navigation.navigate("Checkout", {
                perProductQuantities: this.state.quantity,
                grandTotal: this.state.grandTotal,
                product_id: this.state.product_id,
                price: this.state.price
              });
              this.setState({
                product_id: "",
                quantity: "",
                price: "",
                grandTotal: ""
              });
            });
          }
        })
      : alert("Select a Product Please!");
  };

  removeCart(key) {
    let id = key.toString();

    let target = "Cart" + id;
    delete this.props.user.CartData[target];

    this.props.updateUser({
      UserId: this.props.user.UserId,
      userData: this.props.user.userData,
      CartData: {
        ...this.props.user.CartData
      }
    });

    this._toggleModal();
  }

  counterState = (click, id, which) => {
    console.log(click);
    console.log(id);

    which == "inc" && this.state[`click${id}`]
      ? this.setState(prevState => ({
          [`click${id}`]: Number(prevState[`click${id}`]) + 1
        }))
      : this.setState(prevState => ({
          [`click${id}`]: Number(click)
        }));

    which == "dec" && this.state[`click${id}`]
      ? this.state[`click${id}`] > 1 &&
        this.setState(prevState => ({
          [`click${id}`]: Number(prevState[`click${id}`]) - 1
        }))
      : this.state[`click${id}`] > 1 &&
        this.setState(prevState => ({
          [`click${id}`]: Number(click)
        }));
  };

  render() {
    const { loading, whichModal, id } = this.state;

    return (
      <View style={{ marginTop: 22, flex: 1 }}>
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{
            color: "#FFF"
          }}
        />
        <Header style={{ backgroundColor: "#3D3B48" }}>
          <Body
            style={{
              flex: 1,
              justifyContent: "flex-start",
              flexDirection: "row",
              marginLeft: 10
            }}
          >
            <View>
              <Text style={{ fontSize: 22, color: "white", fontWeight: "500" }}>
                My Cart
              </Text>
            </View>
          </Body>

          <TouchableOpacity
            onPress={() => this._goToCheckout()}
            style={{
              backgroundColor: "red",
              alignSelf: "center",
              width: 100,
              height: "50%"
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "auto",
                marginTop: "auto",
                textAlignVertical: "center"
              }}
            >
              Check Out
            </Text>
          </TouchableOpacity>
        </Header>
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
          <ScrollView style={{ flex: 1 }}>
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
                          resizeMode="contain"
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
                              {Number(value.selling_price) > 0
                                ? `PKR ${value.selling_price}.00`
                                : `PKR ${value.selling_price}.00`}
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
                              {Number(value.old_price) > 0
                                ? `Rs : ${value.old_price}`
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
          </ScrollView>
        )}
        <Modal isVisible={this.state.isModalVisible} backdropColor="white">
          {whichModal == "checkOut" && (
            <View>
              <View>
                {/* <Item>
                    <Input
                      placeholder="First Name"
                      value={firstName}
                      onChangeText={text => this.setState({ firstName: text })}
                    />
                  </Item>
                  <Item>
                    <Input
                      placeholder="Last Name"
                      value={lastName}
                      onChangeText={text => this.setState({ lastName: text })}
                    />
                  </Item>
                  <Item>
                    <Input
                      placeholder="Phone"
                      value={phone}
                      onChangeText={text => this.setState({ phone: text })}
                    />
                  </Item>
                  <Item>
                    <Input
                      placeholder="Address"
                      value={address}
                      onChangeText={text => this.setState({ address: text })}
                    />
                  </Item> */}
                <Button
                  block
                  onPress={() => this.checkOut()}
                  style={{ backgroundColor: "#ff6801", marginBottom: 40 }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 18,
                      textAlign: "center"
                    }}
                  >
                    Confirm Check Out
                  </Text>
                </Button>
                <Button block onPress={this._toggleModal}>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 18,
                      textAlign: "center"
                    }}
                  >
                    Cancel
                  </Text>
                </Button>
              </View>
            </View>
          )}
          {whichModal == "remove" && (
            <View>
              <Button
                block
                onPress={() => this.removeCart(id)}
                style={{ backgroundColor: "#ff6801", marginBottom: 40 }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 18,
                    textAlign: "center"
                  }}
                >
                  Confirm Remove
                </Text>
              </Button>
              <Button block onPress={this._toggleModal}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 18,
                    textAlign: "center"
                  }}
                >
                  Cancel
                </Text>
              </Button>
            </View>
          )}
          {whichModal == "loginOrGuest" && (
            <View>
              <Button
                block
                onPress={() => this.removeCart(id)}
                style={{ backgroundColor: "#ff6801", marginBottom: 40 }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 18,
                    textAlign: "center"
                  }}
                >
                  Confirm Remove
                </Text>
              </Button>
              <Button block onPress={this._toggleModal}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 18,
                    textAlign: "center"
                  }}
                >
                  Cancel
                </Text>
              </Button>
            </View>
          )}
        </Modal>
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
)(Cart);
