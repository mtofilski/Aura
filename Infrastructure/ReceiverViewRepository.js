import connection from './mysql-connector';
import { today, tomorrow } from '../Domain/Utils/Time';
import ReceiverNotFoundException from './Exception/ReceiverNotFoundException';


const ReceiverViewAPI = {
  load: async (receiver) => {
    const dateFrom = `${today()} 00:00:00`;
    const dateTo = `${tomorrow()} 00:00:00`;

    const result = await connection.promise().execute(
      'SELECT id, receiver, amount FROM receiver_view WHERE receiver = ? AND created >= ? AND created < ?',
      [receiver, dateFrom, dateTo],
    );
    if (result[0].length === 0) {
      throw new ReceiverNotFoundException(receiver);
    }
    return result[0][0];
  },

  create: (receiver, amount) => {
    connection.execute(
      'INSERT INTO receiver_view (receiver, amount) VALUES (?, ?)',
      [receiver, amount],
    );
  },

  save: (receiver, amount) => {
    connection.execute(
      'UPDATE receiver_view SET amount = ? WHERE receiver = ?',
      [amount, receiver],
    );
  },
};
export { ReceiverViewAPI as default };
