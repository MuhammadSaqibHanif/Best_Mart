import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Header, Body, Badge, Drawer } from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import DealsDiscountsProducts from "../components/DealsDiscountsProducts";
import ContentView from "./Drawer";

const win = Dimensions.get("window");

class DealsDiscounts extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  openDrawer = () => {
    this.drawer._root.open();
  };

  closeDrawer = () => {
    this.drawer._root.close();
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<ContentView menu={this.props} />}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.3}
        panCloseMask={0.3}
      >
        <Spinner
          visible={this.state.loading}
          textContent={"Loading..."}
          textStyle={{
            color: "#FFF"
          }}
        />
        <View style={styles.container}>
          <Header style={{ backgroundColor: "#3D3B48", height: 65 }}>
            <Body
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "50%"
                }}
              >
                <TouchableOpacity onPress={this.openDrawer.bind(this)}>
                  <Image source={require("../images/menu.png")} />
                </TouchableOpacity>
                <Image
                  source={require("../images/bestmart-back.png")}
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    width: win.width,
                    height: win.height
                  }}
                  resizeMode="contain"
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "30%"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigate("SignInUp");
                  }}
                >
                  <Image source={require("../images/person.png")} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigate("Cart");
                  }}
                >
                  <View style={{ marginRight: 15 }}>
                    <Image source={require("../images/cart.png")} />
                    <Badge
                      style={{
                        backgroundColor: "white",
                        width: 20,
                        height: 20,
                        left: 20,
                        position: "absolute",
                        zIndex: 1,
                        color: "black"
                      }}
                    >
                      <Text>
                        {this.props.user && this.props.user.CartData
                          ? Object.values(this.props.user.CartData).length
                          : 0}
                      </Text>
                    </Badge>
                  </View>
                </TouchableOpacity>
              </View>
            </Body>
          </Header>
          {/* Body */}
          <ScrollView>
            <DealsDiscountsProducts
              Heading="DEALS & DISCOUNTS"
              navigate={navigate}
            />
          </ScrollView>
        </View>
      </Drawer>
    );
  }
}

export default DealsDiscounts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
    backgroundColor: "white"
  }
});
