import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";
import {
  Container,
  Root,
  Body,
  Header,
  Toast,
  Left,
  Button,
  Icon
} from "native-base";
import { Col, Grid } from "react-native-easy-grid";

import ChildCategoriesBox from "../components/ChildCategoriesBox";
import ChildCategoriesSideBar from "../components/ChildCategoriesSideBar";

class ChildCategories extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      childData: [],
      showChildData: false,
      initialData: [],
      showInitialData: false
    };
  }

  getCategoriesId = id => {
    // fetch(`https://www.isales.pk/api/sub_child_categories.php?id=${id}`)
    //   .then(res => res.json())
    //   .then(response => {
    //     this.setState({
    //       data: response,
    //       showChildData: true
    //     });
    //   })
    //   .catch(() =>
    //     Toast.show({
    //       text: "Network Error",
    //       position: "bottom",
    //       duration: 3000
    //     })
    //   );
  };

  componentDidMount() {
    fetch(
      `https://www.isales.pk/api/sub_child_categories.php?id=${
        this.props.navigation.state.params.value.id
      }`
    )
      .then(res => res.json())
      .then(response => {
        this.setState({
          initialData: response,
          showInitialData: true
        });
      })
      .catch(() =>
        Toast.show({
          text: "Network Error",
          position: "bottom",
          duration: 3000
        })
      );
  }

  render() {
    const { childData, navigate } = this.props.navigation.state.params;
    const { data, showChildData, initialData, showInitialData } = this.state;

    return (
      <Root>
        <Header style={{ backgroundColor: "#3D3B48", marginTop: 22 }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon type="AntDesign" name="arrowleft" />
            </Button>
          </Left>
          <Body
            style={{
              flex: 1,
              justifyContent: "center",
              flexDirection: "row",
              marginRight: 10
            }}
          >
            <View>
              <Text style={{ fontSize: 22, color: "white", fontWeight: "500" }}>
                Categories
              </Text>
            </View>
          </Body>
        </Header>
        <Container>
          <Grid>
            <Col style={{ height: "100%", width: "20%" }}>
              <ScrollView>
                <ChildCategoriesSideBar
                  childData={childData}
                  getCategoriesId={this.getCategoriesId}
                />
              </ScrollView>
            </Col>

            <Col style={{ height: "100%" }}>
              <ScrollView>
                <ChildCategoriesBox
                  data={data}
                  values={initialData}
                  showInitialData={showInitialData}
                  showChildData={showChildData}
                  navigate={navigate}
                />
              </ScrollView>
            </Col>
          </Grid>
        </Container>
      </Root>
    );
  }
}

export default ChildCategories;
