import connection from './mysql-connector';
import { today, tomorrow } from '../Domain/Utils/Time';
import GiverNotFoundException from './Exception/GiverNotFoundException';

const GiverViewAPI = {
  load: async (giver) => {
    const dateFrom = `${today()} 00:00:00`;
    const dateTo = `${tomorrow()} 00:00:00`;

    const result = await connection.promise().execute(
      'SELECT id, giver, amount FROM giver_view WHERE giver = ? AND created >= ? AND created < ?',
      [giver, dateFrom, dateTo],
    );
    if (result[0].length === 0) {
      throw new GiverNotFoundException(giver);
    }
    return result[0][0];
  },

  create: (giver, amount) => {
    connection.execute(
      'INSERT INTO giver_view (giver, amount) VALUES (?, ?)',
      [giver, amount],
    );
  },

  save: (giver, amount) => {
    connection.execute(
      'UPDATE giver_view SET amount = ? WHERE giver = ?',
      [amount, giver],
    );
  },
};
export { GiverViewAPI as default };
