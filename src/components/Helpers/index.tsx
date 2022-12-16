export const getFormattedDates = (times: any): String => {
  const formattedDates = times.slice(0, 7).map((oneDate: string) => {
    const parts = oneDate.split('T', 2);
    const fullDates = parts[0];
    const dates = fullDates.split('-');
    const formattedDates = `${dates[2]}-${dates[1]}`;

    return formattedDates;
  });

  return formattedDates;
};

export const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

export const getDataFromCurrentDate = (
  dateString: string,
): string | undefined => {
  const isDate = dateFormatRegex.test(dateString);
  if (isDate) {
    const date = new Date(dateString);
    if (
      date.getFullYear() === new Date().getFullYear() &&
      date.getMonth() === new Date().getMonth() &&
      date.getDate() === new Date().getDate()
    ) {
      return dateString;
    }
  }
  return undefined;
};

export const getDates = (times: string[]): String[] => {
  const dates = times.map((oneDate: string) => {
    const parts = oneDate.split('T', 2);
    const date = parts[0];
    return date;
  });

  return dates;
};

export const getCurrentDayTimes = (dates: string[]): String[] => {
  const currentDayTimes = dates.filter((date: string) => {
    return getDataFromCurrentDate(date);
  });

  return currentDayTimes;
};

// TODO: Implement those functions in weather to display the correct data
// export const getCurrentStartAndEndHour = (times) => {
//  const currentDayStartHour: number = times.indexOf(
//     `${currentDayTimes[0]}T00:00`, // eslint-disable-line
// }

// export const currentDayEndHour = currentDayStartHour + 25;

export const getTimes = (times: string[]): string[] => {
  const currentTimes = times.splice(0, 24).map((oneDate: string) => {
    const parts = oneDate.split('T', 2);
    const times = parts[1];
    return times;
  });

  return currentTimes;
};

export const getMeasures = (measures: number[]): number[] => {
  const currentMeasures = measures.splice(0, 24).map((temp: number) => {
    return temp;
  });

  return currentMeasures;
};