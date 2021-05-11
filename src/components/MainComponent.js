import React from "react";
import Header from "./HeaderComponent";
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";
import Footer from "./FooterComponent";
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
        <Header />
        <div className="container">
          <div className="row">
            <Menu
              dishes={this.state.dishes}
              onClick={(dishId) => this.onSelectDish(dishId)}
            />
          </div>
          <DishDetail
            dish={
              this.state.dishes.filter(
                (dish) => dish.id === this.state.selectedDishId
              )[0]
            }
          ></DishDetail>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;
