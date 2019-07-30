import React, { Component } from "react";
import { Text, View } from "react-native";
import { Header, Left, Body, Button, Icon, Drawer } from "native-base";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";
import { ScrollView } from "react-native-gesture-handler";
import ContentView from "../screen/Drawer";

let total_price_array = [];

class MyOrders extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      response: false
    };
  }

  componentDidMount() {
    this.props.user &&
      this.props.user.UserId &&
      fetch(
        `https://bestmart.com.pk/bestmart_api/Get/get_all_orders.php?user_id=${this.props.user.UserId}`
      )
        .then(res => res.json())
        .then(response => {
          // console.log("get_all_orders >>>>>>", response);

          if (response[0].product_details) {
            let total_price = 0;

            response.map(value => {
              value.product_details.map((val, index) => {
                total_price = total_price + Number(val.product_total);
                if (index + 1 == value.product_details.length) {
                  total_price_array.push(total_price);
                  total_price = 0;
                }
              });
            });

            this.setState({ response });
          }
        })
        .catch(() => {});
  }

  openDrawer = () => {
    this.drawer._root.open();
  };
  closeDrawer = () => {
    this.drawer._root.close();
  };

  render() {
    const { response } = this.state;

    console.log("this.state.response", response);

    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<ContentView menu={this.props} />}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.3}
        panCloseMask={0.3}
      >
        <View style={{ flex: 1, marginTop: 22 }}>
          <Header style={{ backgroundColor: "#FF0000" }}>
            <Left>
              <Button onPress={this.openDrawer.bind(this)} transparent>
                <Icon name="menu" type="Entypo" />
              </Button>
            </Left>
            <Body>
              <Text />
            </Body>
            {/* <Right>
              <Button transparent>
                <Text>User</Text>
              </Button>
            </Right> */}
          </Header>

          {/* Body */}
          <View style={{ padding: 10 }}>
            <Text style={{ color: "#FF0000", fontSize: 20 }}>My Orders</Text>
          </View>

          <View
            style={{
              flex: 1
            }}
          >
            <ScrollView horizontal={true} style={{ flex: 1 }}>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#FFFFFF",
                    padding: 5
                  }}
                >
                  <Text
                    style={{
                      width: 100,
                      marginLeft: 10,
                      textAlignVertical: "center",
                      textAlign: "left",
                      marginRight: 5,
                      color: "#808080",
                      fontWeight: "bold"
                    }}
                  >
                    Invoice No.
                  </Text>
                  <Text
                    style={{
                      width: 200,
                      textAlignVertical: "center",
                      textAlign: "left",
                      marginRight: 5,
                      color: "#808080",
                      fontWeight: "bold"
                    }}
                  >
                    Product Name
                  </Text>
                  <Text
                    style={{
                      width: 100,
                      textAlignVertical: "center",
                      color: "#808080",
                      fontWeight: "bold",
                      textAlign: "left",
                      marginRight: 5
                    }}
                  >
                    Status
                  </Text>
                  <Text
                    style={{
                      width: 150,
                      textAlignVertical: "center",
                      textAlign: "left",
                      marginRight: 5,
                      color: "#808080",
                      fontWeight: "bold"
                    }}
                  >
                    Name
                  </Text>
                  <Text
                    style={{
                      width: 150,
                      textAlignVertical: "center",
                      textAlign: "left",
                      marginRight: 5,
                      color: "#808080",
                      fontWeight: "bold"
                    }}
                  >
                    Email Address
                  </Text>
                  <Text
                    style={{
                      width: 100,
                      textAlignVertical: "center",
                      textAlign: "left",
                      marginRight: 5,
                      color: "#808080",
                      fontWeight: "bold"
                    }}
                  >
                    Phone Number
                  </Text>
                  <Text
                    style={{
                      width: 200,
                      textAlignVertical: "center",
                      textAlign: "left",
                      marginRight: 5,
                      color: "#808080",
                      fontWeight: "bold"
                    }}
                  >
                    Address
                  </Text>
                  <Text
                    style={{
                      width: 100,
                      textAlignVertical: "center",
                      textAlign: "left",
                      marginRight: 5,
                      color: "#808080",
                      fontWeight: "bold"
                    }}
                  >
                    City
                  </Text>
                  <Text
                    style={{
                      width: 100,
                      textAlignVertical: "center",
                      textAlign: "left",
                      marginRight: 5,
                      color: "#808080",
                      fontWeight: "bold"
                    }}
                  >
                    Total Price
                  </Text>
                  <Text
                    style={{
                      width: 120,
                      textAlignVertical: "center",
                      textAlign: "center",
                      marginRight: 5,
                      color: "#808080",
                      fontWeight: "bold"
                    }}
                  >
                    Shipping Charges
                  </Text>
                  <Text
                    style={{
                      width: 100,
                      textAlignVertical: "center",
                      textAlign: "left",
                      marginRight: 5,
                      color: "#808080",
                      fontWeight: "bold"
                    }}
                  >
                    Delivery Date
                  </Text>
                </View>

                <ScrollView>
                  {/* 2nd Row */}
                  {response &&
                    response.map((value, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            flexDirection: "row",
                            backgroundColor: index % 2 == 0 && "#D3D3D3",
                            padding: 5
                          }}
                        >
                          <Text
                            style={{
                              width: 100,
                              marginLeft: 10,
                              textAlignVertical: "center",
                              textAlign: "left",
                              color: "#808080",
                              marginRight: 5
                            }}
                          >
                            {value.invoice_number == null
                              ? "- -"
                              : value.invoice_number}
                          </Text>

                          <Text
                            style={{
                              width: 200,
                              textAlignVertical: "center",
                              textAlign: "left",
                              marginRight: 5,
                              color: "#808080"
                            }}
                          >
                            {value.product_details.map(
                              (element, index) =>
                                `${index + 1} ) ${element.product_name} \n`
                            )}
                          </Text>

                          <Text
                            style={{
                              width: 100,
                              textAlignVertical: "center",
                              textAlign: "left",
                              marginRight: 5,
                              color: "#808080"
                            }}
                          >
                            {value.status}
                          </Text>
                          <Text
                            style={{
                              width: 150,
                              textAlignVertical: "center",
                              textAlign: "left",
                              marginRight: 5,
                              color: "#808080"
                            }}
                          >
                            {value.name}
                          </Text>
                          <Text
                            style={{
                              width: 150,
                              textAlignVertical: "center",
                              textAlign: "left",
                              marginRight: 5,
                              color: "#808080"
                            }}
                          >
                            {value.email}
                          </Text>
                          <Text
                            style={{
                              width: 100,
                              textAlignVertical: "center",
                              textAlign: "left",
                              marginRight: 5,
                              color: "#808080"
                            }}
                          >
                            {value.phone}
                          </Text>
                          <Text
                            style={{
                              width: 200,
                              textAlignVertical: "center",
                              textAlign: "left",
                              marginRight: 5,
                              color: "#808080"
                            }}
                          >
                            {value.address}
                          </Text>
                          <Text
                            style={{
                              width: 100,
                              textAlignVertical: "center",
                              textAlign: "left",
                              marginRight: 5,
                              color: "#808080"
                            }}
                          >
                            {value.city}
                          </Text>
                          <Text
                            style={{
                              width: 100,
                              textAlignVertical: "center",
                              textAlign: "left",
                              marginRight: 5,
                              color: "#808080"
                            }}
                          >
                            Rs{" "}
                            {Number(value.total_price) > 1499
                              ? Number(value.total_price)
                              : Number(value.total_price) +
                                Number(value.shipping_charges)}
                            {/* Rs {Number(total_price_array[index]) +
                              Number(value.shipping_charges)} */}
                          </Text>
                          <Text
                            style={{
                              width: 120,
                              textAlignVertical: "center",
                              textAlign: "center",
                              marginRight: 5,
                              color: "#808080"
                            }}
                          >
                            {Number(value.total_price) > 1499
                              ? "- -"
                              : value.shipping_charges}
                          </Text>
                          <Text
                            style={{
                              width: 100,
                              textAlignVertical: "center",
                              textAlign: "left",
                              marginRight: 5,
                              color: "#808080"
                            }}
                          >
                            {value.delivery_date}
                          </Text>
                        </View>
                      );
                    })}
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </View>
      </Drawer>
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
)(MyOrders);
