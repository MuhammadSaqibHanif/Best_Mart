import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";

class CategoriesHome extends Component {
  state = {
    data: []
  };

  componentWillMount() {
    fetch("https://bestmart.com.pk/bestmart_api/Get/get_categories.php")
      .then(res => res.json())
      .then(response => {
        if (response[0].category) {
          this.setState({
            data: response
          });
        }
      })
      .catch(() => {});
  }

  navigateFunc = (value, navigate) => {
    let category_name = value.category.replace(/\s+/g, "_").replace("&", "And");

    if (category_name == "Stationery") {
      category_name = "Stationary";
    }

    // console.log("category_name >>>>>>>>>>>>>>>>", category_name);

    fetch(
      `https://bestmart.com.pk/bestmart_api/Get/get_subcategories_by_parent.php?category=${category_name}`
    )
      .then(res => res.json())
      .then(response => {
        // console.log("get_subcategories_by_parent", response);

        if (response[0].category) {
          navigate("Categories", {
            response
          });
        }
      })
      .catch(err => {
        console.log("get_subcategories_by_parent", err);
      });
  };

  render() {
    const { Heading, navigate } = this.props;
    const { data } = this.state;

    return (
      <View style={{ flexDirection: "column" }}>
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
                width: "49.3%",
                height: 130,
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
                style={{  flex: 1 }}
                resizeMode="cover"
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
