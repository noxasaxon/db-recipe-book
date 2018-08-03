const db = require('../data/db');

module.exports = {
  getOne: (dbName, id) => {},
  getAll: dbName => {
    return new Promise((resolve, reject) => {
      db(dbName)
        .then(items => {
          resolve(items);
        })
        .catch(err => reject(err));
    });
  },

  isNumber: strToCheck => {
    return Number.isInteger(Number.parseInt(strToCheck));
  },
  checkExists: (dbName, nameOrId) => {
    return new Promise((resolve, reject) => {
      const item = {};
      if (module.exports.isNumber(nameOrId)) item.id = nameOrId;
      else item.name = nameOrId;

      //look for item
      db(dbName)
        .where(item)
        .then(count => {
          let retItem = {};
          if (!count[0]) {
            //item does not exist
            console.log('item not found');
            retItem = false;
          } else {
            console.log({ itemFound: { ...count[0] } });
            retItem = { ...count[0] }; // { id: 1, name: 'Burger' }
          }
          resolve(retItem);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },

  dbInsert: (dbName, item) => {
    return new Promise((resolve, reject) => {
      db.insert(item)
        .into(dbName)
        .then(ids => {
          const id = ids[0];
          console.log({ itemCreated: { id, ...item } });
          resolve({ id, ...item });
        })
        .catch(err => {
          console.log(err);
          reject(err);
          // res.status(500).json(err);
        });
    });
  },
  getDishes: () => {
    return module.exports.getAll('dishes');
  },
  addDish: dish => {
    return module.exports.dbInsert('dishes', dish).then(newDish => {
      return newDish.id;
    });
  }
};
