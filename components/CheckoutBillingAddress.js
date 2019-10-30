"use strict";

import React from "react";
import { Text, View, KeyboardAvoidingView } from "react-native";
import { Button, Item, Input, Label, Picker, DatePicker } from "native-base";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";
import ValidationComponent from "react-native-form-validator";

class CheckoutBillingAddress extends ValidationComponent {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user
        ? this.props.user.userData
          ? this.props.user.userData.name
          : ""
        : "",
      email: this.props.user
        ? this.props.user.userData
          ? this.props.user.userData.email
          : ""
        : "",
      country: "Pakistan",
      town_city: this.props.user
        ? this.props.user.userData
          ? this.props.user.userData.city
          : ""
        : "",
      address: this.props.user
        ? this.props.user.userData
          ? this.props.user.userData.address
          : ""
        : "",
      state_division: "",
      deliverytime: "",
      deliveryDate: new Date(),
      phone: this.props.user
        ? this.props.user.userData
          ? this.props.user.userData.contact_no
          : ""
        : "",
      ordernotes: "",
      datePick: ""
    };

    this.setDate = this.setDate.bind(this);
  }

  onValueChange(value) {
    this.setState({
      country: value
    });
  }

  onValueChange2(value) {
    this.setState({
      state_division: value
    });
  }

  onValueChange3(value) {
    this.setState({
      deliverytime: value
    });
  }

  setDate(newDate) {
    let formatted_date =
      newDate.getDate() +
      "-" +
      (newDate.getMonth() + 1) +
      "-" +
      newDate.getFullYear();

    this.setState({ deliveryDate: formatted_date, datePick: "true" });
  }

  _onPressButton = () => {
    const {
      name,
      email,
      country,
      town_city,
      address,
      state_division,
      deliverytime,
      deliveryDate,
      phone,
      ordernotes
    } = this.state;

    this.setState({
      onPressButton: true
    });

    // Call ValidationComponent validate method
    this.validate({
      name: { required: true },
      email: { email: true, required: true },
      town_city: { required: true },
      address: { required: true },
      state_division: { required: true },
      deliverytime: { required: true },
      datePick: { required: true },
      phone: { minlength: 10, numbers: true, required: true }
    });

    let formValid = this.isFormValid();

    formValid &&
      this.props._saveCheckoutBillingData(
        name,
        email,
        country,
        town_city,
        address,
        state_division,
        deliverytime,
        deliveryDate,
        phone,
        ordernotes
      );
  };

  static getDerivedStateFromProps(props, state) {
    if (props.updateLoginData) {
      return {
        name: props.user
          ? props.user.userData
            ? props.user.userData.name
            : ""
          : "",
        email: props.user
          ? props.user.userData
            ? props.user.userData.email
            : ""
          : "",
        country: "Pakistan",
        town_city: props.user
          ? props.user.userData
            ? props.user.userData.city
            : ""
          : "",
        address: props.user
          ? props.user.userData
            ? props.user.userData.address
            : ""
          : "",
        state_division: "",
        deliverytime: "",
        deliveryDate: new Date(),
        phone: props.user
          ? props.user.userData
            ? props.user.userData.contact_no
            : ""
          : "",
        ordernotes: "",
        datePick: ""
      };
    }

    return null;
  }

  render() {
    const {
      name,
      email,
      country,
      town_city,
      address,
      state_division,
      deliverytime,
      phone,
      ordernotes
    } = this.state;

    return (
      <View style={{ marginTop: 10 }}>
        <KeyboardAvoidingView behavior="padding">
          <View
            style={{
              width: "95%",
              alignSelf: "center",
              marginTop: 10
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "white",
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: "red"
              }}
            >
              BILLING ADDRESS
            </Text>
            <View
              style={{
                width: "90%",
                alignSelf: "center",
                marginTop: 10
              }}
            >
              <Item>
                <Label>Name *</Label>
                <Input
                  placeholder="Your Name"
                  value={name}
                  onChangeText={text => this.setState({ name: text })}
                  ref="name"
                />
              </Item>
              {this.isFieldInError("name") && (
                <Text style={{ color: "red" }}>Please filled correct name</Text>
              )}

              <Item>
                <Label>Email *</Label>
                <Input
                  placeholder="Your Email"
                  value={email}
                  onChangeText={text => this.setState({ email: text })}
                  ref="email"
                />
              </Item>
              {this.isFieldInError("email") && (
                <Text style={{ color: "red" }}>
                  Please filled correct email address
                </Text>
              )}

              <Item>
                <Label>Country *</Label>
                <Picker
                  note
                  mode="dropdown"
                  style={{ width: 120 }}
                  selectedValue={country}
                  onValueChange={this.onValueChange.bind(this)}
                  ref="country"
                >
                  <Picker.Item label="Pakistan" value="Pakistan" />
                </Picker>
              </Item>

              <Item>
                <Label>Town / City *</Label>
                <Input
                  placeholder="Karachi"
                  value={town_city}
                  onChangeText={text => this.setState({ town_city: text })}
                  ref="town_city"
                />
              </Item>
              {this.isFieldInError("town_city") && (
                <Text style={{ color: "red" }}>Please write corrcet city</Text>
              )}

              <Item>
                <Label>Address *</Label>
                <Input
                  placeholder=""
                  value={address}
                  onChangeText={text => this.setState({ address: text })}
                  ref="address"
                />
              </Item>
              {this.isFieldInError("address") && (
                <Text style={{ color: "red" }}>
                  Please filled correct address
                </Text>
              )}

              <Item>
                <Label>State/Division *</Label>
                <Picker
                  note
                  mode="dropdown"
                  style={{ width: 120 }}
                  selectedValue={state_division}
                  onValueChange={this.onValueChange2.bind(this)}
                  ref="state_division"
                >
                  <Picker.Item label="Select State/Division" value="" />
                  <Picker.Item label="Sindh" value="Sindh" />
                  <Picker.Item label="Punjab" value="Punjab" />
                  <Picker.Item label="Balochistan" value="Balochistan" />
                  <Picker.Item label="KPK" value="KPK" />
                </Picker>
              </Item>
              {this.isFieldInError("state_division") && (
                <Text style={{ color: "red" }}>
                  Please select state/division
                </Text>
              )}

              <Item>
                <Label>Delivery Time *</Label>
                <Picker
                  note
                  mode="dropdown"
                  style={{ width: 120 }}
                  selectedValue={deliverytime}
                  onValueChange={this.onValueChange3.bind(this)}
                  ref="deliverytime"
                >
                  <Picker.Item label="Select Delivery Time" value="" />
                  <Picker.Item
                    label="10:00 AM To 01:00 PM"
                    value="10:00 AM To 01:00 PM"
                  />
                  <Picker.Item
                    label="01:00 PM To 03:00 PM"
                    value="01:00 PM To 03:00 PM"
                  />
                  <Picker.Item
                    label="03:00 PM To 06:00 PM"
                    value="03:00 PM To 06:00 PM"
                  />
                </Picker>
              </Item>
              {this.isFieldInError("deliverytime") && (
                <Text style={{ color: "red" }}>
                  Please select delivery time
                </Text>
              )}

              <Item>
                <Label>Delivery Date *</Label>
                <DatePicker
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="Select date"
                  textStyle={{ color: "green" }}
                  placeHolderTextStyle={{ color: "#d3d3d3" }}
                  onDateChange={this.setDate}
                  disabled={false}
                  ref="datePick"
                />
              </Item>
              {this.isFieldInError("datePick") && (
                <Text style={{ color: "red" }}>
                  Please select delivery date
                </Text>
              )}

              <Item>
                <Label>Phone *</Label>
                <Input
                  placeholder="923xxxxxxxxx"
                  value={phone}
                  onChangeText={text => this.setState({ phone: text })}
                  ref="phone"
                />
              </Item>
              {this.isFieldInError("phone") && (
                <Text style={{ color: "red" }}>Please filled correctly</Text>
              )}
              {(phone.charAt(0) != "9" || phone.charAt(1) != "2") &&
                phone.length > 0 && (
                  <Text style={{ color: "red" }}>
                    Please insert number like this 923xxxxxxxxx
                  </Text>
                )}

              <Item>
                <Label>Order Notes</Label>
                <Input
                  placeholder="Order Notes"
                  value={ordernotes}
                  onChangeText={text => this.setState({ ordernotes: text })}
                />
              </Item>
              <Button
                bordered
                dark
                style={{ marginTop: 10, marginBottom: 5 }}
                onPress={() => this._onPressButton()}
              >
                <Text
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    textAlign: "center"
                  }}
                >
                  CONTINUE
                </Text>
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
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
)(CheckoutBillingAddress);
