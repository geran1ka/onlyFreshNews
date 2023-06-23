export const getCounter = () => {
  let count = 0;
  const counterNext = () => ++count;
  const counterBack = () => --count;
  counterNext.reset = () => count = 0;
  counterBack.reset = () => count = 0;
  return {counterNext, counterBack};
};

