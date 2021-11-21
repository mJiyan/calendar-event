import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import * as dayActions from '../../redux/actions/Day';
import * as modalActions from '../../redux/actions/Modal';
import * as eventActions from '../../redux/actions/Event';

const Day = ({ day, rowIndex }) => {
  const [dayEvents, setDayEvents] = useState([]);

  const dispatch = useDispatch();
  const savedEvents = useSelector((state) => state.EventReducer.events);

  useEffect(() => {
    const events = savedEvents.filter(
      (evt) => dayjs(evt.day).format('DD-MM-YY') === day.format('DD-MM-YY'),
    );
    setDayEvents(events);
  }, [savedEvents, day]);

  const isItPresentDay = () =>
    day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-blue-600 text-white rounded-full w-7'
      : '';

  dayEvents.sort((a, b) => {
    const keyA = new Date(a.day);
    const keyB = new Date(b.day);
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIndex === 0 && <p className="text-sm p-1 mt-1">{day.format('ddd').toUpperCase()}</p>}
        <p className={`text-sm p-1 my-1 text-center ${isItPresentDay()}`}>{day.format('DD')}</p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          dispatch(dayActions.setDaySelected(day));
          dispatch(modalActions.setShowEventModal(true));
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => dispatch(eventActions.setSelectedEvent(evt))}
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;
