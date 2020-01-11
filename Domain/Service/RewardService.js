/* eslint-disable arrow-body-style */
import RewardAPI from '../../Infrastructure/RewardRepository';
import ReceiverViewAPI from '../../Infrastructure/ReceiverViewRepository';
import GiverViewAPI from '../../Infrastructure/GiverViewRepository';
import ReceiverNotFoundException from '../../Infrastructure/Exception/ReceiverNotFoundException';
import GiverNotFoundException from '../../Infrastructure/Exception/GiverNotFoundException';
import GivingLimitReachedException from '../../Infrastructure/Exception/GivingLimitReachedException';

const checkGivingLimit = async (giver, toGive, limit) => {
  try {
    const rewards = await RewardAPI.loadGiverDaily(giver);
    let expectedRewardsAmount = toGive;
    let actualRewardsAmount = 0;
    rewards.forEach((reward) => {
      expectedRewardsAmount += reward.amount;
      actualRewardsAmount += reward.amount;
    });

    if (expectedRewardsAmount > limit) {
      throw new GivingLimitReachedException(giver, limit, actualRewardsAmount);
    }
    return true;
  } catch (e) {
    if (e instanceof GiverNotFoundException) {
      return true;
    }
    throw e;
  }
};

const removeReceiverDuplicates = (giver, receivers) => {
  return receivers.filter(receiver => receiver !== giver);
};

const rewardUsers = async (giver, receivers, amount) => {
  const uniqueReceivers = removeReceiverDuplicates(giver, receivers);
  await checkGivingLimit(giver, uniqueReceivers.length * amount, 5);

  uniqueReceivers.forEach((receiver) => {
    RewardAPI.save(giver, receiver, amount);
  });

  try {
    const giverFromDB = await GiverViewAPI.load(giver);
    GiverViewAPI.save(giver, giverFromDB.amount + amount);
  } catch (e) {
    if (e instanceof GiverNotFoundException) {
      GiverViewAPI.create(giver, amount);
    } else {
      throw e;
    }
  }
  uniqueReceivers.forEach(async (receiver) => {
    try {
      const receiverFromDB = await ReceiverViewAPI.load(receiver);
      ReceiverViewAPI.save(receiver, receiverFromDB.amount + amount);
    } catch (e) {
      if (e instanceof ReceiverNotFoundException) {
        ReceiverViewAPI.create(receiver, amount);
      } else {
        throw e;
      }
    }
  });

  return uniqueReceivers;
};

export {
  rewardUsers as default,
};
