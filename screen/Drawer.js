import React from "react";
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";

class ContentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _logOut = () => {
    this.props.updateUser({});
    alert("Log Out Successfully");
  };

  render() {
    const { navigate } = this.props.menu.navigation;

    // console.log("this.props", this.props);

    return (
      <View
        style={{
          height: Dimensions.get("window").height,
          backgroundColor: "#534D59"
        }}
      >
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "center",
            alignContent: "center",
            width: "100%",
            padding: 15
          }}
        >
          <TouchableOpacity onPress={() => navigate("Home")}>
            <Image
              source={require("../images/bestmart-back.png")}
              style={{
                width: 200,
                height: 70
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {this.props.user && this.props.user.userData && (
          <View
            style={{ alignSelf: "center", marginBottom: 10, marginTop: 10 }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "red",
                // marginTop: 10,
                // marginLeft: 10,
                fontWeight: "bold"
              }}
            >
              {this.props.user.userData.name}
            </Text>
          </View>
        )}

        {/* <View
          style={{
            marginTop: 10,
            marginBottom: 5,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            source={require("../images/man.png")}
            style={{ width: 100, height: 100 }}
          />
        </View> */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            marginTop: 10
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image source={require("../images/account.png")} />
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderTopColor: "white",
              borderBottomColor: "white",
              width: "80%"
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.props.user && this.props.user.UserId
                  ? navigate("AccountInformation")
                  : alert("You are not Log In")
              }
            >
              <Text style={{ padding: 14, color: "white" }}>MY ACCOUNT</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center"
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image source={require("../images/cart.png")} />
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderTopColor: "white",
              borderBottomColor: "white",
              width: "80%"
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.props.user && this.props.user.UserId
                  ? navigate("MyOrders")
                  : alert("You are not Log In")
              }
            >
              <Text style={{ padding: 14, color: "white" }}>MY ORDER</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center"
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image source={require("../images/support(acc).png")} />
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderTopColor: "white",
              borderBottomColor: "white",
              width: "80%"
            }}
          >
            <TouchableOpacity onPress={() => navigate("ContactUs")}>
              <Text style={{ padding: 14, color: "white" }}>CONTACT US</Text>
            </TouchableOpacity>
          </View>
        </View> */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center"
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image source={require("../images/salad.png")} />
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderTopColor: "white",
              borderBottomColor: "white",
              width: "80%"
            }}
          >
            <TouchableOpacity onPress={() => navigate("AboutUs")}>
              <Text style={{ padding: 14, color: "white" }}>ABOUT US</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center"
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image source={require("../images/check.png")} />
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderTopColor: "white",
              borderBottomColor: "white",
              width: "80%"
            }}
          >
            <TouchableOpacity onPress={() => navigate("Newsletter")}>
              <Text style={{ padding: 14, color: "white" }}>NEWSLETTER</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center"
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image source={require("../images/like.png")} />
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderTopColor: "white",
              borderBottomColor: "white",
              width: "80%"
            }}
          >
            <TouchableOpacity onPress={() => navigate("DealsDiscounts")}>
              <Text style={{ padding: 14, color: "white" }}>
                DEALS & DISCOUNTS
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            padding: 10
          }}
        >
          <Image source={require("../images/logout.png")} />
          {this.props.user && this.props.user.UserId ? (
            <TouchableOpacity onPress={() => this._logOut()}>
              <Text style={{ color: "white", marginLeft: 10 }}>Logout</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigate("SignInUp")}>
              <Text style={{ color: "white", marginLeft: 10 }}>SignIn</Text>
            </TouchableOpacity>
          )}
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
)(ContentView);
