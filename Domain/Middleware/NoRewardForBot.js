const NoRewardForBot = ({ message, context, next }) => {
  if (message.text && !message.text.includes(context.botUserId)) {
    next();
  }
};

export { NoRewardForBot as default };
