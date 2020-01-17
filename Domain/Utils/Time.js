import moment from 'moment';

const dailyRange = () => ({
  start: moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
  end: moment().add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
});

const monthlyRange = () => ({
  start: moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
  end: moment().add(1, 'month').startOf('month').format('YYYY-MM-DD HH:mm:ss'),
});

const thisMonth = () => moment().format('MMMM');

export {
  dailyRange,
  monthlyRange,
  thisMonth,
};
