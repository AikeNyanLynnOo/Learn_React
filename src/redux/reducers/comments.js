import * as ActionTypes from "../actions/ActionTypes";

export const Comments = (
  state = {
    errMessage: null,
    comments: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {
        ...state,
        isLoading: false,
        errMessage: null,
        comments: action.payload,
      };
    case ActionTypes.COMMENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMessage: action.payload,
      };

    case ActionTypes.ADD_COMMENT:
      var comment = action.payload;
      comment.id = state.comments.length;
      comment.date = new Date().toISOString();
      console.log("Comment is " + comment);
      return { ...state, comments: state.comments.concat(comment) };
    default:
      return state;
  }
};
