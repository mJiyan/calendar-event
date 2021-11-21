import dayjs from 'dayjs';
import actionTypes from '../../actions/Month/types';

const initialState = {
  month: dayjs().month(),
};

const MonthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MONTH:
      return { ...state, month: action.payload };
    default:
      return state;
  }
};

export default MonthReducer;
