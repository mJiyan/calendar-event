import actionTypes from './types';

export const setShowEventModal = (modal) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_MODAL,
    payload: modal,
  });
};
