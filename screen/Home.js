import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Header, Body, Item, Input, Badge, Icon, Drawer } from "native-base";
import ImageSlider from "../components/ImageSlider";
import ImageSliderBottom from "../components/ImageSliderBottom";
import Categories from "../components/CategoriesHome";
import AllProducts from "../components/AllProducts";
import AllBrands from "../components/AllBrands";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";
import ContentView from "./Drawer";

const win = Dimensions.get("window");

class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = { search: "", searchFood: false, showSpinner: false };
  }

  openDrawer = () => {
    this.drawer._root.open();
  };
  closeDrawer = () => {
    this.drawer._root.close();
  };

  search() {
    this.setState({
      showSpinner: true
    });

    this.state.search != ""
      ? fetch(
          `https://bestmart.com.pk/bestmart_api/Get/search_products.php?name=${
            this.state.search
          }`
        )
          .then(res => {
            res.json().then(data => {
              console.log("search_products data", data);
              if (data[0].category) {
                this.setState({
                  searchFood: data,
                  showSpinner: false
                });
              } else {
                this.setState({
                  searchFood: [
                    {
                      description: "No Items Found",
                      id: 0,
                      selling_price: 0
                    }
                  ],
                  showSpinner: false
                });
              }
            });
          })
          .catch(err => {
            console.log("restaurent search data error", err);
          })
      : this.setState({
          showSpinner: false
        });
  }

  render() {
    const { navigate } = this.props.navigation;

    // console.log("search****8", this.state);

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
                    navigate("AccountStack");
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
                {/* <Image source={require("../images/like.png")} /> */}
              </View>
            </Body>
          </Header>
          <ScrollView>
            <View style={{ marginBottom: 10 }}>
              <ImageSlider />
            </View>

            {this.state.showSpinner && (
              <ActivityIndicator size="small" color="#00ff00" />
            )}

            {/* search Box starts here */}
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              keyboardVerticalOffset={100}
              behavior="position"
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  borderWidth: 0.5,
                  borderRadius: 20,
                  width: "90%",
                  marginLeft: "5%",
                  marginTop: 10,
                  height: 40,
                  backgroundColor: "#E8EAED"
                }}
              >
                <Item style={{ width: "90%" }}>
                  <Input
                    placeholder="Search"
                    value={this.state.search}
                    onChangeText={search => this.setState({ search })}
                  />
                  <TouchableOpacity
                    onPress={() => this.search()}
                    style={{
                      borderLeftWidth: 1,
                      paddingLeft: 10,
                      borderLeftColor: "darkgray"
                    }}
                  >
                    <Icon name="ios-search" style={{ fontSize: 28 }} />
                  </TouchableOpacity>
                </Item>
              </View>
            </KeyboardAvoidingView>

            {/* After searching shows this */}
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              {this.state.searchFood &&
                this.state.searchFood.map(value => (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("ProductView", {
                        response: [value]
                      })
                    }
                    style={{
                      flexDirection: "row",
                      marginBottom: 5,
                      padding: 5
                    }}
                    key={value.id}
                  >
                    <View>
                      <Image
                        source={{ uri: value.image }}
                        style={{ height: 100, width: 100 }}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        marginLeft: 5,
                        marginRight: 2
                      }}
                    >
                      {value.quantity == "0" && (
                        <Text
                          style={{
                            textAlignVertical: "center",
                            fontSize: 16,
                            color: "gray",
                            fontWeight: "bold"
                          }}
                        >
                          Out of stock
                        </Text>
                      )}
                      <Text
                        adjustsFontSizeToFit={true}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          textAlignVertical: "center",
                          marginBottom: 2,
                          fontSize: 12,
                          color: "gray"
                        }}
                      >
                        {value.description.toUpperCase()}
                      </Text>
                      {value.old_price != "" && (
                        <Text
                          style={{
                            textAlignVertical: "center",
                            textDecorationLine: "line-through",
                            fontSize: 12,
                            color: "gray"
                          }}
                        >
                          PKR {value.old_price}.00
                        </Text>
                      )}

                      <Text
                        style={{
                          textAlignVertical: "center",
                          fontSize: 12,
                          color: "gray",
                          fontWeight: "bold"
                        }}
                      >
                        PKR {value.selling_price}.00
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>

            <View>
              <AllBrands />
            </View>

            <View style={{ flex: 1.5, marginLeft: 2 }}>
              <Categories Heading="Categories" navigate={navigate} />
            </View>

            {/* <View style={{ marginTop: 20 }}>
              <ImageSliderBottom />
            </View> */}

            <AllProducts Heading="Products" navigate={navigate} />
          </ScrollView>
        </View>
      </Drawer>
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
)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
    backgroundColor: "white"
  }
});
