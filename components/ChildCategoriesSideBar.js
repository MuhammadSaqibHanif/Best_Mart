import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { Card } from 'native-base';

class ChildCategoriesSideBar extends Component {

  render() {
    const { childData, getCategoriesId } = this.props;

    return (
      <View >
        {childData.map(val =>
          <TouchableOpacity
            key={val.id}
            onPress={
              () => getCategoriesId(val.id)
            }
          >
            <Card style={{ marginTop: -3 }}>
              <View style={{ flex: 1, marginLeft: 5, marginRight: 5, marginTop: 5 }}>
                <Image
                  style={{ width: '100%', height: 60 }}
                  source={{ uri: val.image }}
                  resizeMode="center"
                />
                <View style={{ flex: 1, justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
                  <Text
                    adjustsFontSizeToFit={true}
                    numberOfLines={2} ellipsizeMode='tail'
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      color: 'gray',
                    }}>
                    {val.name}
                  </Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default ChildCategoriesSideBar;

