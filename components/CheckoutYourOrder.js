import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Button, ListItem, CheckBox, Body } from "native-base";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";

class CheckoutYourOrder extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      checkBox1: true,
      checkBox2: false,
      checkBox3: false,
      checkBox4: false,
      checkBoxName: "cod"
    };
  }

  _getCheckboxValue = (
    checkBoxName,
    checkBox1,
    checkBox2,
    checkBox3,
    checkBox4
  ) => {
    this.setState({
      checkBoxName,
      checkBox1: checkBox1.checkBox1,
      checkBox2: checkBox2.checkBox2,
      checkBox3: checkBox3.checkBox3,
      checkBox4: checkBox4.checkBox4
    });
  };

  render() {
    const {
      checkBox1,
      checkBox2,
      checkBox3,
      checkBox4,
      checkBoxName
    } = this.state;
    const { _submitOrder } = this.props;

    return (
      <View style={{ marginTop: 10 }}>
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
            YOUR ORDER
          </Text>
          <View
            style={{
              width: "90%",
              alignSelf: "center",
              marginTop: 10
            }}
          >
            <ListItem>
              <CheckBox checked={checkBox1} />
              <Body>
                <TouchableOpacity
                  onPress={() =>
                    this._getCheckboxValue(
                      "cod",
                      { checkBox1: true },
                      { checkBox2: checkBox2 && false },
                      { checkBox3: checkBox3 && false },
                      { checkBox4: checkBox4 && false }
                    )
                  }
                >
                  <Text style={{ fontSize: 14 }}>Cash on delivery</Text>
                </TouchableOpacity>
              </Body>
            </ListItem>

            <ListItem>
              <CheckBox checked={checkBox2} />
              <Body>
                <TouchableOpacity
                  onPress={() =>
                    this._getCheckboxValue(
                      "Pay With Card (Only for Karachi users)",
                      { checkBox1: checkBox1 && false },
                      { checkBox2: true },
                      { checkBox3: checkBox3 && false },
                      { checkBox4: checkBox4 && false }
                    )
                  }
                >
                  <Text style={{ fontSize: 14 }}>
                    Pay With Card (Only for Karachi users)
                  </Text>
                </TouchableOpacity>
              </Body>
            </ListItem>
            
            <ListItem>
              <CheckBox checked={checkBox4} />
              <Body>
                <TouchableOpacity
                  onPress={() =>
                    this._getCheckboxValue(
                      "Credit Terms",
                      { checkBox1: checkBox1 && false },
                      { checkBox2: checkBox3 && false },
                      { checkBox3: checkBox3 && false },
                      { checkBox4: true }
                    )
                  }
                >
                  <Text style={{ fontSize: 14 }}>Credit Terms</Text>
                </TouchableOpacity>
              </Body>
            </ListItem>

            <Button
              bordered
              dark
              style={{ marginTop: 10, marginBottom: 5 }}
              onPress={() => _submitOrder(checkBoxName)}
            >
              <Text
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  textAlign: "center"
                }}
              >
                SUBMIT
              </Text>
            </Button>
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
)(CheckoutYourOrder);
