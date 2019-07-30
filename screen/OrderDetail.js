import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import {
  Header,
  Card,
  CardItem,
  Left,
  Body,
  Toast,
  Root,
  Button,
  Icon
} from "native-base";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";
import { ScrollView } from "react-native-gesture-handler";

class MyOrders extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      response: []
    };
  }

  componentDidMount() {
    this.props.user &&
      this.props.user.UserId &&
      fetch(
        `https://bestmart.com.pk/best_mart/api/get/order-details/${
        this.props.navigation.state.params.orderNumber
        }`
      )
        .then(res => res.json())
        .then(response => {
          console.log("get user Orders", response);
          if (response != null) {
            if (response[0]) {
              this.setState({ response });
            }
          }
        })
        .catch(() =>
          Toast.show({
            text: "Network Error!",
            position: "bottom",
            duration: 3000
          })
        );
  }

  render() {
    const { navigation } = this.props;
    const { response } = this.state;
    console.log("OrderDetails", response);

    return (
      <Root>
        <View style={{ flex: 1 }}>
          <View style={{ marginTop: 22 }}>
            <Header style={{ backgroundColor: "#fb9c06" }}>
              <Left>
                <Button transparent onPress={() => navigation.goBack()}>
                  <Icon type="AntDesign" name="arrowleft" />
                </Button>
              </Left>
              <Body style={{ marginLeft: 20 }}>
                <View>
                  <Text
                    style={{ fontSize: 22, color: "white", fontWeight: "500" }}
                  >
                    Order Detail
                  </Text>
                </View>
              </Body>
            </Header>
          </View>
          <ScrollView>
            {Object.keys(response).length > "0" &&
              Object.values(response).map((value, ind) => (
                <Card key={ind}>
                  {/* <CardItem>
                    <Body>
                      <Text>Order No : {value.order_no}</Text>
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>Order Status : {value.order_status}</Text>
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>Payment Status : {value.payment_status}</Text>
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>Total : {value.total}</Text>
                    </Body>
                  </CardItem> */}
                  <CardItem>
                    <Body>
                      <Text>Order No : {value.order_no}</Text>
                    </Body>
                  </CardItem>
                  <CardItem cardBody>
                    <Image
                      source={{ uri: value.product_image }}
                      style={{
                        flex: 1,
                        height: 100,
                        width: 100,
                        marginLeft: 10
                      }}
                      resizeMode="contain"
                    />
                    <Left>
                      <View style={{ flexDirection: "column", marginLeft: 10 }}>
                        <Text>Order Status : {value.order_status}</Text>
                        <Text>Quantity : {value.quantity}</Text>
                        <Text>Price : {value.price}</Text>
                        <Text>Total : {value.order_total}</Text>
                        <Text>Payment Status : {value.payment_status}</Text>
                        <Text>Type : {value.type}</Text>
                      </View>
                    </Left>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>{value.product_name}</Text>
                    </Body>
                  </CardItem>

                  {/* <CardItem>
                    <Body>

                      <Text>
                        Grand Total : {value.total}

                      </Text>

                    </Body>
                  </CardItem> */}

                </Card>

              ))}
            <Card>
              <CardItem>
                <Body>
                  {Object.keys(response).length > "0" && (
                    <Text>
                      Grand Total :
                      {Object.entries(response)[0].map(val => val.total)}
                    </Text>
                  )}
                </Body>
              </CardItem>
            </Card>
          </ScrollView>
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
)(MyOrders);
