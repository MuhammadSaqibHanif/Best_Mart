import React, { Component } from "react";
import { Text, View } from "react-native";
import {
  Header,
  Body,
  Card,
  ListItem,
  Root,
  Toast,
  Left,
  Button,
  Icon
} from "native-base";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";

class AccountInformation extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      response: null
    };
  }

  componentDidMount() {
    this.props.user &&
      this.props.user.UserId &&
      fetch(
        `https://bestmart.com.pk/bestmart_api/Get/profile.php?id=${
          this.props.user.UserId
        }`
      )
      // fetch(`https://bestmart.com.pk/bestmart_api/Get/profile.php?id=6`)
        .then(res => res.json())
        .then(response => {
          if (response[0]) {
            if (response[0].email) {
              this.setState({ response });
            }
          }
        })
        .catch(error => {
          console.log(error);
          // Toast.show({
          //   text: "Network Error!",
          //   position: "bottom",
          //   duration: 3000
          // });
        });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { response } = this.state;
    console.log("Account Information", this.props);

    return (
      <Root>
        <View>
          <View style={{ marginTop: 22 }}>
            <Header style={{ backgroundColor: "#3D3B48" }}>
              <Left>
                <Button
                  transparent
                  onPress={() => this.props.navigation.navigate("Home")}
                >
                  <Icon type="AntDesign" name="arrowleft" />
                </Button>
              </Left>
              <Body style={{ marginLeft: 10 }}>
                <View>
                  <Text
                    style={{ fontSize: 22, color: "white", fontWeight: "500" }}
                  >
                    Account Information
                  </Text>
                </View>
              </Body>
            </Header>
          </View>
          {response != null && (
            <Card>
              <ListItem
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height: 200
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {`Name : `}
                </Text>
                <Text style={{ fontSize: 16 }}>{response[0].name}</Text>
              </ListItem>
              <ListItem
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {`Email : `}
                </Text>
                <Text style={{ fontSize: 16 }}>{response[0].email}</Text>
              </ListItem>
              <ListItem
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {`Contact Number : `}
                </Text>
                <Text style={{ fontSize: 16 }}>{response[0].contact_no}</Text>
              </ListItem>
              <ListItem
                style={{
                  // flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {`Address : `}
                </Text>
                <Text style={{ fontSize: 16 }}>{response[0].address}</Text>
              </ListItem>

              <ListItem
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {`Country : `}
                </Text>
                <Text style={{ fontSize: 16 }}>{response[0].country}</Text>
              </ListItem>
              <ListItem
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {`Company : `}
                </Text>
                <Text style={{ fontSize: 16 }}>{response[0].company_name}</Text>
              </ListItem>
              <ListItem
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {`City : `}
                </Text>
                <Text style={{ fontSize: 16 }}>{response[0].city}</Text>
              </ListItem>
             
             
             
              <ListItem
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {`User ID : `}
                </Text>
                <Text style={{ fontSize: 16 }}>{response[0].id}</Text>
              </ListItem>
             
            </Card>
          )}
        </View>
      </Root>
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
)(AccountInformation);
