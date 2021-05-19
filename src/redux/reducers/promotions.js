import * as ActionTypes from "../actions/ActionTypes";

export const Promotions = (
  state = {
    isLoading: true,
    errMessage: null,
    promotions: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.PROMOS_LOADING:
      return { ...state, isLoading: true, errMessage: null, promotions: [] };
    case ActionTypes.ADD_PROMOS:
      return {
        ...state,
        isLoading: false,
        errMessage: null,
        promotions: action.payload,
      };
    case ActionTypes.PROMOS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMessage: action.payload,
      };
    default:
      return state;
  }
};
