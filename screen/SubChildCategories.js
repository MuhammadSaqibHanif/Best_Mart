import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";
import { Container, Root, Body, Header, Left, Button, Icon } from "native-base";
import { Col, Grid } from "react-native-easy-grid";
import Spinner from "react-native-loading-spinner-overlay";

import SubChildCategoriesBox from "../components/SubChildCategoriesBox";
import SubChildCategoriesSideBar from "../components/SubChildCategoriesSideBar";
import { SUBCATEGORY_PRODUCTS } from "../Api";

class ChildCategories extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      showChildData: false,
      initialData: [],
      showInitialData: false
    };
  }

  getSubCategoriesId = sub_category => {
    this.setState({
      loading: true
    });

    fetch(`${SUBCATEGORY_PRODUCTS}?sub_category=${sub_category}`)
      .then(res => res.json())
      .then(response => {
        if (response[0].id) {
          this.setState({
            data: response,
            showChildData: true
          });
        } else {
          this.setState({
            data: false
          });
        }
        this.setState({
          loading: false
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({
          loading: false
        });
      });
  };

  componentDidMount() {
      fetch(
      `${SUBCATEGORY_PRODUCTS}?sub_category=${this.props.navigation.state.params.value.sub_category}`
    )
      .then(res => res.json())
      .then(response => {
        if (response[0].id) {
          this.setState({
            initialData: response,
            showInitialData: true
          });
        } else {
          this.setState({
            initialData: false
          });
        }
      })
      .catch(error => console.error(error));
  }

  render() {
    const { childData, navigate } = this.props.navigation.state.params;
    const {
      data,
      showChildData,
      initialData,
      showInitialData,
      loading
    } = this.state;

    return (
      <Root>
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{
            color: "#FFF"
          }}
        />
        <Header style={{ backgroundColor: "#3D3B48", marginTop: 22 }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon type="AntDesign" name="arrowleft" />
            </Button>
          </Left>
          <Body
            style={{
              flex: 1,
              justifyContent: "flex-start",
              flexDirection: "row",
              marginLeft: 10
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
                <SubChildCategoriesSideBar
                  childData={childData}
                  getSubCategoriesId={this.getSubCategoriesId}
                />
              </ScrollView>
            </Col>

            <Col style={{ height: "100%" }}>
              <ScrollView>
                <SubChildCategoriesBox
                  navigate={navigate}
                  data={data}
                  showChildData={showChildData}
                  values={initialData}
                  showInitialData={showInitialData}
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
