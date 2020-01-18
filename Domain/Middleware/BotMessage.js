const BotMessages = ({
  message, next, context, payload,
}) => {
  if (!message.text.includes(context.botUserId)) {
    return;
  }
  if (payload.channel_type !== 'im') {
    return;
  }
  next();
};

export { BotMessages as default };
