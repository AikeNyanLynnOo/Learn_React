import * as ActionTypes from "./ActionTypes";
import { fetch } from "cross-fetch";
import { DISHES } from "../../shared/dishes";
import { baseUrl } from "../../shared/baseUrl";

// Dishes
export const addComment = (dishId, rating, author, comment) => {
  return {
    type: ActionTypes.ADD_COMMENT,
    payload: {
      dishId: dishId,
      rating: rating,
      author: author,
      comment: comment,
    },
  };
};

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading());

  return fetch(baseUrl + "dishes")
    .then((response) => response.json())
    .then((dishes) => {
      dispatch(addDishes(dishes));
    });
};

export const dishesLoading = () => {
  return {
    type: ActionTypes.DISHES_LOADING,
  };
};

export const addDishes = (dishes) => {
  return {
    type: ActionTypes.ADD_DISHES,
    payload: dishes,
  };
};

export const dishesFailed = (errMessage) => {
  return {
    type: ActionTypes.DISHES_FAILED,
    payload: errMessage,
  };
};

// Comments
export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + "comments")
    .then((response) => response.json())
    .then((comments) => {
      dispatch(addComments(comments));
    });
};

export const addComments = (comments) => {
  return {
    type: ActionTypes.ADD_COMMENTS,
    payload: comments,
  };
};

export const commentsFailed = (errMessage) => {
  return {
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMessage,
  };
};

// Promotions
export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());

  return fetch(baseUrl + "promotions")
    .then((response) => response.json())
    .then((promos) => {
      dispatch(addPromos(promos));
    });
};

export const promosLoading = () => {
  return {
    type: ActionTypes.PROMOS_LOADING,
  };
};

export const addPromos = (promos) => {
  return {
    type: ActionTypes.ADD_PROMOS,
    payload: promos,
  };
};

export const promosFailed = (errMessage) => {
  return {
    type: ActionTypes.PROMOS_FAILED,
    payload: errMessage,
  };
};
