import dayjs from 'dayjs';
import { MONTHS_SHORT } from "./constants";

export const formatStringDate = (dateAsString: string | null) => {
  if (!dateAsString) return "";
  const dateAsJs: dayjs.Dayjs = dayjs(dateAsString, "YYYY-MM-DDTHH:mm:ss.SSSZ"); // 2004-10-19T08:23:54.000Z
  const dateNow = dayjs();
  const diff = {
    minutes: dateNow.diff(dateAsJs, 'minutes'),
    hours: dateNow.diff(dateAsJs, 'hours'),
    days: dateNow.diff(dateAsJs, 'days'),
    years: dateNow.diff(dateAsJs, 'years')
  }

  console.log('diff', diff)

  if ( diff.hours <= 1) {
    return `${diff.minutes} minutes ago`;
  } else if ( diff.days <= 1) {
    return `${diff.hours} hours ago`;
  } else if ( diff.days < 7) {
    return `${diff.days} days ago`;
  } else if (dateAsJs.get('year') === dateNow.get('year')) {
    return `${dateAsJs.format("DD")} ${MONTHS_SHORT[dateAsJs.get("M")]}`
  } else {
    return `${dateAsJs.format("DD")} ${MONTHS_SHORT[dateAsJs.get("M")]} ${dateAsJs.format("yyyy")}`
  }
};
