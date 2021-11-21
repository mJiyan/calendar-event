import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TimePicker from '@mui/lab/TimePicker';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import * as modalActions from '../../redux/actions/Modal';
import * as eventActions from '../../redux/actions/Event';
import * as dayActions from '../../redux/actions/Day';
import { useAddEventData, useDeleteEventData, useUpdateEventData } from '../../redux/actions/Event';

const labelsClasses = ['indigo', 'gray', 'green', 'blue', 'red', 'purple'];

const EventModal = () => {
  const selectedEvent = useSelector((state) => state.EventReducer.selectedEvent);
  const daySelected = useSelector((state) => state.DayReducer.day);
  const dispatch = useDispatch();

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
  const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : '');
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent ? labelsClasses.find((lbl) => lbl === selectedEvent.label) : labelsClasses[0],
  );
  const [time, setTime] = useState(
    Object.entries(selectedEvent).length !== 0 ? selectedEvent.day : daySelected,
  );

  const addMutation = useAddEventData();
  const updateMutation = useUpdateEventData();
  const removeMutation = useDeleteEventData();

  const handleSubmit = (e) => {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: Object.entries(selectedEvent).length !== 0 ? selectedEvent.id : undefined,
    };

    try {
      if (Object.entries(selectedEvent).length !== 0) {
        updateMutation.mutate(calendarEvent);
      } else {
        addMutation.mutate(calendarEvent);
      }
      dispatch(modalActions.setShowEventModal(false));
      dispatch(eventActions.setSelectedEvent(false));
    } catch (error) {
      console.error('ERROR: ', error);
    }
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">drag_handle</span>
          <div>
            {Object.entries(selectedEvent).length !== 0 && (
              <span
                onClick={() => {
                  removeMutation.mutate(selectedEvent.id);
                  dispatch(modalActions.setShowEventModal(false));
                  dispatch(eventActions.setSelectedEvent(false));
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button
              onClick={() => {
                dispatch(modalActions.setShowEventModal(false));
                dispatch(eventActions.setSelectedEvent(false));
              }}
            >
              <span className="material-icons-outlined text-gray-400">close</span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div> </div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              maxLength={30}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">calendar_today</span>
            <p>{daySelected.format('dddd, MMMM DD')}</p>
            <span className="material-icons-outlined text-gray-400">schedule</span>
            <p>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <TimePicker
                  value={time}
                  onChange={(times) => {
                    setTime(times);
                    dispatch(dayActions.setDaySelected(times));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </p>
            <span className="material-icons-outlined text-gray-400">segment</span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">bookmark_border</span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">check</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex jusify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
