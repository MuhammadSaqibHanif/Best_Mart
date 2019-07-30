import React, { Component } from "react";
import { Container, Tab, Tabs } from "native-base";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

export default class SignInUp extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container style={{ marginTop: 22 }}>
        <Tabs>
          <Tab
            heading="Sign In"
            tabStyle={{ backgroundColor: "white" }}
            activeTabStyle={{ backgroundColor: "white" }}
            activeTextStyle={{ color: "blue" }}
            textStyle={{ color: "gray" }}
          >
            <SignIn navigate={navigate} navprops={this.props.navigation} />
          </Tab>
          <Tab
            heading="Sign Up"
            tabStyle={{ backgroundColor: "white" }}
            activeTabStyle={{ backgroundColor: "white" }}
            activeTextStyle={{ color: "blue" }}
            textStyle={{ color: "gray" }}
          >
            <SignUp navigate={navigate} navigation={this.props.navigation} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
