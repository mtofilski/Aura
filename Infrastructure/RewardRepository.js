import connection from './mysql-connector';
import { dailyRange } from '../Domain/Utils/Time';

const RewardAPI = {
  loadGiverDaily: async (giver) => {
    const { start, end } = dailyRange();

    const result = await connection.promise().execute(
      'SELECT id, amount FROM reward WHERE giver = ? AND created >= ? AND created < ?',
      [giver, start, end],
    );
    return result[0];
  },

  save: (giver, receiver, amount) => {
    connection.execute(
      'INSERT INTO reward (giver, receiver, amount) VALUES (?,?,?)',
      [giver, receiver, amount],
    );
  },
};
export { RewardAPI as default };
