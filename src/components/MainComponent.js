import React from "react";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";
import Footer from "./FooterComponent";
import { DISHES } from "../shared/dishes";
import { Route, Switch, Redirect } from "react-router-dom";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dishes: DISHES, selectedDishId: null };
  }

  onSelectDish(dishId) {
    this.setState({ selectedDishId: dishId });
  }

  render() {
    const HomeRoute = () => {
      return <Home />;
    };

    return (
      <div>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/home" component={HomeRoute} />
            <Route
              path="/menu"
              component={() => <Menu dishes={this.state.dishes} />}
            />
            <Redirect to="/home" />
          </Switch>
        </div>

        {/* 
            <Menu
              dishes={this.state.dishes}
              onClick={(dishId) => this.onSelectDish(dishId)}
            />
          <DishDetail
            dish={
              this.state.dishes.filter(
                (dish) => dish.id === this.state.selectedDishId
              )[0]
            }
          ></DishDetail>
        */}
        <Footer />
      </div>
    );
  }
}

export default Main;
