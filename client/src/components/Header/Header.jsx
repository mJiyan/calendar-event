import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import * as actions from '../../redux/actions/Month';

const Header = () => {
  const monthIndex = useSelector((state) => state.MonthReducer.month);
  const dispatch = useDispatch();

  const handlePrevMonth = () => {
    dispatch(actions.setMonthIndex(monthIndex - 1));
  };
  const handleNextMonth = () => {
    dispatch(actions.setMonthIndex(monthIndex + 1));
  };
  const handleReset = () => {
    dispatch(actions.setMonthIndex(dayjs().month()));
  };

  return (
    <header className="px-4 py-2 flex items-center">
      <h1 className="mr-10 text-xl text-gray-500 fond-bold" data-testid="header">
        Soniq Calendar
      </h1>
      <button onClick={handleReset} className="border rounded py-2 px-4 mr-5" data-testid="reset-month">
        Today
      </button>
      <button onClick={handlePrevMonth} data-testid="prev-month">
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_left
        </span>
      </button>
      <button onClick={handleNextMonth} data-testid="next-month">
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_right
        </span>
      </button>
      <h2 className="ml-4 text-xl text-gray-500 font-bold" data-testid="current-date">
        {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
      </h2>
    </header>
  );
};

export default Header;
