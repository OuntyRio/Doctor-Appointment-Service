const { v4: uuid4 } = require('uuid');

module.exports = {
  async up(db) {
    await db.collection('users').insertMany([
      {_id: uuid4(), name: 'Крокодил', phone: '81231231123'},
      {_id: uuid4(), name: 'Гиппопотам', phone: '82342342234'},
      {_id: uuid4(), name: 'Акула', phone: '83453453345'},
     ]);
     await db.collection('doctors').insertMany([
      {_id: uuid4(), name: 'Айболит', spec: 'педиатр', slots: [
        new Date('7/20/2022 8:00:00 AM UTC+3'),
        new Date('7/20/2022 9:00:00 AM UTC+3'),
        new Date('7/20/2022 10:00:00 AM UTC+3'),
        new Date('7/20/2022 11:00:00 AM UTC+3'),
        new Date('7/20/2022 1:00:00 PM UTC+3'),
        new Date('7/20/2022 2:00:00 PM UTC+3)')
      ]},
      {_id: uuid4(), name: 'Гиппократ', spec: 'терапевт', slots: [
        new Date('7/18/2022 8:00:00 AM UTC+3'),
        new Date('7/18/2022 9:00:00 AM UTC+3'),
        new Date('7/18/2022 10:00:00 AM UTC+3'),
        new Date('7/18/2022 11:00:00 AM UTC+3'),
        new Date('7/18/2022 1:00:00 PM UTC+3'),
        new Date('7/18/2022 2:00:00 PM UTC+3')
      ]},
      {_id: uuid4(), name: 'Фрейд', spec: 'психолог', slots: [
        new Date('7/21/2022 8:00:00 AM UTC+3'),
        new Date('7/21/2022 9:00:00 AM UTC+3'),
        new Date('7/21/2022 10:00:00 AM UTC+3'),
        new Date('7/21/2022 11:00:00 AM UTC+3'),
        new Date('7/21/2022 1:00:00 PM UTC+3'),
        new Date('7/21/2022 2:00:00 PM UTC+3')
      ]},
     ])},

  async down(db) {
   await db.collection('users').deleteMany({});
   await db.collection('doctors').deleteMany({});
  }
};
