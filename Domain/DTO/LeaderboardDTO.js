import { thisMonth } from '../Utils/Time';

const LeaderboardDTO = ({ daily, monthly }) => {
  const receiversMonthly = monthly.receivers.map((receiver, index) => `${index + 1}) <@${receiver.receiver}>: \`${receiver.amount}\``);
  const giversMonthly = monthly.givers.map((giver, index) => `${index + 1}) <@${giver.giver}>: \`${giver.amount}\``);

  const receiversDaily = daily.receivers.map((receiver, index) => `${index + 1}) <@${receiver.receiver}>: \`${receiver.amount}\``);
  const giversDaily = daily.givers.map((giver, index) => `${index + 1}) <@${giver.giver}>: \`${giver.amount}\``);

  const month = thisMonth();

  return {
    receiversMonthly, giversMonthly, receiversDaily, giversDaily, month,
  };
};

export { LeaderboardDTO as default };
