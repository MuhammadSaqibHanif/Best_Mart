import React from "react";
import {
  Header,
  Body,
  Content,
  Picker,
  Item,
  Input,
  Card,
  Radio
} from "native-base";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  ImageBackground
} from "react-native";

class CheckoutForm extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Header style={{ backgroundColor: "red" }}>
          <Body
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Image
                source={require("../images/left-arrow.png")}
                style={{ width: 25, height: 15 }}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "500",
                  marginLeft: 20
                }}
              >
                Checkout
              </Text>
            </View>
          </Body>
        </Header>
        <ScrollView style={{ backgroundColor: "#E8E8E8" }}>
          <View
            style={{
              width: "100%",
              backgroundColor: "#3D3B48",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "white", padding: 20 }}>Billing Details</Text>
          </View>
          {/* <View style={{ flex: 1.5 }}>
            <ImageSlider />
          </View> */}
          {/* <View style={{ width: "100%", backgroundColor: "#3D3B48" }}>
            <Picker mode="dropdown" style={{ color: "white" }}>
              <Picker.Item label="All Categories" />
              <Picker.Item label="A" />
              <Picker.Item label="B" />
              <Picker.Item label="Casual Dresses" />
            </Picker>
          </View> */}

          <View style={{ position: "relative", bottom: 13, zIndex: -1 }}>
            <Card>
              <ImageBackground
                source={require("../images/banner-checkout-form.jpg")}
                style={{
                  width: "100%",
                  height: 180
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(99,95,96,0.5)",
                    height: "100%"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      padding: 10
                    }}
                  >
                    <Image source={require("../images/error.png")} />
                  </View>

                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <Text
                      style={{
                        fontSize: 25,
                        color: "white",
                        fontWeight: "500"
                      }}
                    >
                      Have A Coupoun?
                    </Text>
                  </View>

                  <View
                    style={{
                      marginTop: 20,
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "center"
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "rgba(131,122,125,0.5)",
                        flexDirection: "row",
                        width: "60%",
                        borderRadius: 5,
                        justifyContent: "center"
                      }}
                    >
                      <Input
                        placeholder="Coupoun Code here"
                        style={{ paddingLeft: 20 }}
                      />
                    </View>
                    <View
                      style={{
                        marginLeft: 10,
                        backgroundColor: "white",
                        flexDirection: "row",
                        width: "30%",
                        borderRadius: 5,
                        justifyContent: "center"
                      }}
                    >
                      <Text
                        style={{
                          padding: 12
                        }}
                      >
                        APPLY
                      </Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </Card>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 40,
              width: "100%",
              borderRadius: 10
            }}
          >
            <Item
              style={{
                width: "80%",
                backgroundColor: "white",
                borderRadius: 4
              }}
            >
              <Input placeholder="Select a City" />
            </Item>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#534D59",
                width: 50,
                height: 50
              }}
            >
              <Image source={require("../images/arrow-down.png")} />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 40,
              width: "100%",
              borderRadius: 10
            }}
          >
            <Item
              style={{
                width: "90%",
                backgroundColor: "white",
                borderRadius: 4
              }}
            >
              <Input placeholder="Full Name" />
            </Item>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 40,
              width: "100%",
              borderRadius: 10
            }}
          >
            <Item
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "90%",
                backgroundColor: "white",
                borderRadius: 4,
                padding: 10,
                height: 60
              }}
            >
              <Input placeholder="Dhooraji colony, Pakistan" />
              <Image source={require("../images/check.png")} />
            </Item>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 40,
              width: "100%",
              borderRadius: 10
            }}
          >
            <Item
              style={{
                width: "90%",
                backgroundColor: "white",
                borderRadius: 4
              }}
            >
              <Input placeholder="Address Line two" />
            </Item>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 40,
              width: "100%",
              borderRadius: 10
            }}
          >
            <Item
              style={{
                width: "90%",
                backgroundColor: "white",
                borderRadius: 4
              }}
            >
              <Input placeholder="Town/City" />
            </Item>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 40,
              width: "100%",
              borderRadius: 10
            }}
          >
            <Item
              style={{
                width: "45%",
                backgroundColor: "white",
                borderRadius: 4,
                height: 60
              }}
            >
              <Input placeholder="PostCode/Zip" />
            </Item>

            <Item
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
                marginLeft: 10,
                width: "45%",
                backgroundColor: "white",
                borderRadius: 4,
                height: 60
              }}
            >
              <Input placeholder="Phone" />
              <Image source={require("../images/wrong.png")} />
            </Item>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 40,
              width: "100%",
              borderRadius: 10
            }}
          >
            <Item
              style={{
                width: "90%",
                backgroundColor: "white",
                borderRadius: 4
              }}
            >
              <Input placeholder="Email-Mail Address" />
            </Item>
          </View>

          <View
            style={{
              marginBottom: 80,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                marginTop: 40,
                flexDirection: "row",
                backgroundColor: "#85B162",
                width: "50%",
                justifyContent: "center"
              }}
            >
              <Text style={{ padding: 13, color: "white" }}>
                NEXT - YOUR ORDER
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default CheckoutForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
    backgroundColor: "white"
  },
  mycontainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start" // if you want to fill rows left to right
  },
  myitem: {
    width: "30%",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
    // is 50% of container width
  }
});
