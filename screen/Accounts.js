import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Constants } from "expo";
import {
  Card,
  Header,
  Body,
  Root,
  Toast,
  Button,
  Left,
  Icon
} from "native-base";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";

class Accounts extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      isModalVisible: false
    };
  }

  _toggleModal = () =>
    this.setState({
      isModalVisible: !this.state.isModalVisible
    });

  logOut = () => {
    let deviceSerial = null;
    try {
      deviceSerial = Constants.deviceId;
      console.log("DEVICE ID FOUND: " + deviceSerial);
    } catch (e) {
      console.log("error reading device ID");
    }

    let formDataLoginActivity = new FormData();
    formDataLoginActivity.append("ip_address", deviceSerial);
    formDataLoginActivity.append("user_id", this.props.user.UserId);
    formDataLoginActivity.append("status", 1);

    fetch("https://bestmart.com.pk/best_mart/api/post/login-activity-log?", {
      body: formDataLoginActivity,
      method: "post"
    })
      .then(resLAL => resLAL.json())
      .then(responseLAL => {
        console.log("reponse Login Activity", responseLAL);

        if (responseLAL == "success") {
          this.props.updateUser({
            CartData: {},
            email: "",
            UserId: ""
          });

          this._toggleModal();

          this.props.navigation.navigate("SignInUp");

          Toast.show({
            text: "Log Out Successfully!",
            position: "bottom",
            duration: 5000,
            type: "warning"
          });

          this.setState({
            logOut: true
          });
        }
        if (responseLAL == "") {
          Toast.show({
            text: "Log Out Again Please!",
            position: "bottom",
            duration: 5000,
            type: "success"
          });
        }
      })
      .catch(error => {
        console.error("Error: login activity log*******", error);
        Toast.show({
          text: error,
          position: "top",
          duration: 5000,
          type: "danger"
        });
      });
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Root>
        <View>
          <View style={{ marginTop: 22 }}>
            <Header style={{ backgroundColor: "#3D3B48" }}>
              <Left>
                <Button transparent onPress={() => navigate("Home")}>
                  <Icon type="AntDesign" name="arrowleft" />
                </Button>
              </Left>
              <Body
                style={{
                  marginLeft: 20
                }}
              >
                <Text
                  style={{ fontSize: 22, color: "white", fontWeight: "500" }}
                >
                  My Account
                </Text>
              </Body>
              {this.props.user && this.props.user.UserId > 0 ? (
                <View
                  style={{ justifyContent: "flex-end", flexDirection: "row" }}
                >
                  <Button
                    small
                    onPress={() => this._toggleModal()}
                    style={{ backgroundColor: "#A52A2A", textAlign: "center" }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        marginLeft: "auto",
                        marginRight: "auto"
                      }}
                    >
                      Log Out
                    </Text>
                  </Button>
                </View>
              ) : (
                <View
                  style={{ justifyContent: "flex-end", flexDirection: "row" }}
                >
                  <Button
                    small
                    onPress={() => navigate("MainSign")}
                    style={{ backgroundColor: "#ff6801", textAlign: "center" }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        marginLeft: "auto",
                        marginRight: "auto"
                      }}
                    >
                      Login / Sign Up
                    </Text>
                  </Button>
                </View>
              )}
            </Header>
          </View>
          <View>
            <Card
              style={{ marginTop: 5, height: Dimensions.get("window").height }}
            >
              <View style={{ flexDirection: "column" }}>
                <TouchableOpacity onPress={() => navigate("MyOrders")}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 15,
                      marginTop: 5,
                      padding: 10
                    }}
                  >
                    <Image
                      source={require("../images/order.png")}
                      style={{ height: 20, width: 20 }}
                    />
                    <Text style={{ marginLeft: 30, fontSize: 14 }}>
                      My Orders
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={{ borderBottomWidth: 0.5 }} />
                <TouchableOpacity
                  onPress={() => navigate("AccountInformation")}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 15,
                      marginTop: 5,
                      padding: 10
                    }}
                  >
                    <Image
                      source={require("../images/man.png")}
                      style={{ height: 20, width: 20 }}
                    />
                    <Text style={{ marginLeft: 30, fontSize: 14 }}>
                      Account Information
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={{ borderBottomWidth: 0.5 }} />
            
                <View style={{ borderBottomWidth: 0.5 }} />
                <TouchableOpacity onPress={() => navigate("DeliveryInfo")}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 15,
                      marginTop: 5,
                      padding: 10
                    }}
                  >
                    <Image
                      source={require("../images/shipped.png")}
                      style={{ height: 20, width: 20 }}
                    />
                    <Text style={{ marginLeft: 30, fontSize: 14 }}>
                      Delivery Info
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={{ borderBottomWidth: 0.5 }} />
                <TouchableOpacity onPress={() => navigate("CustomerService")}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 15,
                      marginTop: 5,
                      padding: 10
                    }}
                  >
                    <Image
                      source={require("../images/support(acc).png")}
                      style={{ height: 20, width: 20 }}
                    />
                    <Text style={{ marginLeft: 30, fontSize: 14 }}>
                      Customer Serivce Info
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={{ borderBottomWidth: 0.5 }} />
                <TouchableOpacity onPress={() => navigate("Refund")}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 15,
                      marginTop: 5,
                      padding: 10
                    }}
                  >
                    <Image
                      source={require("../images/box-return.png")}
                      style={{ height: 20, width: 20 }}
                    />
                    <Text style={{ marginLeft: 30, fontSize: 14 }}>
                      Return And Refund Info
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={{ borderBottomWidth: 0.5 }} />
              </View>
            </Card>
          </View>

          <Modal isVisible={this.state.isModalVisible} backdropColor="white">
            <View>
              <Button
                block
                onPress={() => this.logOut()}
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
                  Confirm Log Out
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
)(Accounts);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
