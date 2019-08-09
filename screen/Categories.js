import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";
import { Container, Root, Body, Header } from "native-base";
import { Col, Grid } from "react-native-easy-grid";
import Spinner from "react-native-loading-spinner-overlay";

import CategoriesBox from "../components/CategoriesBox";
import CategoriesSideBar from "../components/CategoriesSideBar";
import { CATEGORIES, SUBCATEGORIES_PARENT } from "../Api";

class Categories extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      childData: [],
      showchildData: false,
      stopHomeData: false // ****************
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });

    fetch(`${CATEGORIES}`)
      .then(res => res.json())
      .then(response => {
        if (response[0].category) {
          this.setState({
            data: response
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
  }

  static getDerivedStateFromProps(props, state) {
    if (props) {
      if (props.navigation) {
        if (props.navigation.state) {
          if (props.navigation.state.params) {
            if (props.navigation.state.params.response != false) {
              return {
                childData: props.navigation.state.params.response,
                showchildData: true
              };
            }
          }
        }
      }
    }

    return null;
  }

  getCategoriesId = value => {
    this.setState({
      loading: true
    });

    let category_name = value.category.replace(/\s+/g, "_").replace("&", "And");

    if (category_name == "Stationery") {
      category_name = "Stationary";
    }

    fetch(`${SUBCATEGORIES_PARENT}?category=${category_name}`)
      .then(res => res.json())
      .then(response => {
        // console.log("get_subcategories_by_parent >>>", response);

        if (response[0].id) {
          this.setState({
            childData: response,
            showchildData: true,
            stopHomeData: true // ********************
          });

          this.props.navigation.setParams({ response: false });
        }

        this.setState({
          loading: false
        });
      })
      .catch(error => {
        console.error("get_subcategories_by_parent", error);
        this.setState({
          loading: false
        });
      });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { data, childData, showchildData, loading } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{
            color: "#FFF"
          }}
        />
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
      </View>
    );
  }
}

export default Categories;
