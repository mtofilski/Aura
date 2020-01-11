class GivingLimitReachedException {
  constructor(id, limit, currentAmount) {
    this.message = `<@${id}> has only ${limit} tacos to give, already gave ${currentAmount} :pepe_sad:`;
  }
}
export {
  GivingLimitReachedException as default,
};
