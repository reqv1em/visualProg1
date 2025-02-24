function orderBy(arr, props) {
  if (!Array.isArray(arr)) {
    throw new Error('Первый аргумент должен быть массивом');
  }

  for (const item of arr) {
    if (
      typeof item !== 'object' ||
      item === null ||
      Array.isArray(item)
    ) {
      throw new Error('Все элементы сортируемого массива должны быть объектами');
    }
  }

  for (const obj of arr) {
    for (const prop of props) {
      if (!(prop in obj)) {
        throw new Error(
          `Свойство "${prop}" отсутствует в объекте: ${JSON.stringify(obj)}`
        );
      }
    }
  }

  const newArr = [...arr];

  newArr.sort((a, b) => {
    for (const prop of props) {
      if (a[prop] < b[prop]) return -1;
      if (a[prop] > b[prop]) return 1;
    }
    return 0;
  });

  return newArr;
}

module.exports = orderBy;