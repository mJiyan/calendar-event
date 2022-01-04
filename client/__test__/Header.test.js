import React from 'react';
import Header from '../src/components/Header/Header';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import dayjs from 'dayjs';

const mockStore = configureMockStore([thunk]);
const initialState = {
  MonthReducer: {
    month: 1,
  },
};
const store = mockStore(initialState);

describe('rendering components', () => {
  const component = mount(
    <Provider store={store}>
      <Header />
    </Provider>,
  );

  test('it should match with the header component', () => {
    expect(component).toMatchSnapshot();
  });

  test('it should contain header', () => {
    const header = (
      <h1 className="mr-10 text-xl text-gray-500 fond-bold" data-testid="header">
        Soniq Calendar
      </h1>
    );
    expect(component.contains(header)).toEqual(true);
  });


  test('it should show the date according to the month state value', () => {
    const currentDateHeader = (
      <h2 className="ml-4 text-xl text-gray-500 font-bold" data-testid="current-date">
        February 2022
      </h2>
    );
    expect(component.contains(currentDateHeader)).toEqual(true);
  });

  test('it should reset the month index', () => {

    const resetMonth = component.find(`[data-testid="reset-month"]`);
    resetMonth.simulate('click');


    const actions = store.getActions();
    const expectedPayload = [{ type: 'MONTH/SET_MONTH', payload: dayjs().month() }]


    expect(actions).toEqual(expectedPayload);
  });

  test('it should go to next month index', () => {
    const nextMonth = component.find(`[data-testid="next-month"]`);
    nextMonth.simulate('click');

    const actions = store.getActions();
    const expectedPayload = [{ type: 'MONTH/SET_MONTH', payload: dayjs().month() }, { type: 'MONTH/SET_MONTH', payload: 2 }]


    expect(actions).toEqual(expectedPayload);
  });

  test('it should go to previous month index', () => {
    let month = 11
    const prevMonth = component.find(`[data-testid="prev-month"]`);
    prevMonth.simulate('click');

    const actions = store.getActions();
    const expectedPayload = [{ type: 'MONTH/SET_MONTH', payload: dayjs().month() }, { type: 'MONTH/SET_MONTH', payload: 2 }, { type: 'MONTH/SET_MONTH', payload: 0 }]


    expect(actions).toEqual(expectedPayload);
  });

});
