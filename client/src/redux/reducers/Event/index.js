import actionTypes from '../../actions/Event/types';

const initialState = {
  event: {},
  selectedEvent: {},
  events: [],
};

const EventReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_EVENTS:
      return { ...state, events: action.payload };
    case actionTypes.SET_SELECTED_EVENT:
      return { ...state, selectedEvent: action.payload };
    default:
      return state;
  }
};

export default EventReducer;
