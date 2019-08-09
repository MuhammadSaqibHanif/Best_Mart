import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import { Icon, Item, Input } from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import { SEARCH } from "../Api";

class SearchBoxHome extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      search: "",
      searchFood: false
    };
  }

  search() {
    this.setState({
      loading: true
    });

    this.state.search != ""
      ? fetch(`${SEARCH}?name=${this.state.search}`)
          .then(res => {
            res.json().then(data => {
              console.log("search_products data", data);
              if (data[0].category) {
                this.setState({
                  searchFood: data,
                  loading: false
                });
              } else {
                this.setState({
                  searchFood: [
                    {
                      description: "No Items Found",
                      id: 0,
                      selling_price: 0
                    }
                  ],
                  loading: false
                });
              }
            });
          })
          .catch(err => {
            console.log("restaurent search data error", err);
            this.setState({
              loading: false
            });
          })
      : this.setState({
          loading: true
        });
  }

  render() {
    const { navigate } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Spinner
          visible={this.state.loading}
          textContent={"Loading..."}
          textStyle={{
            color: "#FFF"
          }}
        />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          keyboardVerticalOffset={100}
          behavior="position"
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              borderWidth: 0.5,
              borderRadius: 20,
              width: "90%",
              marginLeft: "5%",
              marginTop: 10,
              height: 40,
              backgroundColor: "#E8EAED"
            }}
          >
            <Item style={{ width: "90%" }}>
              <Input
                placeholder="Search"
                value={this.state.search}
                onChangeText={search => this.setState({ search })}
              />
              <TouchableOpacity
                onPress={() => this.search()}
                style={{
                  borderLeftWidth: 1,
                  paddingLeft: 10,
                  borderLeftColor: "darkgray"
                }}
              >
                <Icon name="ios-search" style={{ fontSize: 28 }} />
              </TouchableOpacity>
            </Item>
          </View>
        </KeyboardAvoidingView>

        {/* After searching shows this */}
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          {this.state.searchFood &&
            this.state.searchFood.map(value => (
              <TouchableOpacity
                onPress={() =>
                  navigate("ProductView", {
                    response: [value]
                  })
                }
                style={{
                  flexDirection: "row",
                  marginBottom: 5,
                  padding: 5
                }}
                key={value.id}
              >
                <View>
                  <Image
                    source={{ uri: value.image }}
                    style={{ height: 120, width: 120 }}
                    resizeMode="contain"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    marginLeft: 5,
                    marginRight: 2
                  }}
                >
                  {value.quantity == "0" && (
                    <Text
                      style={{
                        textAlignVertical: "center",
                        fontSize: 16,
                        color: "gray",
                        fontWeight: "bold"
                      }}
                    >
                      Out of stock
                    </Text>
                  )}
                  <Text
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      textAlignVertical: "center",
                      marginBottom: 2,
                      fontSize: 12,
                      color: "gray",
                      width: "100%"
                    }}
                  >
                    {value.description.toUpperCase()}
                  </Text>
                  {value.old_price != "" && (
                    <Text
                      style={{
                        textAlignVertical: "center",
                        textDecorationLine: "line-through",
                        fontSize: 12,
                        color: "gray"
                      }}
                    >
                      PKR {value.old_price}.00
                    </Text>
                  )}

                  <Text
                    style={{
                      textAlignVertical: "center",
                      fontSize: 12,
                      color: "gray",
                      fontWeight: "bold"
                    }}
                  >
                    PKR {value.selling_price}.00
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    );
  }
}

export default SearchBoxHome;
