import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Input, Item, Card, Toast, Root, CheckBox } from "native-base";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";
import { SIGNIN } from "../Api";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showActivityIndicator: false
    };
  }

  signIn = () => {
    const { email, password, ActivityIndicator } = this.state;

    this.setState({
      showActivityIndicator: true
    });

    // let deviceSerial = null;
    // try {
    //   deviceSerial = Constants.deviceId;
    //   console.log("DEVICE ID FOUND: " + deviceSerial);
    // } catch (e) {
    //   console.log("error reading device ID");
    // }

    // let formData = new FormData();
    // formData.append("email", email);
    // formData.append("password", password);

    fetch(`${SIGNIN}?email=${email}&password=${password}`, {
      // body: formData,
      method: "POST"
    })
      .then(res => res.json())
      .then(response => {
        console.log("reponse Signin", response);
        // console.log("reponse Signin", response[0].name);

        this.setState({
          showActivityIndicator: false
        });

        if (response[0].id) {
          // let formDataLoginActivity = new FormData();
          // formDataLoginActivity.append("ip_address", deviceSerial);
          // formDataLoginActivity.append("user_id", response);
          // formDataLoginActivity.append("status", 0);

          //   body: formDataLoginActivity,
          //   method: "post"
          // })
          //   .then(resLAL => resLAL.json())
          //   .then(responseLAL => {
          // console.log("reponse Login Activity", responseLAL);

          // if (responseLAL == "success") {
          if (this.props.user) {
            if (this.props.user.CartData) {
              this.props.updateUser({
                CartData: {
                  ...this.props.user.CartData
                },
                userData: response[0],
                UserId: response[0].id
              });
            }
            if (!this.props.user.CartData) {
              this.props.updateUser({
                userData: response[0],
                UserId: response[0].id
              });
            }
          }

          if (!this.props.user) {
            this.props.updateUser({
              userData: response[0],
              UserId: response[0].id
            });
          }

          this.setState({
            email: "",
            password: ""
          });

          this.props.navigate("Home");
          // }
          // if (responseLAL == "") {
          //   Toast.show({
          //     text: "Sign In Again Please!",
          //     position: "top",
          //     duration: 5000,
          //     type: "warning"
          //   });
          // }
          // })
          // .catch(error => {
          //   console.log("Error: login activity log*******", error);
          //   Toast.show({
          //     text: error,
          //     position: "top",
          //     duration: 5000,
          //     type: "danger"
          //   });
          // });
        }
        // if (response == "success") {
        //   Toast.show({
        //     text: "Please wait for Approval from Admin",
        //     position: "top",
        //     duration: 5000,
        //     type: "warning"
        //   });
        // }
        // if (response == "") {
        //   Toast.show({
        //     text: "Please Sign Up to continue OR some ERROR Happens",
        //     position: "top",
        //     duration: 5000,
        //     type: "danger"
        //   });
        // }
      })
      .catch(error => {
        this.setState({
          showActivityIndicator: false
        });

        console.log("Error: SignIn*******", error);
        Toast.show({
          text: "Error",
          position: "center",
          duration: 10000,
          type: "danger"
        });
      });
  };

  render() {
    const { email, password, showActivityIndicator } = this.state;

    return (
      <View>
        {/* <ScrollView> */}
        <ImageBackground
          source={require("../images/log-back.jpg")}
          style={{
            height: Dimensions.get("window").height
            // backgroundColor: "blue",
            // flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center"
          }}
        >
          <Card
            style={{
              backgroundColor: "A8A8A8",
              flexDirection: "column",
              alignSelf: "center",
              alignItems: "center",
              width: "90%",
              borderRadius: 6,
              marginTop: 20,
              flex: 1
              // justifyContent: "center"
            }}
          >
            {/* <Image
                source={require("../images/account.png")}
                style={{ position: "absolute", top: -15, zIndex: 1 }}
              /> */}
            <Text
              style={{
                marginTop: 20,
                fontSize: 20,
                fontWeight: "500",
                color: "black"
              }}
            >
              Sign In
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 40,
                width: "95%",
                borderRadius: 10
              }}
            >
              <Item
                style={{
                  width: "90%",
                  backgroundColor: "white",
                  borderRadius: 6
                }}
              >
                <Image
                  source={require("../images/person.png")}
                  style={{ width: 20, height: 20, marginLeft: 10 }}
                />
                <Input
                  placeholder="email"
                  onChangeText={email => {
                    this.setState({ email });
                  }}
                />
              </Item>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 20,
                width: "95%"
              }}
            >
              <Item
                style={{
                  width: "90%",
                  backgroundColor: "white",
                  borderRadius: 6
                }}
              >
                <Image
                  source={require("../images/lock.png")}
                  style={{ width: 20, height: 20, marginLeft: 10 }}
                />
                <Input
                  placeholder="password"
                  secureTextEntry
                  onChangeText={password => {
                    this.setState({ password });
                  }}
                />
              </Item>
            </View>

            {showActivityIndicator && (
              <ActivityIndicator size="small" color="#00ff00" />
            )}

            <View
              style={{
                marginTop: 20,
                padding: 10,
                backgroundColor: "white",
                alignItems: "center",
                width: "80%",
                borderRadius: 6,
                backgroundColor: "red"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.signIn();
                }}
              >
                <Text style={{ textAlign: "justify", color: "white" }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
                marginBottom: 20
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "55%"
                }}
              >
                {/* <CheckBox
                  checked={true}
                  style={{ backgroundColor: "red", borderColor: "white" }}
                />
                <Text style={{ marginLeft: 15, color: "white" }}>
                  Remember Me
                </Text> */}
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigate("ForgetPassword")}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    marginRight: 30,
                    fontSize: 16
                  }}
                >
                  Forgot your Password?
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
          <View
            style={{
              marginTop: 20,
              width: "85%",
              height: 2,
              backgroundColor: "white"
            }}
          />
          <Text style={{ marginTop: 10, color: "white" }}>
            don't have an account ?{" "}
            <Text style={{ color: "red" }}>Swipe right to register</Text>
          </Text>
        </ImageBackground>
        {/* </ScrollView> */}
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
)(SignIn);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  }
});
