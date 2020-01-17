import { App } from '@slack/bolt';
import Logger from '../Infrastructure/Logger';
import { rewardUsers, getLeaderBoard } from '../Domain/Service/RewardService';
import LeaderBoardMessage from './Messages/LeaderboardMessage';
import RewardGivenMessage from './Messages/RewardGivenMessage';
import RewardReceiveMessage from './Messages/RewardReceiveMessage';
import LeaderboardDTO from '../Domain/DTO/LeaderboardDTO';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.message(':taco:', async ({ message, say, context }) => {
  let rewardsAmount = 0;
  const users = [];
  message.blocks.forEach((block) => {
    block.elements.forEach((element) => {
      element.elements.forEach((sectionElement) => {
        if (sectionElement.type === 'user') {
          users.push(sectionElement.user_id);
        }
        if (sectionElement.type === 'emoji' && sectionElement.name === 'taco') {
          rewardsAmount += 1;
        }
      });
    });
  });

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

app.command('/show-tacos', async ({
  say, ack, context, payload,
}) => {
  ack();

  getLeaderBoard().then(({ daily, monthly }) => {
    app.client.chat.postEphemeral(LeaderBoardMessage({
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

(async () => {
  await app.start(process.env.PORT || 3000);
})();

module.exports = app;
