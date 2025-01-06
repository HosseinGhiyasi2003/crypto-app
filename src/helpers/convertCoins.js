const convertCoins = (data, type) => {
  const convertedData = data[type].map((coin) => {
    return {
      date: coin[0],
      [type]: coin[1],
    };
  });
  return convertedData;
};

export {convertCoins}
