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

export const getDate = (date: any): Date => {
  const parts = date.split('T', 2);
  const currentDate: Date = parts[0];

  return currentDate;
};

export const getCurrentDayTimes = (dates: string[]): String[] => {
  const currentDayTimes = dates.filter((date: string) => {
    return getDataFromCurrentDate(date);
  });

  return currentDayTimes;
};

export const getTimes = (times: string[]): string[] => {
  const currentTimes = times.slice(0, 24).map((oneDate: string) => {
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

export const getTodaysSunSet = (sunset: string[]): string => {
  const times = getTimes(sunset);

  return times[0];
};

export const getTodaysSunRise = (sunset: string[]): string => {
  const times = getTimes(sunset);

  return times[0];
};

export const getTodaysMaxTemp = (maxTemps: number[]): number => {
  return maxTemps[0];
};

export const getTodaysMinTemp = (minTemps: number[]): number => {
  return minTemps[0];
};
