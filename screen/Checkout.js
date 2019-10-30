import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import { Header, Body } from "native-base";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";
import CheckoutBillingAddress from "../components/CheckoutBillingAddress";
import CheckoutAlreadyACustomer from "../components/CheckoutAlreadyACustomer";
import CheckoutYourOrder from "../components/CheckoutYourOrder";
import { CHECKOUT } from "../Api";

class Checkout extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      showYourOrder: false,
      updateLoginData: false,
      paymentMethod: "cod"
    };
  }

  _updateLoginData = () => {
    this.setState({
      updateLoginData: true
    });
  };

  _saveCheckoutBillingData = (
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
  ) => {
    this.setState({
      name,
      email,
      country,
      town_city,
      address,
      state_division,
      deliverytime,
      deliveryDate,
      phone,
      ordernotes,
      showYourOrder: true
    });
  };

  _submitOrder = checkBoxName => {
    this.setState({ paymentMethod: checkBoxName }, () => {
      this.checkOut();
    });
  };

  checkOut = () => {
    const {
      paymentMethod,
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

    const {
      perProductQuantities,
      grandTotal,
      product_id,
      price
    } = this.props.navigation.state.params;

    Object.values(this.props.user.CartData).map((value, index) => {
      const thisPrice = value.selling_price;

      if (Object.keys(this.props.user.CartData).length == index + 1) {
        this.setState({ ready: "Yes" }, () => {
          let formData = new FormData();
          formData.append(
            "user_id",
            this.props.user.UserId ? this.props.user.UserId : ""
          );
          formData.append("username", name);
          formData.append(
            "company_name",
            this.props.user.UserId ? this.props.user.userData.company_name : ""
          );
          formData.append("address", address);
          formData.append("country", country);
          formData.append("city", town_city);
          formData.append("state", state_division);
          formData.append("delivery_time", deliverytime);
          formData.append("email", email);
          formData.append("phone", phone);
          formData.append("order_notes", ordernotes);
          formData.append("payment_method", paymentMethod);
          formData.append("product_id", product_id.toString());
          formData.append("product_quantity", perProductQuantities.toString());
          formData.append("product_price", price.toString());
          formData.append("total_price", grandTotal);
          formData.append("shipping_charges", "150");
          formData.append("description", "");
          formData.append("tax", "0");

          fetch(`${CHECKOUT}`, {
            body: formData,
            method: "POST"
          })
            .then(res => res.json())
            .then(response => {
              console.log("checkout response >>>", response);

              if (response == "Success") {
                this.props.updateUser({
                  UserId: this.props.user.UserId,
                  userData: this.props.user.userData
                });

                this.setState({
                  paymentMethod: "",
                  name: "",
                  email: "",
                  country: "",
                  town_city: "",
                  address: "",
                  state_division: "",
                  deliverytime: "",
                  deliveryDate: "",
                  phone: "",
                  ordernotes: "",
                  paymentMethod: "cod"
                });

                alert("Checkout Successfully!");
              }

              if (response != "Success") {
                alert("Checout again please");
              }
            })
            .catch(error => {
              console.log("error >>>", error);
              alert("Network Error");
            });
        });
      }
    });
  };

  render() {
    const { showYourOrder, updateLoginData } = this.state;

    return (
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
              <Text style={{ fontSize: 22, color: "white", fontWeight: "500" }}>
                Checkout
              </Text>
            </View>
          </Body>
        </Header>
        <ScrollView>
          <CheckoutAlreadyACustomer updateLoginData={this._updateLoginData} />
            <CheckoutBillingAddress
            updateLoginData={updateLoginData}
            _saveCheckoutBillingData={this._saveCheckoutBillingData}
          />

          {showYourOrder && (
            <CheckoutYourOrder _submitOrder={this._submitOrder} />
          )}
        </ScrollView>
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
)(Checkout);
