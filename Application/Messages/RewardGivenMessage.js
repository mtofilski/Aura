const RewardGivenMessage = ({
  context, message, usersAsString,
}) => ({
  token: context.botToken,
  channel: message.user,
  text: `Thanks <@${message.user}> for giving :taco: to ${usersAsString.join(', ')}, you're awesome !`,
});


export { RewardGivenMessage as default };
