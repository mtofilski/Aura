const NoBotMessages = ({ message, next }) => {
  if (!message.subtype || message.subtype !== 'bot_message') {
    next();
  }
};

export { NoBotMessages as default };
