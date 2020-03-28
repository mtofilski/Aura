const divider = {
  type: 'divider',
};

const monthlyLeaderboard = ({ receiversMonthly, giversMonthly, month }) => ({
  type: 'section',
  fields: [
    {
      type: 'mrkdwn',
      text: `TOP :taco: receivers of ${month}:`,
    },
    {
      type: 'mrkdwn',
      text: `TOP :taco: givers of ${month}:`,
    },
    {
      type: 'mrkdwn',
      text: receiversMonthly.length === 0 ? 'Nobody receive taco this month :(' : receiversMonthly.join('\n'),
    },
    {
      type: 'mrkdwn',
      text: giversMonthly.length === 0 ? 'Nobody give taco this month :(' : giversMonthly.join('\n'),
    },
  ],
});

const dailyLeaderboard = ({ receiversDaily, giversDaily }) => ({
  type: 'section',
  fields: [
    {
      type: 'mrkdwn',
      text: 'TOP :taco: receivers today:',
    },
    {
      type: 'mrkdwn',
      text: 'TOP :taco: givers today:',
    },
    {
      type: 'mrkdwn',
      text: receiversDaily.length === 0 ? 'Nobody receive taco today :(' : receiversDaily.join('\n'),
    },
    {
      type: 'mrkdwn',
      text: giversDaily.length === 0 ? 'Nobody give taco today :(' : giversDaily.join('\n'),
    },
  ],
});


const LeaderboardMessage = ({
  context, payload, month, receiversMonthly, giversMonthly, receiversDaily, giversDaily,
}) => ({
  token: context.botToken,
  channel: payload.channel,
  user: payload.user,
  blocks: [
    monthlyLeaderboard({ receiversMonthly, giversMonthly, month }),
    divider,
    dailyLeaderboard({ receiversDaily, giversDaily }),
    divider,
  ],
});

const LeaderboardCronMessage = ({
    token, channel, month, receiversMonthly, giversMonthly, receiversDaily, giversDaily,
  }) => ({
  token: token,
  channel: channel,
  text: 'Taco weekly !',
  blocks: [
    monthlyLeaderboard({ receiversMonthly, giversMonthly, month }),
    divider,
    dailyLeaderboard({ receiversDaily, giversDaily }),
    divider,
  ],
});


export {
  LeaderboardMessage as default,
  LeaderboardCronMessage
};
