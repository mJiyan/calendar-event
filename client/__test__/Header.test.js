import React from 'react';
import Header from '../src/components/Header/Header';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const mockStore = configureMockStore([thunk]);
const initialState = {};
const store = mockStore(initialState);

describe('rendering components', () => {
  const component = shallow(
    <Provider store={store}>
      <Header />
    </Provider>,
  );
  test('it should match with the header component', () => {
    expect(component).toMatchSnapshot();
  });

  test('it should contain header', () => {
    const header = <h1 className="mr-10 text-xl text-gray-500 fond-bold">Soniq Calendar</h1>;
    expect(component.contains(header)).toEqual(true);
  });
});
