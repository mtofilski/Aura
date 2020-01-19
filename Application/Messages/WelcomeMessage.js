const WelcomeMessage = {
  welcome: {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Hi there :wave:',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Great to see you here! Look at the list of things you can do with this app:',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '• `@username [text] `:taco: to reward team members \n • `@Aura leaderboard` to see monthly and daily taco rank',
        },
      },
    ],
  },
};

export { WelcomeMessage as default };
