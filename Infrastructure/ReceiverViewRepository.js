import moment from 'moment';
import connection from './mysql-connector';
import { dailyRange, monthlyRange } from '../Domain/Utils/Time';
import ReceiverNotFoundException from './Exception/ReceiverNotFoundException';


const ReceiverViewAPI = {
  load: async (receiver) => {
    const { start, end } = dailyRange();

    const result = await connection.promise().execute(
      'SELECT id, receiver, amount FROM receiver_view WHERE receiver = ? AND created >= ? AND created < ?',
      [receiver, start, end],
    );
    if (result[0].length === 0) {
      throw new ReceiverNotFoundException(receiver);
    }
    return result[0][0];
  },

  loadDaily: async () => {
    const { start, end } = dailyRange();

    const result = await connection.promise().execute(
      'SELECT receiver, SUM(amount) as amount FROM receiver_view WHERE created >= ? AND created < ? GROUP BY receiver ORDER BY amount DESC',
      [start, end],
    );
    return result[0];
  },

  loadMonthly: async () => {
    const { start, end } = monthlyRange();

    const result = await connection.promise().execute(
      'SELECT receiver, SUM(amount) as amount FROM receiver_view WHERE created >= ? AND created < ? GROUP BY receiver ORDER BY amount DESC',
      [start, end],
    );
    return result[0];
  },

  create: (receiver, amount) => {
    connection.execute(
      'INSERT INTO receiver_view (receiver, amount) VALUES (?, ?)',
      [receiver, amount],
    );
  },

  save: (receiver, amount) => {
    connection.execute(
      'UPDATE receiver_view SET amount = ?, modified = ? WHERE receiver = ? AND created >= ? AND created < ?',
      [
        amount,
        moment().format('YYYY-MM-DD HH:mm:ss'),
        receiver,
        moment().format('YYYY-MM-DD 00:00:00'),
        moment().add(1, 'day').format('YYYY-MM-DD 00:00:00'),
      ],
    );
  },
};
export { ReceiverViewAPI as default };
