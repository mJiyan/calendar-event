import actionTypes from './types';

export const setMonthIndex = (month) => async (dispatch) => {
  console.log('MONTH: ', month);
  dispatch({
    type: actionTypes.SET_MONTH,
    payload: month,
  });
};
