import actionTypes from '../../actions/Day/types';

const initialState = {
  day: {},
};

const DayReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DAY_SELECTED:
      return { ...state, day: action.payload };
    default:
      return state;
  }
};

export default DayReducer;
