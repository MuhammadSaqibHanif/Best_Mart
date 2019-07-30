import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Card, CardItem } from 'native-base';

class ProductCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      image: "",
      id: "",
      data: [],
    }
  }

  componentWillMount() {   

    // fetch('https://digitalcodeeye.com/isales/api/get/products-by-category/2')
    fetch('https://digitalcodeeye.com/ethlon/api/get-products-by-category/9')
      .then(res => res.json())
      .then(res =>
        this.setState({
          data: res
        })
      )
      .catch((error) => {
        console.error(error);
      })
  }

  navigateFunc = (id) => {
    // console.log('navigateFunc id', id)

    // const { data } = this.state;
    // data.map(response => {
    //   if (response.id == id) {
    //     // console.log('val', val)
    //     this.props.navigate("ProductView", { response })
    //     // return val
    //   }
    //   // console.log('val', val)
    //   //  return val.id[id]
    // })

    // console.log('datas', datas)

    // fetch(`https://digitalcodeeye.com/isales/api/get/product-details/${id}`)

    fetch(`https://digitalcodeeye.com/ethlon/api/get-product-details/${id}`)
      .then(response => response.json())
      .then(response =>
        this.props.navigate("ProductView", { response })
        // this.props.navigation.navigate("ProductView", { response })
      )
      .catch((error) => {
        console.error(error);
      })


  }

  render() {
    const { Heading } = this.props;
    const { data } = this.state;
    console.log('Pproduct Card render', this.props)

    return (
      <View style={{ flexDirection: "column" }}>
        <View >
          <Text style={{ fontSize: 20, color: 'gray', marginTop: 10, marginLeft: 10 }}>{Heading}</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row' }}>
            {data.map((val, ind) => {
              return (
                <Card key={val.id} style={{ height: 220, width: 140, marginLeft: 5 }}>
                  <CardItem >
                    <Image source={{ uri: val.image }} style={{ width: "100%", height: 120 }} />
                  </CardItem>
                  <CardItem style={{ flexDirection: 'column' }}>
                    <TouchableOpacity
                      onPress={() => this.navigateFunc(val.id)}
                    >
                      <Text
                        style={{ textAlign: 'center' }}
                      >
                        {val.name}
                      </Text>
                    </TouchableOpacity>
                  </CardItem>
                </Card>
              )
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ProductCard;