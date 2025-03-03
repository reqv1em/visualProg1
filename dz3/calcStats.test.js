async function _loadDataReal() {
  return [];

function _calcStatsReal(catsInfo) {
  const stats = {};
  for (const cat of catsInfo) {
    if (!stats[cat.country]) {
      stats[cat.country] = 0;
    }
    stats[cat.country]++;
  }
  return stats;
}

async function _calcStatsFromAPIReal() {
  const cats = await module.exports.loadData();
  return module.exports.calcStats(cats);
}

module.exports.loadData = _loadDataReal;
module.exports.calcStats = _calcStatsReal;
module.exports.calcStatsFromAPI = _calcStatsFromAPIReal;

test("calcStatsFromAPI вызывает loadData один раз и даёт правильный результат (mockData с реальными породами)", async () => {
  const mockData = [
    {
      breed: "Abyssinian",
      country: "Ethiopia",
      origin: "Natural/Standard",
      coat: "Short",
      pattern: "Ticked",
    },
    {
      breed: "Aegean",
      country: "Greece",
      origin: "Natural",
      coat: "Semi-long",
      pattern: "Bicolor",
    },
  ];

  const loadDataSpy = jest
    .spyOn(module.exports, "loadData")
    .mockResolvedValue(mockData);

  const result = await module.exports.calcStatsFromAPI();
  expect(loadDataSpy).toHaveBeenCalledTimes(1);

  const expected = {
    Ethiopia: 1,
    Greece: 1,
  };

  expect(result).toEqual(expected);
  loadDataSpy.mockRestore();
});
}