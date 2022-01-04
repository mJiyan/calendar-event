import React from 'react';
import Month from '../src/components/Month/Month';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { getMonth } from '../src/helpers/getMonth';
import renderer from 'react-test-renderer';
import initialState from './Mock/initialState';

const mockStore = configureMockStore([thunk]);
const store = mockStore(initialState);
const currentMonth = getMonth(1);

describe('rendering components', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Month month={currentMonth} />
    </Provider>,
  );

  test('it should match with the month component', () => {
    expect(component).toMatchSnapshot();
  });

});
