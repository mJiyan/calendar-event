import actionTypes from '../../actions/Modal/types';

const initialState = {
  modal: false,
};

const ModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MODAL:
      return { ...state, modal: action.payload };
    default:
      return state;
  }
};

export default ModalReducer;
