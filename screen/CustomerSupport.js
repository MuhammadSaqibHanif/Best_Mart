import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Linking
} from "react-native";
import ContentView from "./Drawer";
import { Header, Body, Drawer } from "native-base";
import { SocialIcon } from "react-native-elements";

export default class CustomerSupport extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  openDrawer = () => {
    this.drawer._root.open();
  };
  closeDrawer = () => {
    this.drawer._root.close();
  };

  render() {
    // const { navigate } = this.props.navigation;

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
          <Header style={{ backgroundColor: "#3D3B48" }}>
            <Body
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <TouchableOpacity onPress={this.openDrawer.bind(this)}>
                  <Image source={require("../images/menu.png")} />
                </TouchableOpacity>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontWeight: "500",
                    marginLeft: 20
                  }}
                >
                  Support / Assistance
                </Text>
              </View>
            </Body>
          </Header>
          <View
            style={{
              height: "90%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View>
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  textAlign: "center",
                  marginBottom: 15
                }}
              >
                If you have any query, feel free to contact us via 0304-2227944
                or support@bestmart.com.pk
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  textAlign: "center",
                  marginBottom: 10
                }}
              >
                Stay connected with Bestmart on Social Media
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("https://facebook.com/bestmart123")
                }
              >
                <SocialIcon type="facebook" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    "https://www.instagram.com/official_bestmart/"
                  )
                }
              >
                <SocialIcon type="instagram" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22
  }
});
