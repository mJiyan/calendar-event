import dayjs from 'dayjs';

const initialState = {
  EventReducer: {
    events: [
      {
        _id: '619f90f7abfdf7635dc91f43',
        day: 1636531800000,
        description: 'Meet with friends',
        id: '619f90f7abfdf7635dc91f43',
        label: 'purple',
        title: 'Meeting',
      },
      {
        _id: '61cd677c3254c8001e8f0769',
        day: dayjs(),
        description: 'Buy new notebook',
        id: '61cd677c3254c8001e8f0769',
        label: 'blue',
        title: 'Notebook',
      },
    ],
    event: {},
    selectedEvent: {
      _id: "61cd8200bc6749001f5bf489",
      title: "Meeting",
      description: "Meet with friends",
      label: "purple",
      day: 1638392400000,
      __v: 0,
      id: "61cd8200bc6749001f5bf489"
    },
  },
  MonthReducer: {
    month: 1
  },
  DayReducer: {
    day: dayjs()
  },
  ModalReducer: {
    modal: false
  }
};


export default initialState;