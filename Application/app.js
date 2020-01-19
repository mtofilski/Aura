import { App, LogLevel } from '@slack/bolt';
import Logger from '../Infrastructure/Logger';
import { rewardUsers, getLeaderBoard } from '../Domain/Service/RewardService';
import LeaderboardMessage from './Messages/LeaderboardMessage';
import RewardGivenMessage from './Messages/RewardGivenMessage';
import RewardReceiveMessage from './Messages/RewardReceiveMessage';
import WelcomeMessage from './Messages/WelcomeMessage';
import LeaderboardDTO from '../Domain/DTO/LeaderboardDTO';
import UserRewardDTO from '../Domain/DTO/UserRewardDTO';
import NoBotMessage from '../Domain/Middleware/NoBotMessage';
import NoRewardForBot from '../Domain/Middleware/NoRewardForBot';
import BotMessage from '../Domain/Middleware/BotMessage';
import OnlyCreatedMessage from '../Domain/Middleware/OnlyCreatedMessage';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: process.env.NODE_ENV !== 'production' ? LogLevel.DEBUG : LogLevel.ERROR,
});

app.event('app_home_opened', async ({
  context, event, say,
}) => {
  const history = await app.client.im.history({
    token: context.botToken,
    channel: event.channel,
    count: 1,
  });

  if (!history.messages.length) {
    say(WelcomeMessage.welcome);
  }
});

app.message(OnlyCreatedMessage, NoBotMessage, NoRewardForBot, ':taco:', async ({ message, say, context }) => {
  const { users, rewardsAmount } = UserRewardDTO(message);
  const rewardResponse = rewardUsers(message.user, users, rewardsAmount);
  rewardResponse.then(async (response) => {
    if (response && response.length === 0) {
      return;
    }
    const usersAsString = response.map((user) => `<@${user}>`);
    await app.client.chat.postMessage(RewardGivenMessage({ context, message, usersAsString }));

    response.forEach(async (user) => {
      await app.client.chat.postMessage(RewardReceiveMessage({ user, message, context }));
    });
  }).catch(async (error) => {
    say(error.message || error);
  });
});

app.message(OnlyCreatedMessage, BotMessage, 'leaderboard', async ({
  payload, say, context,
}) => {
  getLeaderBoard().then(({ daily, monthly }) => {
    app.client.chat.postMessage(LeaderboardMessage({
      ...LeaderboardDTO({ daily, monthly }),
      context,
      payload,
    })).catch(error => {
      Logger.error(error, [{ context, payload }]);
      say('sorka! coś nie pykło.');
    });
  }).catch(error => {
    Logger.error(error, [{ context, payload }]);
    say('sorka! coś nie pykło.');
  });
});

app.message(OnlyCreatedMessage, BotMessage, 'help', async ({ say }) => {
  say(WelcomeMessage.welcome);
});


(async () => {
  await app.start(process.env.PORT || 3000);
})();

module.exports = app;
