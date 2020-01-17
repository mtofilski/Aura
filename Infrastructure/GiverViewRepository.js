import connection from './mysql-connector';
import { dailyRange, monthlyRange } from '../Domain/Utils/Time';
import GiverNotFoundException from './Exception/GiverNotFoundException';

const GiverViewAPI = {
  load: async (giver) => {
    const { start, end } = dailyRange();

    const result = await connection.promise().execute(
      'SELECT id, giver, amount FROM giver_view WHERE giver = ? AND created >= ? AND created < ?',
      [giver, start, end],
    );
    if (result[0].length === 0) {
      throw new GiverNotFoundException(giver);
    }
    return result[0][0];
  },

  loadDaily: async () => {
    const { start, end } = dailyRange();

    const result = await connection.promise().execute(
      'SELECT giver, SUM(amount) as amount FROM giver_view WHERE created >= ? AND created < ? GROUP BY giver ORDER BY amount DESC',
      [start, end],
    );
    return result[0];
  },

  loadMonthly: async () => {
    const { start, end } = monthlyRange();

    const result = await connection.promise().execute(
      'SELECT giver, SUM(amount) as  amount FROM giver_view WHERE created >= ? AND created < ? GROUP BY giver ORDER BY amount DESC',
      [start, end],
    );
    return result[0];
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
