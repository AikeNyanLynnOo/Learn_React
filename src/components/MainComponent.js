import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";
import { DISHES } from "../shared/dishes";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dishes: DISHES, selectedDishId: null };
  }

  onSelectDish(dishId) {
    this.setState({ selectedDishId: dishId });
  }

  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Hungry Boy - Cake and Bakery</NavbarBrand>
          </div>
        </Navbar>
        <div className="container">
          <div className="row">
            <Menu
              dishes={this.state.dishes}
              onClick={(dishId) => this.onSelectDish(dishId)}
            />
          </div>
          <DishDetail dish={this.state.dishes.filter(dish=> dish.id === this.state.selectedDishId)[0]}></DishDetail>
        </div>
      </div>
    );
  }
}

export default Main;
