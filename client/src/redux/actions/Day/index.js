import actionTypes from './types';

export const setDaySelected = (day) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_DAY_SELECTED,
    payload: day,
  });
};
