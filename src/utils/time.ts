export const addOneHour = (time: string) => {
  const [hours, minutes] = time.split(':');
  let newHours = parseInt(hours, 10) + 1;
  if (newHours >= 24) newHours = newHours - 24;
  return `${String(newHours).padStart(2, '0')}:${minutes}`;
};
