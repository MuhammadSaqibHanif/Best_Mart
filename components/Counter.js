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
        // console.log('state from Counter', this.state)
        this.props.counterState(this.state.clicks, this.props.value.id, 'inc')
      }
    );


    //    switch (this.props.value.on_sale) {
    //   case 1:
    //   console.log("SALE NAE E");
    //   return this.setState({
    //     clicks: this.state.clicks + 1, 
    //     storeClicks:[this.state.clicks],
    //     total:Number(this.props.value.cost_price) * Number(this.state.clicks)
    //   })     
    //     break;

    //     case 0:
    //      // console.log("SALE HAI");
    //      return this.setState({
    //       clicks: this.state.clicks + 1, 
    //       storeClicks:this.state.storeClicks.push(this.state.clicks),
    //       total:Number(this.props.value.sale_price) * Number(this.state.clicks)
    //     })   
    //     break;


    // }
    // this.props.counterState(this.state.storeClicks,this.state.total)

    // console.log('IncrementItem', this.props.value)

    // this.props.value.on_sale == 1
    //   ?
    //   this.setState(prevState => ({
    //     total: Number(this.props.value.cost_price) * Number(prevState.clicks)
    //   }))
    //   :
    //   this.setState(prevState => ({
    //     total: Number(this.props.value.sale_price) * Number(prevState.clicks)
    //   }))

    // if (this.props.value.on_sale == 1) {
    //   let total = Number(this.state.clicks + 1) * Number(this.props.value.cost_price)
    //   // console.log('IncrementItem total', total)
    //   this.props.counterState(this.state.clicks + 1, total, Number(this.props.value.cost_price), 'increase', this.props.value.id, this.props.value.cost_price)
    // }
    // if (this.props.value.on_sale == 0) {
    //   let total = Number(this.state.clicks + 1) * Number(this.props.value.sale_price)
    //   // console.log('IncrementItem total', total)
    //   this.props.counterState(this.state.clicks + 1, total, Number(this.props.value.sale_price), 'increase', this.props.value.id, this.props.value.sale_price)
    // }

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
          // console.log('state from Counter', this.state)
          this.props.counterState(this.state.clicks, this.props.value.id, 'dec')
        }
      );


    // this.props.counterState(this.state.clicks - 1)

    // this.props.value.on_sale == 1
    //   ?
    //   this.state.clicks > 1 &&
    //   this.setState(prevState => ({
    //     total: Number(this.props.value.cost_price) * Number(prevState.clicks)
    //   }))
    //   :
    //   this.state.clicks > 1 &&
    //   this.setState(prevState => ({
    //     total: Number(this.props.value.sale_price) * Number(prevState.clicks)
    //   }))

    // if (this.props.value.on_sale == 1) {
    //   if (this.state.clicks > 1) {
    //     let total = Number(this.state.clicks - 1) * Number(this.props.value.cost_price)
    //     // console.log('DecreaseItem total', total)
    //     this.props.counterState(this.state.clicks - 1, total, Number(this.props.value.cost_price), 'decrease', this.props.value.id, this.props.value.cost_price)
    //   }
    // }
    // if (this.props.value.on_sale == 0) {
    //   if (this.state.clicks > 1) {
    //     console.log('DecreaseItem total', Number(this.state.clicks - 1) * Number(this.props.value.sale_price))
    //     let total = Number(this.state.clicks - 1) * Number(this.props.value.sale_price)
    //     // console.log('DecreaseItem total', total)
    //     this.props.counterState(this.state.clicks - 1, total, Number(this.props.value.sale_price), 'decrease', this.props.value.id, this.props.value.sale_price)
    //   }
    // }
  }

  // ToggleClick = () => {
  //   this.setState({ show: !this.state.show });
  // }

  render() {
    const { value } = this.props;
    const { clicks, total } = this.state;
    // console.log('clicks counter.js**********', clicks);
    // console.log('total counter.js**********', total);

    // console.log('this.props.user.total**************', this.props.user)


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

        {/* 
            <Button onPress={this.ToggleClick}>
              { this.state.show ? 'Hide number' : 'Show number' }
            </Button>
            { this.state.show ? <h2>{ this.state.clicks }</h2> : '' } */}
      </View>
    );
  }
}

const mapStateToProps = state => {
  // console.log('state.authReducers.user', state.authReducers.user)
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