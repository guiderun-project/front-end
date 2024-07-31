export const addOneHour = (time: string) => {
  const [hours, minutes] = time.split(':');
  let newHours = parseInt(hours, 10) + 1;
  if (newHours >= 24) newHours = newHours - 24;
  return `${String(newHours).padStart(2, '0')}:${minutes}`;
};

export const getFullKoreanDate = (date: Date) => {
  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ];

  return `${year}년 ${month}월 ${day}일`;
};

export const getKoreanHourMonth = (time: string) => {
  const [hour, minute] = time.split(':').map((t) => Number(t));

  return `${hour.toString().padStart(2, '0')}시 ${minute
    .toString()
    .padStart(2, '0')}분`;
};

export const getPeriod = (startTime: string, endTime: string) => {
  return `${getKoreanHourMonth(startTime)} ~ ${getKoreanHourMonth(endTime)}`;
};
