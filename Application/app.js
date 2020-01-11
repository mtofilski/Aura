import { App } from '@slack/bolt';
import rewardUsers from '../Domain/Service/RewardService';

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});


// Listens to incoming messages that contain "hello"
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
    await app.client.chat.postMessage({
      token: context.botToken,
      channel: message.user,
      text: `Thanks <@${message.user}> for giving :taco: to ${usersAsString.join(', ')} !`,
    });

    response.forEach(async (user) => {
      await app.client.chat.postMessage({
        token: context.botToken,
        channel: user,
        text: `You got :taco: from <@${message.user}> !`,
      });
    });
  }).catch(async (error) => {
    say(error.message || error);
  });
});

(async () => {
  await app.start(process.env.PORT || 3000);
})();

module.exports = app;
