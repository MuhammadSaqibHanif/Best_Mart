import React, { Component } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Input, Item, Card } from "native-base";

class SignUp extends Component {
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
      showToast: false,
      showActivityIndicator: false
    };
  }

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
      showActivityIndicator: true
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

    fetch("https://bestmart.com.pk/bestmart_api/Post/sign_up.php", {
      body: formData,
      method: "POST"
    })
      .then(res => res.json())
      .then(response => {
        console.log("sign-up response", response);

        this.setState({
          showActivityIndicator: false
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
          showActivityIndicator: false
        });

        console.log(error);
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
      showActivityIndicator
    } = this.state;

    console.log(
      "***",
      fullName,
      email,
      password,
      confirmPassword,
      address,
      country,
      city,
      phone
    );

    return (
      <ImageBackground
        source={require("../images/log-back.jpg")}
        style={{
          flex: 1,
          height: Dimensions.get("window").height,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          <View style={{ marginBottom: 10 }}>
            <KeyboardAvoidingView
              // style={{ flex: 1 }}
              // keyboardVerticalOffset={100}
              // behavior={"position"}
              behavior="padding"
            >
              <Card
                style={{
                  backgroundColor: "A8A8A8",
                  flexDirection: "column",
                  alignItems: "center",
                  // width: "90%",
                  borderRadius: 6,
                  marginTop: 20,
                  // flex: 1,
                  justifyContent: "center"
                }}
              >
                <Image
                  source={require("../images/account.png")}
                  style={{ position: "absolute", top: -15, zIndex: 1 }}
                />
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 20,
                    fontWeight: "500",
                    color: "white"
                  }}
                >
                  Sign In
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 20,
                    width: "90%"
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
                    />
                  </Item>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 20,
                    width: "90%"
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
                    />
                  </Item>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 20,
                    width: "90%",
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
                      placeholder="Password"
                      secureTextEntry
                      value={password}
                      onChangeText={password => {
                        this.setState({ password });
                      }}
                    />
                  </Item>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 20,
                    width: "90%"
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
                    />
                  </Item>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 20,
                    width: "90%",
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
                      placeholder="Address"
                      value={address}
                      onChangeText={address => {
                        this.setState({ address });
                      }}
                    />
                  </Item>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 20,
                    width: "90%",
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
                      placeholder="Country"
                      value={country}
                      onChangeText={country => {
                        this.setState({ country });
                      }}
                    />
                  </Item>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 20,
                    width: "90%",
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
                      placeholder="City"
                      value={city}
                      onChangeText={city => {
                        this.setState({ city });
                      }}
                    />
                  </Item>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 20,
                    width: "90%",
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
                      placeholder="Contact No"
                      value={phone}
                      onChangeText={phone => {
                        this.setState({ phone });
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
                    width: "72%",
                    borderRadius: 6,
                    backgroundColor: "red"
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.signUp();
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
    );
  }
}

export default SignUp;
