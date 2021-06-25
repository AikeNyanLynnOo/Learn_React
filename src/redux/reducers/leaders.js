import * as ActionTypes from "../actions/ActionTypes";

export const Leaders = (
  state = {
    isLoading: true,
    leaders: [],
    errMessage: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.LEADERS_LOADING:
      return { ...state, isLoading: true, leaders: [], errMessage: null };

    case ActionTypes.ADD_LEADERS:
      return {
        ...state,
        isLoading: false,
        leaders: action.payload,
        errMessage: null,
      };
    case ActionTypes.LEADERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMessage: null,
      };
    default:
      return state;
  }
};
