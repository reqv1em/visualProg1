const orderBy = require('./orderBy');

describe('Тестирование функции orderBy', () => {
  test('Корректная сортировка по ["name", "age"]', () => {
    const input = [
      { name: 'John', age: 30 },
      { name: 'Anna', age: 25 },
      { name: 'Anna', age: 20 },
      { name: 'Bob',  age: 40 }
    ];

    const result = orderBy(input, ['name', 'age']);

    expect(result).toEqual([
      { name: 'Anna', age: 20 },
      { name: 'Anna', age: 25 },
      { name: 'Bob',  age: 40 },
      { name: 'John', age: 30 }
    ]);

    expect(input).toEqual([
      { name: 'John', age: 30 },
      { name: 'Anna', age: 25 },
      { name: 'Anna', age: 20 },
      { name: 'Bob',  age: 40 }
    ]);
  });

  test('Бросает ошибку, когда элемент массива не объект', () => {
    expect(() => {
      orderBy(['строка вместо объекта'], ['name']);
    }).toThrow('Все элементы сортируемого массива должны быть объектами');
  });

  test('Бросает ошибку, когда отсутствует свойство для сортировки', () => {
    expect(() => {
      orderBy([{ name: 'Test' }, { name: 'Test2' }], ['name', 'age']);
    }).toThrow('Свойство "age" отсутствует в объекте');
  });

  test('Бросает ошибку, когда первый аргумент не является массивом', () => {
    expect(() => {
      orderBy({ name: 'obj' }, ['name']);
    }).toThrow('Первый аргумент должен быть массивом');
  });
});
