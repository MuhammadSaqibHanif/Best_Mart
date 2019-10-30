import React, { Component } from "react";
import { Text, View } from "react-native";
import { Input, Item, Button } from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import { FORGOT_PASSWORD } from "../Api";

class ForgetPassword extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      loading: false
    };
  }

  _resetPassword = () => {
    const { email } = this.state;

    this.setState({
      loading: true
    });

    let formData = new FormData();
    formData.append("email", email);

    fetch(`${FORGOT_PASSWORD}`, {
      body: formData,
      method: "POST"
    })
      .then(response => {
        console.log("forget_email_verify >>>", response);
        if (
          response._bodyText.indexOf(
            "Please Check your Email For Resetting your Password"
          ) > 0
        ) {
          alert("Please Check your Email For Resetting your Password");

          this.setState({
            email: ""
          });

          this.props.navigation.navigate("SignInUp");
        } else if (
          response._bodyText.indexOf(
            "This Email Is Not Registered Here! Please Try Again"
          ) > 0
        ) {
          alert("This Email Is Not Registered Here! Please Try Again");
        } else {
          alert("Error!, Please try Again");
        }

        this.setState({
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          loading: false
        });
        alert("Error!!!, Please try Again");
        console.log("Error: forget_email_verify >>>", error);
      });
  };

  render() {
    const { email, loading } = this.state;

    return (
      <View
        style={{
          flex: 1,
          marginTop: 22,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{
            color: "#FFF"
          }}
        />
        <View style={{ width: "90%", marginBottom: 70 }}>
          <Text style={{ fontSize: 22, textAlign: "center" }}>
            LOST PASSWORD
          </Text>
        </View>
        <View style={{ width: "90%" }}>
          <Text
            style={{
              color: "gray",
              marginBottom: 15
            }}
          >
            Lost your password? Please enter your username or email address. You
            will receive a link to create a new password via email.
          </Text>
        </View>
        <View>
          <Item regular style={{ width: "90%", marginBottom: 15 }}>
            <Input
              placeholder="Enter Your email"
              placeholderTextColor="gray"
              value={email}
              onChangeText={text => this.setState({ email: text })}
            />
          </Item>
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            onPress={() => this._resetPassword()}
            style={{
              borderRadius: 5,
              backgroundColor: "red"
            }}
          >
            <Text
              style={{
                color: "white",
                marginLeft: 70,
                marginRight: 70,
                fontSize: 20
              }}
            >
              RESET PASSWORD
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default ForgetPassword;
