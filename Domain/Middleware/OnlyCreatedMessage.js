const OnlyCreatedMessage = ({ message, next }) => {
  if (!message.subtype || message.subtype !== 'message_deleted') {
    next();
  }
};

export { OnlyCreatedMessage as default };
