import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import actionTypes from './types';
import apiCall from '../../../services/api';
import { HTTP } from '../../../services/constants';

export const useEventsData = () => {
  const dispatch = useDispatch();

  return useQuery(
    'events',
    async () => {
      const { data } = await apiCall('/events', null, null, HTTP.GET, null, true);
      return data;
    },
    {
      onSuccess: (data) => {
        dispatch({
          type: actionTypes.GET_EVENTS,
          payload: data,
        });
      },
      onError: (error) => {
        throw Error(error);
      },
    },
  );
};

export const useAddEventData = () => {
  const useClient = useQueryClient();
  const mutation = useMutation(
    async (event) => {
      return await apiCall('/events', event, null, HTTP.POST, null, true);
    },
    {
      onSuccess: () => {
        useClient.invalidateQueries('events');
      },
    },
  );

  return mutation;
};

export const useUpdateEventData = () => {
  const useClient = useQueryClient();
  const mutation = useMutation(
    async (event) => {
      return await apiCall(`/event/${event.id}`, event, null, HTTP.PUT, null, true);
    },
    {
      onSuccess: () => {
        useClient.invalidateQueries('events');
      },
    },
  );

  return mutation;
};

export const useDeleteEventData = () => {
  const useClient = useQueryClient();
  const mutation = useMutation(
    async (id) => {
      return await apiCall(`/event/${id}`, null, null, HTTP.DELETE, null, true);
    },
    {
      onSuccess: () => {
        useClient.invalidateQueries('events');
      },
    },
  );

  return mutation;
};

export const setSelectedEvent = (event) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_SELECTED_EVENT,
    payload: event,
  });
};
