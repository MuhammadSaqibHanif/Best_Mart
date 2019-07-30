import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import { Constants } from "expo";
import { Header, Body } from "native-base";
import { Overlay } from "react-native-elements";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";
import CheckoutBillingAddress from "../components/CheckoutBillingAddress";
import CheckoutAlreadyACustomer from "../components/CheckoutAlreadyACustomer";
import CheckoutYourOrder from "../components/CheckoutYourOrder";

class Checkout extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      showYourOrder: false,
      product_id: [],
      price: [],
      paymentMethod: "Cash on delivery",
      isVisible: true
    };
  }

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
    console.log(
      "_saveCheckoutBillingData",
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
    console.log("checkBoxName", checkBoxName);

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
      deliveryDate,
      phone,
      ordernotes
    } = this.state;

    const {
      perProductQuantities,
      grandTotal,
      product_id,
      price
    } = this.props.navigation.state.params;

    // this.props.user && this.props.user.CartData
    // ?
    Object.values(this.props.user.CartData).map((value, index) => {
      const thisPrice = value.selling_price;
      console.log(" product_id: [...prevState.product_id, value.id]", value.id);

      if (Object.keys(this.props.user.CartData).length == index + 1) {
        this.setState({ ready: "Yes" }, () => {
          console.log(
            "this.props.user.CartData***************",
            this.props.user.UserId,
            "*",
            name,
            "*",
            this.props.user.userData.company_name,
            "*",
            address,
            "*",
            country,
            "*",
            town_city,
            "*",
            state_division,
            "*",
            deliverytime,
            "*",
            email,
            "*",
            phone,
            "*",
            ordernotes,
            "*",
            paymentMethod,
            "*",
            product_id,
            "*",
            perProductQuantities,
            "*",
            price,
            "*",
            grandTotal,
            "*"
          );

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
          formData.append("tax", "");

          fetch("https://bestmart.com.pk/bestmart_api/Post/checkout.php", {
            body: formData,
            method: "POST"
          })
            .then(res => res.json())
            .then(response => {
              console.log("sign-up response", response);

              if (response == "Success") {
                console.log("Success >>>>>>>>>>>>>>");

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
                  paymentMethod: "Cash on delivery"
                });

                alert("Checkout Successfully!");
              }

              if (response != "Success") {
                alert("Checout again please");
              }
            })
            .catch(error => {
              console.log("error >>>>>>>>>>", error);
              alert("Network Error");
            });
        });
      }
    });
    // : alert("You are not Login");
    // this.props.navigation.navigate("GuestLogin");
  };

  render() {
    const { showYourOrder, isVisible } = this.state;

    const {
      perProductQuantities,
      grandTotal,
      product_id,
      price
    } = this.props.navigation.state.params;

    console.log(
      ">>>>>>>>",
      perProductQuantities,
      grandTotal,
      product_id,
      price
    );

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
        {/* Body */}
        <ScrollView>
          {/* CHECKOUT METHOD */}
          <CheckoutAlreadyACustomer />

          {/* Billing Address */}
          <CheckoutBillingAddress
            _saveCheckoutBillingData={this._saveCheckoutBillingData}
          />

          {/* Your Order */}
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
