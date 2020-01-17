const RewardReceiveMessage = ({ context, user, message }) => ({
  token: context.botToken,
  channel: user,
  text: `You got :taco: from <@${message.user}> !`,
});


export { RewardReceiveMessage as default };
