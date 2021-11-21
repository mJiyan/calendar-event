import React from 'react';
import { Calendar } from '../src/views';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const mockStore = configureMockStore([thunk]);
const initialState = {};
const store = mockStore(initialState);

describe('rendering components', () => {
  test('it should match with the calendar component', () => {
    const component = shallow(
      <Provider store={store}>
        <Calendar />
      </Provider>,
    );
    expect(component).toMatchSnapshot();
  });
});
