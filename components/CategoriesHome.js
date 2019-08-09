import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";
import { CATEGORIES, SUBCATEGORIES_PARENT } from "../Api";

class CategoriesHome extends Component {
  state = {
    data: [],
    loading: false
  };

  componentWillMount() {
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
      .catch(() => {
        this.setState({
          loading: false
        });
      });
  }

  navigateFunc = (value, navigate) => {
    this.setState({
      loading: true
    });

    let category_name = value.category.replace(/\s+/g, "_").replace("&", "And");

    if (category_name == "Stationery") {
      category_name = "Stationary";
    }

    // console.log("category_name >>>>>>>>>>>>>>>>", category_name);

    fetch(`${SUBCATEGORIES_PARENT}?category=${category_name}`)
      .then(res => res.json())
      .then(response => {
        // console.log("get_subcategories_by_parent", response);

        if (response[0].category) {
          navigate("Categories", {
            response
          });
        }

        this.setState({
          loading: false
        });
      })
      .catch(err => {
        console.log("get_subcategories_by_parent", err);
        this.setState({
          loading: false
        });
      });
  };

  render() {
    const { Heading, navigate } = this.props;
    const { data, loading } = this.state;

    return (
      <View style={{ flexDirection: "column" }}>
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{
            color: "#FFF"
          }}
        />
        <View>
          <Text
            style={{
              fontSize: 24,
              color: "black",
              marginTop: 10,
              marginLeft: 10
            }}
          >
            {Heading}
          </Text>
        </View>
        <Divider
          style={{
            backgroundColor: "black",
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5
          }}
        />
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
          {data.map(value => (
            <TouchableOpacity
              key={value.id}
              style={{
                width: "49%",
                height: 180,
                borderWidth: 1,
                borderRadius: 2,
                borderColor: "#ddd",
                borderBottomWidth: 1,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 1,
                marginLeft: 1,
                marginRight: 1,
                marginTop: 2
              }}
              onPress={() => this.navigateFunc(value, navigate)}
            >
              <Image
                source={{ uri: value.image }}
                style={{ flex: 1 }}
                resizeMode="contain"
              />
              <View>
                <Text
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    textAlignVertical: "center",
                    textAlign: "center",
                    marginLeft: 2,
                    marginRight: 2,
                    marginBottom: 2,
                    fontSize: 12,
                    color: "gray"
                  }}
                >
                  {value.category}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

export default CategoriesHome;
