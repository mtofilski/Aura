class GivingLimitReachedException {
  constructor(id, limit, currentAmount) {
    this.message = `<@${id}> has only ${limit} tacos to give, already gave ${currentAmount} :scream:`;
  }
}
export {
  GivingLimitReachedException as default,
};
