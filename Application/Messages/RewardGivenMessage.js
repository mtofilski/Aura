const RewardGivenMessage = ({
  context, message, usersAsString,
}) => ({
  token: context.botToken,
  channel: message.user,
  text: `Thanks <@${message.user}> for giving :taco: to ${usersAsString.join(', ')} !`,
});


export { RewardGivenMessage as default };
