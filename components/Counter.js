import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Button, Icon, Item, Input } from 'native-base';
import { connect } from 'react-redux';
import { updateUser } from '../Redux/actions/authActions';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 1,
      storeClicks: 0,
      show: true,
      total: 0
    };
  }

  IncrementItem = () => {

    this.props.location == 'ProductView' &&
      this.setState(prevState => ({
        clicks: prevState.clicks + 1
      }))

    this.props.location == 'Cart' &&
      this.setState(prevState => ({
        clicks: prevState.clicks + 1
      }))
    this.setState(
      { ready: "Yes" },
      () => {
        
        this.props.counterState(this.state.clicks, this.props.value.id, 'inc')
      }
    );
  }

  DecreaseItem = () => {
    this.state.clicks > 1 &&
      this.props.location == 'ProductView' &&
      this.setState(prevState => ({
        clicks: prevState.clicks - 1
      }))

    this.state.clicks > 1 &&
      this.props.location == 'Cart' &&
      this.setState(prevState => ({
        clicks: prevState.clicks - 1
      }))
      this.setState(
        { ready: "Yes" },
        () => {
         
          this.props.counterState(this.state.clicks, this.props.value.id, 'dec')
        }
      );
  }

  render() {
    const { value } = this.props;
    const { clicks, total } = this.state;
    
    return (
      <View
        style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 15, marginRight: 10, marginBottom: 5 }}
      >
        <TouchableOpacity>
          <Button small light
            onPress={this.IncrementItem}
            style={{ height: 20 }}
          >
            <Icon name='arrow-up' />
          </Button>
        </TouchableOpacity>
        <Text
          style={{ width: 50, height: 22, textAlign: 'center' }}
        >
          {clicks}
        </Text>
        <TouchableOpacity>
          <Button small light
            onPress={this.DecreaseItem}
            style={{ height: 20 }}
          >
            <Icon name='arrow-down' />
          </Button>
        </TouchableOpacity>

      </View>
    );
  }
}

const mapStateToProps = state => {
  
  return {
    user: state.authReducers.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter);