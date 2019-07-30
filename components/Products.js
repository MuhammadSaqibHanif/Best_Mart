import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Root, Toast } from "native-base";
import { Divider } from "react-native-elements";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";

class CategoriesHome extends Component {
  state = {
    data: []
  };

  componentWillMount() {
    fetch("https://bestmart.com.pk/bestmart_api/Get/get_subcategories.php")
      .then(res => res.json())
      .then(response => {
        if (response[0].id) {
          this.setState({
            data: response
          });
        }
      })
      .catch(() => {
        // Toast.show({
        //   text: "Network Error",
        //   position: "bottom",
        //   duration: 3000
        // })
      });
  }

  navigateFunc = (value, navigate) => {
    fetch(
      `https://bestmart.com.pk/best_mart/api/get/child-categories/${value.id}`
    )
      .then(res => res.json())
      .then(response => {
        if (response[0].id) {
          navigate("Categories", {
            response
          });
        }
      })
      .catch(() => {
        // Toast.show({
        //   text: "Network Error",
        //   position: "bottom",
        //   duration: 3000
        // });
      });
  };

  render() {
    const { Heading, navigate } = this.props;
    const { data } = this.state;

    return (
      <Root>
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
                  style={{ flex: 1 }}
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
                    {value.sub_category}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
)(CategoriesHome);
