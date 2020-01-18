const UserRewardDTO = (message) => {
  let rewardsAmount = 0;
  const users = [];
  message.blocks.forEach((block) => {
    block.elements.forEach((element) => {
      element.elements.forEach((sectionElement) => {
        if (sectionElement.type === 'user') {
          users.push(sectionElement.user_id);
        }
        if (sectionElement.type === 'emoji' && sectionElement.name === 'taco') {
          rewardsAmount += 1;
        }
      });
    });
  });

  return { rewardsAmount, users };
};

export { UserRewardDTO as default };
