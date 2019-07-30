import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";
import {
  Card,
  Header,
  Body,
  Button,
  Toast,
  Root,
  Item,
  Input
} from "native-base";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";
import Counter from "../components/Counter";
import Modal from "react-native-modal";
import { Constants } from "expo";
import Products from "../components/Products";

class Cart extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      // address: "",
      firstName: "",
      lastName: "",
      phone: "",
      name: [],
      model: [],
      isModalVisible: false,
      whichModal: false,
      id: "",
      click: "1",
      idClick: {},
      checkOutArray: {},
      product_id: [],
      price: [],
      type: [],
      quantity: [],
      grandTotal: 0,
      buyer_id: "",
      // ip_address: "",
      total: []
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
          const thisPrice = value.selling_price;

          const quantityClick =
            this.state[`click${value.id}`] == undefined
              ? 1
              : this.state[`click${value.id}`];

          this.setState(prevState => ({
            product_id: [...prevState.product_id, value.id],
            quantity: [...prevState.quantity, quantityClick],
            price: [...prevState.price, thisPrice],
            grandTotal:
              Number(prevState.grandTotal) +
              Number(thisPrice) * Number(quantityClick)
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

  checkOut = () => {
    console.log("this.props.userCartData))))))))", this.props.user);

    let deviceSerial = null;
    try {
      deviceSerial = Constants.deviceId;
      console.log("DEVICE ID FOUND: " + deviceSerial);
    } catch (e) {
      console.log("error reading device ID");
    }

    this.props.user && this.props.user.UserId
      ? Object.values(this.props.user.CartData).map((value, index) => {
          const thisPrice =
            Number(value.sale_price) > 0 ? value.sale_price : value.cost_price;
          const quantityClick =
            this.state[`click${value.id}`] == undefined
              ? 1
              : this.state[`click${value.id}`];

          let perTotal = Number(thisPrice) * Number(quantityClick);

          this.setState(prevState => ({
            product_id: [...prevState.product_id, value.id],
            // name: [...prevState.name, value.name],
            // model: [...prevState.model, value.model],
            type: [...prevState.price, value.type],
            price: [...prevState.price, thisPrice],
            quantity: [...prevState.quantity, quantityClick],
            total: [...prevState.total, perTotal],
            grandTotal:
              Number(prevState.grandTotal) +
              Number(thisPrice) * Number(quantityClick)
          }));

          if (Object.keys(this.props.user.CartData).length == index + 1) {
            this.setState({ ready: "Yes" }, () => {
              // console.log("reponse  cart ************", this.state);
              fetch(
                `https://bestmart.com.pk/bestmart_api/Post/checkout.php?user_id=${this.props.user.UserId}&username=${this.props.user.userData.name}&company_name=${this.props.user.userData.company_name}&address=${this.props.user.userData.address}&country=${this.props.user.userData.country}&city=${this.props.user.userData.city}&state=${this.props.user.userData.city}&delivery_time=${this.props.user.userData.city}&email=${this.props.user.userData.email}&phone=${this.props.user.userData.contact_no}&order_notes=${this.props.user.userData.city}&payment_method=${this.props.user.userData.city}&product_id=${this.state.product_id}&product_quantity=${this.state.quantity}&product_price=${this.state.price}&total_price=${this.state.price}&shipping_charges=${this.state.price}&description=${this.state.price}&tax=${this.state.price}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  }
                }
              )
                .then(response => {
                  console.log("reponse post cart data************", response);

                  if (response._bodyInit === '"success"') {
                    this.props.updateUser({
                      UserId: this.props.user.UserId,
                      email: this.props.user.email
                    });

                    this.setState({
                      product_id: [],
                      name: [],
                      model: [],
                      price: [],
                      quantity: [],
                      // firstName: "",
                      // lastName: "",
                      // phone: "",
                      // address: "",
                      grandTotal: 0
                    });

                    Toast.show({
                      text: "Checkout Successfully!",
                      duration: 3000,
                      type: "success"
                    });
                  }
                  if (response._bodyInit != '"success"') {
                    Toast.show({
                      text: "Checout again please",
                      duration: 3000,
                      type: "danger"
                    });

                    this.setState({
                      product_id: [],
                      name: [],
                      model: [],
                      price: [],
                      quantity: [],
                      grandTotal: 0
                    });
                  }
                })
                .catch(() => {
                  this.setState({
                    product_id: [],
                    name: [],
                    model: [],
                    price: [],
                    quantity: [],
                    grandTotal: 0
                  });
                  Toast.show({
                    text: "Network Error!",
                    duration: 3000
                  });
                });
            });
          }
        })
      : this.props.navigation.navigate("GuestLogin");
    // alert("You are not Login")

    this._toggleModal();
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
    const { whichModal, id, firstName, lastName, phone, click } = this.state;

    return (
      <Root>
        <View style={{ marginTop: 22, flex: 1 }}>
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
                <Text
                  style={{ fontSize: 22, color: "white", fontWeight: "500" }}
                >
                  My Cart
                </Text>
              </View>
            </Body>

            <Button
              small
              onPress={() => this._goToCheckout()}
              style={{
                backgroundColor: "red",
                width: 100,
                textAlign: "center"
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              >
                Check Out
              </Text>
            </Button>
          </Header>
          {this.props.user &&
          this.props.user.CartData &&
          /*!this.props.user.CartData ||*/ Object.keys(this.props.user.CartData)
            .length == 0 ? (
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
              {/* <ScrollView>
                <Products
                  Heading="Also View"
                  navigate={this.props.navigation.navigate}
                />
              </ScrollView> */}
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
                                {Number(value.selling_price) > 0
                                  ? `PKR ${value.selling_price}.00`
                                  : `PKR ${value.selling_price}.00`}
                              </Text>
                              {/* <Text
                                style={{
                                  fontWeight: "bold",
                                  // fontSize: 12,
                                  textDecorationLine: "line-through",
                                  marginRight: 10,
                                  marginTop: 10,
                                  color: "#ff6801"
                                }}
                              >
                                {Number(value.selling_price) > 0
                                  ? `Rs : ${value.selling_price}`
                                  : ``}
                              </Text> */}
                            </View>
                            {/* <View style={{ flexDirection: "row" }}>
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  fontSize: 12,
                                  textDecorationLine: "line-through",
                                  marginLeft: 10,
                                  marginTop: 10,
                                  color: "#ff6801"
                                }}
                              >
                              
                                {Number(value.sale_price) > 0
                                  ? `Rs : ${value.cost_price}`
                                  : ``}
                              </Text>
                            </View> */}

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
                            {/* <View>
                              <Text
                                style={{
                                  marginLeft: 10,
                                  marginTop: 5,
                                  color: "#1A5CAD"
                                }}
                              >
                                Model : {value.model}
                              </Text>
                            </View> */}
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
              {/* <Products
                Heading="Also View"
                navigate={this.props.navigation.navigate}
              /> */}
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
      </Root>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22
  }
});
