import React from "react";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { Image, View } from "react-native";

import Home from "./screen/Home";
import SignInUp from "./screen/SignInUp";
import AccountInformation from "./AccountPageOption/AccountInformation";
import MyOrders from "./AccountPageOption/MyOrders";

import Categories from "./screen/Categories";

import Cart from "./screen/Cart";
import ChildCategories from "./screen/ChildCategories";
import SubChildCategories from "./screen/SubChildCategories";
import ProductView from "./screen/ProductView";
import Checkout from "./screen/Checkout";

import CustomerSupport from "./screen/CustomerSupport";

const tabBarOptions = {
  style: {
    backgroundColor: "red"
  },
  activeTintColor: "white",
  inactiveTintColor: "white"
};

const HomeStack = createStackNavigator({
  Home: Home,
  AccountInformation: AccountInformation,
  MyOrders: MyOrders
});

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  // if (navigation.state.index != 0) {
  //   tabBarVisible = true;
  // }

  return {
    tabBarVisible,
    tabBarLabel: " ",
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("./images/home.png")}
        style={{ width: 25, height: 25, marginTop: 10, tintColor: "white" }}
      />
    ),
    tabBarOptions
  };
};

const CategoriesStack = createStackNavigator({
  Categories: Categories,
  ChildCategories: ChildCategories,
  SubChildCategories: SubChildCategories,
  ProductView: ProductView
});

CategoriesStack.navigationOptions = {
  tabBarLabel: " ",
  tabBarIcon: ({ tintColor }) => (
    <Image
      source={require("./images/notepad.png")}
      style={{ width: 25, height: 25, marginTop: 10, tintColor: "white" }}
    />
  ),
  tabBarOptions
};

const CartStack = createStackNavigator({
  Cart: Cart,
  Checkout: Checkout,
  SignInUp: SignInUp
});

CartStack.navigationOptions = {
  tabBarLabel: " ",
  tabBarIcon: ({ tintColor }) => (
    <View>
      <Image
        source={require("./images/receipt.png")}
        style={{ width: 25, height: 25, marginTop: 10, tintColor: "white" }}
      />
    </View>
  ),
  tabBarOptions
};

const CustomerStack = createStackNavigator({
  CustomerSupport
});

CustomerStack.navigationOptions = {
  tabBarLabel: " ",
  tabBarIcon: ({ tintColor }) => (
    <Image
      source={require("./images/support.png")}
      style={{ width: 25, height: 25, marginTop: 10, tintColor: "white" }}
    />
  ),
  tabBarOptions
};

// Create Bottom Tab Navigator
const bottomNavigator = createBottomTabNavigator({
  HomeStack,
  CategoriesStack,
  CartStack,
  CustomerStack
});

const AppNavigator = createSwitchNavigator({
  bottomNavigator: {
    screen: bottomNavigator
  }
});

export default createAppContainer(AppNavigator);
