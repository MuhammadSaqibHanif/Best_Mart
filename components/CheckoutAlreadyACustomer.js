import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Button, Item, Input } from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";
import { SIGNIN } from "../Api";

class CheckoutAlreadyACustomer extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      emailLogin: "",
      passwordLogin: "",
      loading: false
    };
  }

  signIn = () => {
    const { emailLogin, passwordLogin } = this.state;

    this.setState({
      loading: true
    });

    fetch(`${SIGNIN}?email=${emailLogin}&password=${passwordLogin}`, {
      // body: formData,
      method: "POST"
    })
      .then(res => res.json())
      .then(response => {
        console.log("reponse login >>>", response);

        if (response[0].id) {
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

          this.props.updateLoginData();

          this.setState({
            emailLogin: "",
            passwordLogin: ""
          });
        }

        this.setState({
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          loading: false
        });

        console.log("Error: SignIn*******", error);
      });
  };

  render() {
    const { emailLogin, passwordLogin, loading } = this.state;

    return (
      <View style={{ marginTop: 10 }}>
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{
            color: "#FFF"
          }}
        />
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
            CHECKOUT METHOD
          </Text>
          <View
            style={{
              width: "90%",
              alignSelf: "center",
              marginTop: 10
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              ALREADY A CUSTOMER
            </Text>
            <Text style={{ marginTop: 5, color: "gray" }}>
              If you are our registered customer, please enter your details in
              the boxes below. If you are a new customer please proceed to the
              Billing & Shipping section.
            </Text>
            <Item>
              <Input
                placeholder="Email*"
                value={emailLogin}
                onChangeText={text => this.setState({ emailLogin: text })}
              />
            </Item>
            <Item>
              <Input
                placeholder="Password*"
                secureTextEntry={true}
                value={passwordLogin}
                onChangeText={text => this.setState({ passwordLogin: text })}
              />
            </Item>
            <Button
              bordered
              dark
              style={{ marginTop: 10, marginBottom: 5 }}
              onPress={() => this.signIn()}
            >
              <Text
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  textAlign: "center"
                }}
              >
                LOGIN
              </Text>
            </Button>
            <TouchableOpacity>
              <Text style={{ color: "lightblue" }}>Forgot your Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
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
)(CheckoutAlreadyACustomer);
