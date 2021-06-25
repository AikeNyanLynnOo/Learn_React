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
  postComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
  postFeedback,
} from "../redux/actions/ActionCreators";

import { actions } from "react-redux-form";
import { TransitionGroup, CSSTransition } from "react-transition-group";

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
    postComment: (dishId, rating, author, comment) =>
      dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    postFeedback: (
      firstname,
      lastname,
      email,
      telnum,
      agree,
      contactType,
      message
    ) =>
      dispatch(
        postFeedback(
          firstname,
          lastname,
          email,
          telnum,
          agree,
          contactType,
          message
        )
      ),
    resetFeedbackForm: () => dispatch(actions.reset("feedback")),
  };
};

class Main extends React.Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
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
          leader={
            this.props.leaders.leaders.filter((leader) => leader.featured)[0]
          }
          isLeadersLoading={this.props.leaders.isLoading}
          leadersErrMessage={this.props.leaders.errMessage}
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
          postComment={this.props.postComment}
        />
      );
    };
    return (
      <div>
        <Header />
        <div className="container">
          <TransitionGroup>
            <CSSTransition
              key={this.props.location.key}
              classNames="example"
              timeout={300}
            >
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
                    <Contact
                      resetFeedbackForm={this.props.resetFeedbackForm}
                      postFeedback={this.props.postFeedback}
                    />
                  )}
                />
                <Route
                  exact
                  path="/aboutus"
                  component={() => (
                    <About
                      leaders={this.props.leaders.leaders}
                      isLoading={this.props.leaders.isLoading}
                      errMessage={this.props.leaders.errMessage}
                    />
                  )}
                />
                <Redirect to="/home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
