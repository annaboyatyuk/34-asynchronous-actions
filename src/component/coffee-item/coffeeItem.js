import React from 'react';
import { connect } from 'react-redux';
import {coffeeGetAll} from '../../action/coffeeActions';

import CoffeeForm from '../coffee-form/coffeeForm';


class CoffeeItem extends React.Component {

  state = {
    editing: false,
  }

  handleDouble = (id) => {
    this.setState({ editing: true, id })
  }

  updateCoffee = (coffee) => {
    this.setState({
      editing: false
    });
    this.props.onComplete(coffee);
  }

  componentDidMount = () => {
    this.props.coffeeGetAll();
  }


  render() {

      return (
        <React.Fragment>

          <ul>
            {this.props.coffee.map(coffeeItem => (
              <li id={coffeeItem._id} key={coffeeItem._id}>

                <h2>{coffeeItem.name}</h2>

                <p onDoubleClick={() => this.handleDouble(coffeeItem._id)} >{coffeeItem.roast}</p>

                <p onDoubleClick={() => this.handleDouble(coffeeItem._id)} >{coffeeItem.coffee} <span>(double click to edit)</span></p>

                <button onClick={() => this.props.destroy(coffeeItem)}>X</button>

                {this.state.id === coffeeItem._id ? <CoffeeForm  buttonText='UPDATE' onComplete={this.updateCoffee} coffeeItem={coffeeItem}/> : null}
              

              </li>
            ))}
          </ul>


        </React.Fragment>
      )
    }
  }


const mapStateToProps = state => ({
  coffee: state.coffeeState,
});

const mapDispatchToProps = dispatch => ({
  coffeeGetAll: () => dispatch(coffeeGetAll())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoffeeItem);
