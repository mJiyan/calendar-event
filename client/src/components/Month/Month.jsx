import React from 'react';
import Day from '../Day/Day';

const Month = ({ month }) => (
  <div className="flex-1 grid grid-cols-7 grid-rows-5">
    {month.map((row, rowIndex) => (
      <React.Fragment key={rowIndex}>
        {row.map((day, dayIndex) => (
          <Day day={day} key={dayIndex} rowIndex={rowIndex} />
        ))}
      </React.Fragment>
    ))}
  </div>
);

export default Month;
