import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMonth } from '../../helpers/getMonth';
import Month from '../../components/Month/Month';
import Header from '../../components/Header/Header';
import EventModal from '../../components/EventModal/EventModal';
import { useEventsData } from '../../redux/actions/Event';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  const monthIndex = useSelector((state) => state.MonthReducer.month);
  const showEventModal = useSelector((state) => state.ModalReducer.modal);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  useEventsData();

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      <div className="h-screen flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Month month={currentMonth} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Calendar;
