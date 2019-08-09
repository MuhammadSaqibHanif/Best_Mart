"use strict";

import React from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Input, Item, Card } from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import ValidationComponent from "react-native-form-validator";
import { SIGNUP } from "../Api";

class SignUp extends ValidationComponent {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      country: "",
      city: "",
      phone: "",
      loading: false
    };
  }

  _onPressButton = () => {
    this.setState({
      onPressButton: true
    });

    // Call ValidationComponent validate method
    this.validate({
      fullName: { required: true },
      email: { email: true, required: true },
      password: { required: true },
      confirmPassword: { required: true },
      address: { required: true },
      country: { required: true },
      city: { required: true },
      phone: { minlength: 10, numbers: true, required: true }
    });

    let formValid = this.isFormValid();

    formValid && this.signUp();
  };

  signUp = () => {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      address,
      country,
      city,
      phone
    } = this.state;

    this.setState({
      loading: true
    });

    let formData = new FormData();
    formData.append("name", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("cpassword", confirmPassword);
    formData.append("address", address);
    formData.append("country", country);
    formData.append("city", city);
    formData.append("contact_no", phone);
    formData.append("company_name", "");

    fetch(`${SIGNUP}`, {
      body: formData,
      method: "POST"
    })
      .then(res => res.json())
      .then(response => {
        console.log("sign-up >>>", response);

        this.setState({
          loading: false
        });

        if (response == "Success") {
          alert("Register Successfully. Please Login to Continue");

          this.setState({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            address: "",
            country: "",
            city: "",
            phone: ""
          });
        }
        if (response == "") {
          alert("Sign Up Again Please!");
        }
      })
      .catch(error => {
        this.setState({
          loading: false
        });

        console.log("sign-up Error >>>", error);
        alert("ERROR! Sign Up Again Please!");
      });
  };

  render() {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      address,
      country,
      city,
      phone,
      loading
    } = this.state;

    // console.log(
    //   "***",
    //   fullName,
    //   email,
    //   password,
    //   confirmPassword,
    //   address,
    //   country,
    //   city,
    //   phone
    // );

    return (
      <View style={{ flex: 1 }}>
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{
            color: "#FFF"
          }}
        />
        <ImageBackground
          source={require("../images/log-back.jpg")}
          style={{
            flex: 1,
            height: Dimensions.get("window").height
          }}
        >
          <ScrollView style={{ flex: 1 }}>
            <View style={{ marginBottom: 10, flex: 1 }}>
              <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <Card
                  style={{
                    backgroundColor: "A8A8A8",
                    flexDirection: "column",
                    alignSelf: "center",
                    alignItems: "center",
                    width: "90%",
                    borderRadius: 6,
                    marginTop: 20,
                    flex: 1,
                    justifyContent: "center"
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
                    Sign Up
                  </Text>

                  <View
                    style={{
                      alignItems: "center",
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
                        placeholder="Full Name"
                        value={fullName}
                        onChangeText={fullName => {
                          this.setState({ fullName });
                        }}
                        ref="fullName"
                      />
                    </Item>
                    {this.isFieldInError("fullName") && (
                      <Text style={{ color: "red" }}>
                        Please filled correct name
                      </Text>
                    )}
                  </View>

                  <View
                    style={{
                      alignItems: "center",
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
                        placeholder="Email"
                        value={email}
                        onChangeText={email => {
                          this.setState({ email });
                        }}
                        ref="email"
                      />
                    </Item>
                    {this.isFieldInError("email") && (
                      <Text style={{ color: "red" }}>
                        Please filled correct email address
                      </Text>
                    )}
                  </View>

                  <View
                    style={{
                      alignItems: "center",
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
                        source={require("../images/person.png")}
                        style={{ width: 20, height: 20, marginLeft: 10 }}
                      />
                      <Input
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={password => {
                          this.setState({ password });
                        }}
                        ref="password"
                      />
                    </Item>
                    {this.isFieldInError("password") && (
                      <Text style={{ color: "red" }}>
                        Please filled Password
                      </Text>
                    )}
                  </View>

                  <View
                    style={{
                      alignItems: "center",
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
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        secureTextEntry
                        onChangeText={confirmPassword => {
                          this.setState({ confirmPassword });
                        }}
                        ref="confirmPassword"
                      />
                    </Item>
                    {this.isFieldInError("confirmPassword") && (
                      <Text style={{ color: "red" }}>
                        Please filled Confirm Password
                      </Text>
                    )}
                  </View>

                  <View
                    style={{
                      alignItems: "center",
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
                        source={require("../images/person.png")}
                        style={{ width: 20, height: 20, marginLeft: 10 }}
                      />
                      <Input
                        placeholder="Address"
                        value={address}
                        onChangeText={address => {
                          this.setState({ address });
                        }}
                        ref="address"
                      />
                    </Item>
                    {this.isFieldInError("address") && (
                      <Text style={{ color: "red" }}>
                        Please filled Address
                      </Text>
                    )}
                  </View>

                  <View
                    style={{
                      alignItems: "center",
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
                        source={require("../images/person.png")}
                        style={{ width: 20, height: 20, marginLeft: 10 }}
                      />
                      <Input
                        placeholder="Country"
                        value={country}
                        onChangeText={country => {
                          this.setState({ country });
                        }}
                        ref="country"
                      />
                    </Item>
                    {this.isFieldInError("country") && (
                      <Text style={{ color: "red" }}>
                        Please filled Country
                      </Text>
                    )}
                  </View>

                  <View
                    style={{
                      alignItems: "center",
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
                        source={require("../images/person.png")}
                        style={{ width: 20, height: 20, marginLeft: 10 }}
                      />
                      <Input
                        placeholder="City"
                        value={city}
                        onChangeText={city => {
                          this.setState({ city });
                        }}
                        ref="city"
                      />
                    </Item>
                    {this.isFieldInError("city") && (
                      <Text style={{ color: "red" }}>Please filled City</Text>
                    )}
                  </View>

                  <View
                    style={{
                      alignItems: "center",
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
                        source={require("../images/person.png")}
                        style={{ width: 20, height: 20, marginLeft: 10 }}
                      />
                      <Input
                        placeholder="Contact No  923xxxxxxxxx"
                        value={phone}
                        onChangeText={phone => {
                          this.setState({ phone });
                        }}
                        ref="phone"
                      />
                    </Item>
                    {this.isFieldInError("phone") && (
                      <Text style={{ color: "red" }}>
                        Please filled correctly
                      </Text>
                    )}
                    {(phone.charAt(0) != "9" || phone.charAt(1) != "2") &&
                      phone.length > 0 && (
                        <Text style={{ color: "red" }}>
                          Please insert number like this 923xxxxxxxxx
                        </Text>
                      )}
                  </View>

                  <View
                    style={{
                      marginTop: 20,
                      marginBottom: 10,
                      padding: 10,
                      backgroundColor: "white",
                      alignItems: "center",
                      width: "72%",
                      borderRadius: 6,
                      backgroundColor: "red"
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this._onPressButton();
                      }}
                    >
                      <Text style={{ textAlign: "justify", color: "white" }}>
                        SUBMIT
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              </KeyboardAvoidingView>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

export default SignUp;
