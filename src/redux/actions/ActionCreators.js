import * as ActionTypes from "./ActionTypes";
import { fetch } from "cross-fetch";
import { baseUrl } from "../../shared/baseUrl";

// Dishes
export const addComment = (comment) => {
  return {
    type: ActionTypes.ADD_COMMENT,
    payload: comment,
  };
};

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  var newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment,
  };

  newComment.date = new Date().toISOString();
  return fetch(baseUrl + "comments", {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error" + response.status + ":" + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var err = new Error(error.message);
        throw err;
      }
    )
    .then((response) => response.json())
    .then((comment) => {
      dispatch(addComment(comment));
    })
    .catch((error) => {
      console.log("Your comment could not be posted\n" + error.message);
    });
};

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading());

  return fetch(baseUrl + "dishes")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error" + response.status + ":" + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var err = new Error(error.message);
        throw err;
      }
    )
    .then((response) => response.json())
    .then((dishes) => {
      dispatch(addDishes(dishes));
    })
    .catch((error) => {
      dispatch(dishesFailed(error.message));
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
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error" + response.status + ":" + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var err = new Error(error.message);
        throw err;
      }
    )
    .then((response) => response.json())
    .then((comments) => {
      dispatch(addComments(comments));
    })
    .catch((error) => {
      dispatch(commentsFailed(error.message));
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
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error" + response.status + ":" + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var err = new Error(error.message);
        throw err;
      }
    )
    .then((response) => response.json())
    .then((promos) => {
      dispatch(addPromos(promos));
    })
    .catch((error) => {
      dispatch(promosFailed(error.message));
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

// Leaders

export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading());

  return fetch(baseUrl + "leaders")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var err = new Error("Error " + response.status + response.statusText);
          err.response = response;
          throw err;
        }
      },
      (error) => {
        var err = new Error(error.message);
        throw err;
      }
    )
    .then((response) => response.json())
    .then((leaders) => {
      dispatch(addLeaders(leaders));
    })
    .catch((err) => {
      dispatch(leadersFailed(err.message));
    });
};

export const leadersLoading = () => {
  return {
    type: ActionTypes.LEADERS_LOADING,
  };
};

export const addLeaders = (leaders) => {
  return {
    type: ActionTypes.ADD_LEADERS,
    payload: leaders,
  };
};

export const leadersFailed = (errMessage) => {
  return {
    type: ActionTypes.LEADERS_FAILED,
    payload: errMessage,
  };
};

// Feedback

export const postFeedback = (
  firstname,
  lastname,
  email,
  telnum,
  agree,
  contactType,
  message
) => (dispatch) => {
  var feedback = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    telnum: telnum,
    agree: agree,
    contactType: contactType,
    message: message,
    date: new Date().toISOString(),
  };
  console.log("ur feedback is " + feedback);

  return fetch(baseUrl + "feedback", {
    method: "POST",
    body: JSON.stringify(feedback),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var err = new Error("Error " + response.status + response.statusText);
          err.response = response;
          throw err;
        }
      },
      (error) => {
        var err = new Error(error.message);
        throw err;
      }
    )
    .then((response) => response.json())
    .then((feedback) => {
      alert("Your feedback is received" + JSON.stringify(feedback));
    })
    .catch((err) => {
      alert("You may not be able to give feedback right now ! " + err.message);
    });
};
