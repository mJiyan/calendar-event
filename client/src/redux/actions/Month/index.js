import actionTypes from './types';

export const setMonthIndex = (month) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_MONTH,
    payload: month,
  });
};
