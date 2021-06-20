import Moment from 'moment';

export function getAppointmentTime(date, time) {
  return `${Moment(date, 'DD/MM/YYYY')
    .utc(true)
    .locale('en')
    .format('dddd, DD MMMM YYYY')} · ${time}`;
}
