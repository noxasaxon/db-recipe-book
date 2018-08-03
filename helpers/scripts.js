const db = require('../data/db');

module.exports = {
  getOne: (dbName, id) => {},
  getAll: dbName => {},
  checkIdExists: (dbName, id) => {},
  checkNameExists: (dbName, itemName) => {},
  isNumber: strToCheck => {
    return Number.isInteger(Number.parseInt(strToCheck));
  },
  insert: (dbName, item, res) => {
    db.insert(item)
      .into(dbName)
      .then(ids => {
        const id = ids[0];

        res.status(201).json({ id, ...item });
        console.log({ id, ...item });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};
