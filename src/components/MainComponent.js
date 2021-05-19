import React from "react";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import Footer from "./FooterComponent";
import DishDetail from "./DishDetailComponent";

import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
  addComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
} from "../redux/actions/ActionCreators";

import { actions } from "react-redux-form";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (dishId, rating, author, comment) =>
      dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    resetFeedbackForm: () => dispatch(actions.reset("feedback")),
  };
};

class Main extends React.Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render() {
    const HomeRoute = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          isDishesLoading={this.props.dishes.isLoading}
          dishesErrMessage={this.props.dishes.errMessage}
          promotion={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          isPromosLoading={this.props.promotions.isLoading}
          promosErrMessage={this.props.promotions.errMessage}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };
    const DishWithId = ({ match, location, history }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          isDishLoading={this.props.dishes.isLoading}
          dishErrMessage={this.props.dishes.errMessage}
          comments={this.props.comments.comments.filter(
            (cmt) => cmt.dishId === parseInt(match.params.dishId)
          )}
          commentsErrMessage={this.props.comments.errMessage}
          addComment={this.props.addComment}
        />
      );
    };
    return (
      <div>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/home" component={HomeRoute} />
            <Route
              exact
              path="/menu"
              component={() => (
                <Menu
                  dishes={this.props.dishes.dishes}
                  isLoading={this.props.dishes.isLoading}
                  errMessage={this.props.dishes.errMessage}
                />
              )}
            />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route
              exact
              path="/contactus"
              component={() => (
                <Contact resetFeedbackForm={this.props.resetFeedbackForm} />
              )}
            />
            <Route
              exact
              path="/aboutus"
              component={() => <About leaders={this.props.leaders} />}
            />
            <Redirect to="/home" />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
