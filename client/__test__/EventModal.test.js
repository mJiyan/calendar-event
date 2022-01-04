import React from 'react';
import EventModal from '../src/components/EventModal/EventModal';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { getMonth } from '../src/helpers/getMonth';
import initialState from './Mock/initialState';
import { QueryClientProvider, QueryClient } from 'react-query';
import * as EventQuery from '../src/redux/actions/Event/index';
import dayjs from 'dayjs';
import toJson from 'enzyme-to-json'; //added this line


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
})

// jest.mock("../src/redux/actions/Event/index");
// jest.spyOn(EventQuery, 'useDeleteEventData').mockResolvedValue(['mocked', 'foos']);


const mockStore = configureMockStore([thunk]);
const store = mockStore(initialState);

describe('rendering components', () => {
    const component = renderer.create(
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <EventModal />
            </Provider>
        </QueryClientProvider>,
    );

    const wrapperMount = mount(
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <EventModal />
            </Provider>
        </QueryClientProvider>,
    );

    test('it should match with the month component', () => {
        expect(component).toMatchSnapshot();
    });



    test('it should delete the event', () => {

        const deleteButton = wrapperMount.find(`[data-testid="delete-button"]`);
        deleteButton.simulate('click');

        const actions = store.getActions();
        const expectedPayload = [
            { type: 'MODAL/SET_MODAL', payload: false },
            { type: 'EVENT/SET_SELECTED_EVENT', payload: false }
        ]

        expect(actions).toEqual(expectedPayload);
    });

    test('it should close the event modal', () => {

        const closeButton = wrapperMount.find(`[data-testid="close-button"]`);
        closeButton.simulate('click');

        const actions = store.getActions();
        const expectedPayload = [
            { type: 'MODAL/SET_MODAL', payload: false },
            { type: 'EVENT/SET_SELECTED_EVENT', payload: false },
            { type: 'MODAL/SET_MODAL', payload: false },
            { type: 'EVENT/SET_SELECTED_EVENT', payload: false }
        ]


        expect(actions).toEqual(expectedPayload);
    });


    test('it should save the event', () => {

        const saveButton = wrapperMount.find(`[data-testid="save-button"]`);
        saveButton.simulate('click');

        const actions = store.getActions();
        const expectedPayload = [
            { type: 'MODAL/SET_MODAL', payload: false },
            { type: 'EVENT/SET_SELECTED_EVENT', payload: false },
            { type: 'MODAL/SET_MODAL', payload: false },
            { type: 'EVENT/SET_SELECTED_EVENT', payload: false },
            { type: 'MODAL/SET_MODAL', payload: false },
            { type: 'EVENT/SET_SELECTED_EVENT', payload: false }
        ]

        expect(actions).toEqual(expectedPayload);
    });

    test('it should save the event', () => {

        const saveButton = wrapperMount.find(`[data-testid="save-button"]`);
        saveButton.simulate('click');

        const actions = store.getActions();
        const expectedPayload = [
            { type: 'MODAL/SET_MODAL', payload: false },
            { type: 'EVENT/SET_SELECTED_EVENT', payload: false },
            { type: 'MODAL/SET_MODAL', payload: false },
            { type: 'EVENT/SET_SELECTED_EVENT', payload: false },
            { type: 'MODAL/SET_MODAL', payload: false },
            { type: 'EVENT/SET_SELECTED_EVENT', payload: false },
            { type: 'MODAL/SET_MODAL', payload: false },
            { type: 'EVENT/SET_SELECTED_EVENT', payload: false }
        ]
        expect(actions).toEqual(expectedPayload);
    });


    test('it should change the event title', () => {
        const titleInput = wrapperMount.find('[data-testid="title-input"]');
        titleInput.simulate('change', { target: { value: 'Meeting' } })
        expect(toJson(titleInput).props.value).toEqual('Meeting');
    });

    test('it should change the event description', () => {
        const descriptionInput = wrapperMount.find('[data-testid="description-input"]');
        descriptionInput.simulate('change', { target: { value: 'Meet with friends' } })
        expect(toJson(descriptionInput).props.value).toEqual('Meet with friends');
    });


    test('it should have tick after selected', () => {
        const colorButton = wrapperMount.find('[data-testid="color-button-1"]');

        colorButton.simulate('click');
        const colorButton2 = wrapperMount.find('[data-testid="color-button-1"]');
        expect(toJson(colorButton2).children.length).toEqual(1);
    });



});
