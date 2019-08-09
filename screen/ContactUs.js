import React, { Component } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Input, Item, Card, Label, Textarea } from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import { SIGNUP } from "../Api";

class ContactUs extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
      loading: false
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
        console.log("sign-up response", response);

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

        console.log(error);
        alert("ERROR! Sign Up Again Please!");
      });
  };

  render() {
    const { name, phone, email, subject, message, loading } = this.state;

    // console.log("***", name, phone, email, subject, message);

    return (
      <View style={{ flex: 1, marginTop: 22 }}>
        <Spinner
          visible={this.state.loading}
          textContent={"Loading..."}
          textStyle={{
            color: "#FFF"
          }}
        />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ marginBottom: 10 }}>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
              <Card
                style={{
                  backgroundColor: "A8A8A8",
                  flexDirection: "column",
                  alignItems: "center",
                  // width: "90%",
                  borderRadius: 6,
                  marginTop: 20,
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
                    fontWeight: "500"
                    // color: "white"
                  }}
                >
                  CONTACT US
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
                    <Label>Name *</Label>
                    <Input
                      placeholder="Enter Your Name....."
                      value={name}
                      onChangeText={name => {
                        this.setState({ name });
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
                    <Label>Contact No. *</Label>
                    <Input
                      placeholder="03xx-xxxxxxx"
                      value={phone}
                      onChangeText={phone => {
                        this.setState({ phone });
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
                    <Label>Email *</Label>
                    <Input
                      placeholder="Enter your Email....."
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
                    <Label>Subject *</Label>
                    <Input
                      placeholder="Enter your Subject....."
                      value={subject}
                      onChangeText={subject => {
                        this.setState({ subject });
                      }}
                    />
                  </Item>
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    marginTop: 20,
                    width: "90%",
                    borderRadius: 10
                  }}
                >
                  <Item
                    style={{
                      width: "90%",
                      backgroundColor: "white",
                      borderRadius: 6,
                      flexDirection: "column"
                    }}
                  >
                    <Label
                      style={{
                        alignSelf: "flex-start"
                      }}
                    >
                      Message *
                    </Label>
                    <Textarea
                      style={{ width: "100%" }}
                      placeholder=""
                      rowSpan={4}
                      bordered
                      value={message}
                      onChangeText={message => {
                        this.setState({ message });
                      }}
                    />
                  </Item>
                </View>

                <View
                  style={{
                    marginTop: 20,
                    padding: 10,
                    backgroundColor: "white",
                    alignItems: "center",
                    width: "72%",
                    borderRadius: 6,
                    backgroundColor: "red",
                    marginBottom: 10
                  }}
                >
                  <TouchableOpacity
                  // onPress={() => {
                  //   this.signUp();
                  // }}
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
      </View>
    );
  }
}

export default ContactUs;
