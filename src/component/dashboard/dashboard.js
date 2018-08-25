import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import CoffeeForm from '../coffee-form/coffeeForm';
import CoffeeItem from '../coffee-item/coffeeItem';

import './dashboard.css';

import {coffeeCreate, coffeeUpdate, coffeeDestroy} from '../../action/coffeeActions';


class Dashboard extends Component {

  render() {
    return (
      <Fragment>

        <h3>COFFEE</h3>
        <p>enter coffee</p>


        <CoffeeForm onComplete={this.props.coffeeCreate} buttonText='SUBMIT'/>

        <CoffeeItem onComplete={this.props.coffeeUpdate} destroy={this.props.coffeeDestroy}/>

      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  coffee: state.coffeeState,
});

const mapDispatchToProps = dispatch => ({
  coffeeCreate: coffee => dispatch(coffeeCreate(coffee)),
  coffeeUpdate: coffee => dispatch(coffeeUpdate(coffee)),
  coffeeDestroy: coffee => dispatch(coffeeDestroy(coffee)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

