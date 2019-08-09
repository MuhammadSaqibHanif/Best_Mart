import React, { Component } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Input, Item, Card } from "native-base";

class ContactUs extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.state;

    // console.log("***", );

    return (
      <View style={{ marginTop: 22, flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <Text
            style={{
              marginTop: 20,
              fontSize: 20,
              fontWeight: "500",
              alignSelf: "center",
              marginBottom: 10
            }}
          >
            ABOUT US
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 10,
              marginBottom: 10
            }}
          >
            WHO WE ARE
          </Text>
          <Text
            style={{
              textAlign: "justify",
              color: "gray",
              marginLeft: 10,
              marginRight: 10
            }}
          >
            bestmart is the merger of two well-known brands “Bravisto Online
            Store and BMart”. bestmart offers a remarkable range of deals,
            promotions, and packages in different categories to the corporate
            sector and home consumers. We provide the highest-quality and
            valuable product range, leading brands, 24/7 professional dealing,
            feasible procedure, unbelievable discounts, delivery on time and
            different payment methods. Currently, we are operational in Karachi
            but soon we will expand in other cities, depends on the customer
            demands.
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 10,
              marginBottom: 10,
              marginTop: 15
            }}
          >
            OUR SERVICES
          </Text>
          <Text
            style={{
              textAlign: "justify",
              color: "gray",
              marginLeft: 10,
              marginRight: 10
            }}
          >
            For bestmart, customers are the first priority. bestmart is
            committed to provide the outstanding quality of products and satisfy
            customers. bestmart offers premium customer services and authentic
            fresh products range at affordable prices. Weekly and Monthly
            discounted deals make bestmart services more consumer friendly.
            bestmart consistently engaged in making its customer shop smartly!
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 10,
              marginBottom: 10,
              marginTop: 15
            }}
          >
            OUR SPECIALITIES
          </Text>
          <Text
            style={{
              textAlign: "justify",
              color: "gray",
              marginLeft: 10,
              marginRight: 10
            }}
          >
            Quality assurance, packages, and promotional deals, valuable product
            availability, fastest delivery at the doorstep and 24/7customer care
            are some of the specialties of bestmart. Additionally, bestmart is
            also leading to provide fresh meat, vegetables, and fruits. Be a
            part of bestmart and get a chance to avail a bundle of hygienic
            products in best rates.
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 10,
              marginBottom: 10,
              marginTop: 15
            }}
          >
            RETURN AND EXCHANGE POLICY
          </Text>
          <Text
            style={{
              textAlign: "justify",
              color: "gray",
              marginLeft: 10,
              marginRight: 10
            }}
          >
            1 ) If any sealed packed items and products have found defected, it
            can be exchanged within 3 days of delivery without additional
            charges
          </Text>
          <Text
            style={{
              textAlign: "justify",
              color: "gray",
              marginLeft: 10,
              marginRight: 10
            }}
          >
            2 ) We will not accept any return or exchange of products other than
            specified in placed order..
          </Text>
          <Text
            style={{
              textAlign: "justify",
              color: "gray",
              marginLeft: 10,
              marginRight: 10
            }}
          >
            3 ) Customers has to ensure the quality of goods supplied at the
            time of delivery, otherwise it will not be exchanged or return..
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 10,
              marginBottom: 10,
              marginTop: 15
            }}
          >
            ORDER CONFIRMATION
          </Text>
          <Text
            style={{
              textAlign: "justify",
              color: "gray",
              marginLeft: 10,
              marginRight: 10
            }}
          >
            1 ) During the business hours, our representative will confirm the
            order within 15 minutes of order received and after the
            confirmation, delivery process will begin.
          </Text>
          <Text
            style={{
              textAlign: "justify",
              color: "gray",
              marginLeft: 10,
              marginRight: 10
            }}
          >
            2 ) In case, if client wants to add some more items in cart after
            order confirmation, it will be considered as the new order placement
            with all the applicable rules.
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 10,
              marginBottom: 10,
              marginTop: 15
            }}
          >
            DELIVERY POLICY
          </Text>
          <Text
            style={{
              textAlign: "justify",
              color: "gray",
              marginLeft: 10,
              marginRight: 10
            }}
          >
            The operation hours for free-delivery has been divided into
            different slots such as:
          </Text>
          <Text
            style={{
              textAlign: "justify",
              color: "gray",
              marginLeft: 10,
              marginRight: 10
            }}
          >
            1 ) 10:00 am to 1:00 pm
          </Text>

          <Text
            style={{
              textAlign: "justify",
              color: "gray",
              marginLeft: 10,
              marginRight: 10
            }}
          >
            2 ) 1:00 pm to 3:00 pm
          </Text>
          <Text
            style={{
              textAlign: "justify",
              color: "gray",
              marginLeft: 10,
              marginRight: 10
            }}
          >
            3 ) 3:00 pm to 6:00 pm
          </Text>

          <Text
            style={{
              textAlign: "justify",
              color: "gray",
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10
            }}
          >
            If the order has been placed after the slot of 3:00 pm then customer
            will receive the order on the very next day in a first available
            slot. Customer can enjoy the free-delivery all over the Karachi and
            Hyderabad on the purchase of Rs.1500/-. Please note: Rs.150/- will
            be charged for delivery of below than Rs.1500/-
          </Text>
        </ScrollView>
      </View>
    );
  }
}

export default ContactUs;
