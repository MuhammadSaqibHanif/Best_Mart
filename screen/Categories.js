import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";
import { Container, Root, Body, Header } from "native-base";
import { Col, Grid } from "react-native-easy-grid";

import CategoriesBox from "../components/CategoriesBox";
import CategoriesSideBar from "../components/CategoriesSideBar";

class Categories extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      childData: [],
      showchildData: false,
      stopHomeData: false // ****************
    };
  }

  componentDidMount() {
    fetch("https://bestmart.com.pk/bestmart_api/Get/get_categories.php")
      .then(res => res.json())
      .then(response => {
        if (response[0].category) {
          this.setState({
            data: response
          });
        }
      })
      .catch(error => console.error(error));
  }

  static getDerivedStateFromProps(props, state) {
    if (state.stopHomeData) {
      return { stopHomeData: false };
    }
    if (props) {
      if (props.navigation) {
        if (props.navigation.state) {
          if (props.navigation.state.params) {
            if (props.navigation.state.params.response) {
              if (state.stopHomeData == false) {
                return {
                  childData: props.navigation.state.params.response,
                  showchildData: true
                };
              }
            }
          }
        }
      }
    }
    return null;
  }

  getCategoriesId = value => {
    let category_name = value.category.replace(/\s+/g, "_").replace("&", "And");

    if (category_name == "Stationery") {
      category_name = "Stationary";
    }

    fetch(
      `https://bestmart.com.pk/bestmart_api/Get/get_subcategories_by_parent.php?category=${category_name}`
    )
      .then(res => res.json())
      .then(response => {
        console.log("get_subcategories_by_parent >>>", response);

        if (response[0].id) {
          this.setState({
            childData: response,
            showchildData: true,
            stopHomeData: true // ********************
          });
        }
      })
      .catch(error => console.error(error));
  };

  render() {
    const { navigate } = this.props.navigation;
    const { data, childData, showchildData } = this.state;

    return (
      <Root>
        <Header style={{ backgroundColor: "#3D3B48", marginTop: 22 }}>
          <Body
            style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}
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
                <CategoriesSideBar
                  data={data}
                  getCategoriesId={this.getCategoriesId}
                />
              </ScrollView>
            </Col>

            <Col style={{ height: "100%" }}>
              <ScrollView>
                <CategoriesBox
                  childData={childData}
                  showchildData={showchildData}
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

export default Categories;
