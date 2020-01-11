import connection from './mysql-connector';
import { today, tomorrow } from '../Domain/Utils/Time';

const RewardAPI = {
  loadGiverDaily: async (giver) => {
    const dateFrom = `${today()} 00:00:00`;
    const dateTo = `${tomorrow()} 00:00:00`;

    const result = await connection.promise().execute(
      'SELECT id, amount FROM reward WHERE giver = ? AND created >= ? AND created < ?',
      [giver, dateFrom, dateTo],
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
