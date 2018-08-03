const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

const helpers = require('./helpers/scripts');
const isNumber = helpers.isNumber;
const dbInsert = helpers.insert;
const checkExists = helpers.checkExists;
const getDishes = helpers.getDishes;

// endpoints here
//sanity route
server.get('/', (req, res) => {
  res.send('up and running...');
});

/////// RECIPES /////////
//get
server.get('/recipes', (req, res) => {
  db('recipes')
    .then(recipes => {
      res.status(200).json(recipes);
    })
    .catch(err => res.status(500).json(err));
});

//post
server.post('/recipes', (req, res) => {
  const recipe = req.body;

  //check if recipe contains ref to dish (either actual dish id or just a name to create or find the dish)
  if (!recipe.dish_id) {
    //send an error back
    throw 'no dish id or name included. Every recipe must correspond to a dish';
  } else {
    console.log(recipe);
    const idObj = {};
    if (isNumber(recipe.dish_id)) {
      //dish id is a reference to dishDB id, dish should already exist
      idObj['id'] = recipe.dish_id;
      console.log('isInteger');
    } else {
      //dishId is not a number, it must be a name. search if exists, otherwise create it
      idObj['name'] = recipe.dish_id;
      console.log('isName');
    }
    checkExists('dishes', recipe.dish_id)
      .then(dish => {
        if (!dish) {
          //dish not found
          if (!isNumber(recipe.dish_id)) {
            //create dish using this string as its name
            dbInsert('dishes', { name: recipe.dish_id }).then(newDish => {
              //create recipe and ref this dish id
              const newRecipe = { name: recipe.name, dish_id: newDish.id };
              dbInsert('recipes', newRecipe)
                .then(insertedRecipe => {
                  res.status(201).json(insertedRecipe);
                })
                .catch(err => {
                  res.status(500).json(err);
                });
            });
          } else
            throw 'dish not found, dish_id needs to be a string if trying to create a new dish while creating a new recipe';
        } else {
          //dish was found, create dish
          const newRecipe = { name: recipe.name, dish_id: dish.id };
          dbInsert('recipes', newRecipe)
            .then(insertedRecipe => {
              res.status(201).json(insertedRecipe);
            })
            .catch(err => {
              res.status(500).json(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

//put
server.put('/recipes/:id', (req, res) => {
  const { id } = req.params;

  db('recipes')
    .where({ id })
    .then(count => {
      if (count) {
        // perform another query to get the modified record
        db('recipes')
          .select('name')
          .where({ id })
          .then(recipe => {
            res.status(200).json(recipe);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      } else {
        res.status(404).json({ message: 'The recipe was not found' });
      }
    })
    .catch(err => res.status(500).json(err));
});

//////// INGREDIENTS ////////
//get
server.get('/ingredients', (req, res) => {
  db('ingredients')
    .then(ingredients => {
      res.status(200).json(ingredients);
    })
    .catch(err => res.status(500).json(err));
});

//post
server.post('/ingredients', (req, res) => {
  const ingredient = req.body;

  db.insert(ingredient)
    .into('ingredients')
    .then(ids => {
      const id = ids[0];

      res.status(201).json(ids);
      // res.status(201).json({ id, ...ingredient });
    })
    .catch(err => res.status(500).json(err));
});

//put
server.put('/ingredients/:id', (req, res) => {
  const { id } = req.params;

  db('ingredients')
    .where({ id })
    .then(count => {
      if (count) {
        // perform another query to get the modified record
        db('ingredients')
          .select('name')
          .where({ id })
          .then(ingredient => {
            res.status(200).json(ingredient);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      } else {
        res.status(404).json({ message: 'The ingredient was not found' });
      }
    })
    .catch(err => res.status(500).json(err));
});

//////// DISHES ////////
//get
server.get('/dishes', (req, res) => {
  getDishes()
    .then(dishes => {
      console.log(dishes);
      res.status(200).json(dishes);
    })
    .catch(err => res.status(500).json(err));
});

//post
server.post('/dishes', (req, res) => {
  const dish = req.body;

  db.insert(dish)
    .into('dishes')
    .then(ids => {
      const id = ids[0];

      res.status(201).json(ids);
      // res.status(201).json({ id, ...dish });
    })
    .catch(err => res.status(500).json(err));
});

//put
server.put('/dishes/:id', (req, res) => {
  const { id } = req.params;

  db('dishes')
    .where({ id })
    .then(count => {
      if (count) {
        // perform another query to get the modified record
        db('dishes')
          .select('name')
          .where({ id })
          .then(dish => {
            res.status(200).json(dish);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      } else {
        res.status(404).json({ message: 'The dish was not found' });
      }
    })
    .catch(err => res.status(500).json(err));
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
