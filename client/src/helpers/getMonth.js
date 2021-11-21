import dayjs from 'dayjs';

export function getMonth(month = dayjs().month()) {
  const year = dayjs().year();

  const firstDayInMonth = dayjs(new Date(year, month, 0)).day();

  let presentMonth = 0 - firstDayInMonth;
  /** 5 week 7 day */
  const days2DArray = new Array(5).fill([]).map(() =>
    new Array(7).fill(null).map(() => {
      presentMonth++;
      return dayjs(new Date(year, month, presentMonth));
    }),
  );

  return days2DArray;
}
