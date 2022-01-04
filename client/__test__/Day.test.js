import React from 'react';
import Day from '../src/components/Day/Day';
import renderer from 'react-test-renderer';
import { mount, render, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import toJson from 'enzyme-to-json'; //added this line
import dayjs from 'dayjs';
import initialState from './Mock/initialState';


const mockStore = configureMockStore([thunk]);

const day = dayjs(1636531800000); // date -> 2021-11-10
const presentDay = dayjs(); // today
const rowDay = dayjs(1638392400000) // date -> 2021-12-02

const store = mockStore(initialState);

const wrapper = renderer.create(
  <Provider store={store}>
    <Day day={day} key={1} rowIndex={1} />
  </Provider>,
);


const wrapperMount = mount(
  <Provider store={store}>
    <Day day={day} key={1} rowIndex={1} />
  </Provider>,
);

const rowWrapperMount = mount(
  <Provider store={store}>
    <Day day={rowDay} key={1} rowIndex={0} />
  </Provider>,
);


const presentDayMount = mount(
  <Provider store={store}>
    <Day day={presentDay} key={0} rowIndex={0} />
  </Provider>,
);


describe('rendering components', () => {

  test('it should match with the month component', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  test('it should show the 10th day of month according to the date value', () => {
    const currentDayParagraph = wrapperMount.find('[data-testid="day-value-10-11-21"]');
    expect(toJson(currentDayParagraph).children[0]).toEqual('10');
  });

  test('it should show the row text value', () => {
    const rowText = rowWrapperMount.find(`[day-testid="row-value-02-12-21"]`);
    expect(rowText.length).toEqual(1);
  });


  test('it should show the present day in special style', () => {
    const currentDayParagraph = presentDayMount.find(`[data-testid="day-value-${presentDay.format('DD-MM-YY')}"]`);
    expect(toJson(currentDayParagraph).props.className).toEqual("text-sm p-1 my-1 text-center bg-blue-600 text-white rounded-full w-7");
  });


  test('it should execute dispatch properly for event reducer and day reducer', () => {

    const selectDay = wrapperMount.find(`[data-testid="select-day-${day.format('DD-MM-YY')}"]`);
    selectDay.simulate('click');


    const actions = store.getActions();
    const expectedPayload = [
      {
        type: 'DAY/SET_DAY_SELECTED',
        payload: dayjs("2021-11-10T08:10:00.000Z")
      },
      { type: 'MODAL/SET_MODAL', payload: true }
    ]

    expect(actions).toEqual(expectedPayload);
  });


  test('it should execute dispatch properly for event reducer', () => {

    const selectEvent = wrapperMount.find(`[data-testid="select-event-${day.format('DD-MM-YY')}"]`);
    selectEvent.simulate('click');


    const actions = store.getActions();
    const expectedPayload = [
      { "payload": dayjs("2021-11-10T08:10:00.000Z"), "type": "DAY/SET_DAY_SELECTED" },
      { "payload": true, "type": "MODAL/SET_MODAL" },
      {
        "payload": {
          "_id": "619f90f7abfdf7635dc91f43",
          "day": 1636531800000,
          "description": "Meet with friends",
          "id": "619f90f7abfdf7635dc91f43",
          "label": "purple",
          "title": "Meeting",
        }, "type": "EVENT/SET_SELECTED_EVENT",
      },
      { "payload": dayjs("2021-11-10T08:10:00.000Z"), "type": "DAY/SET_DAY_SELECTED" },
      { "payload": true, "type": "MODAL/SET_MODAL" },

    ]

    expect(actions).toEqual(expectedPayload);
  });




});
