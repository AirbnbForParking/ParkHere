var pg = require('pg');

var Sequelize = require('sequelize')
  , sequelize = new Sequelize('airbnbforparking', 'boshika', 'knowthyself', {
      dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
      port:    5432, // or 5432 (for postgres)
    });

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });

  var User = sequelize.define('users', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    address: Sequelize.STRING,
    phone: Sequelize.INTEGER,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    
});

var Transaction = sequelize.define('transactions', {
  transactionDate: Sequelize.DATE,
  occupiedStatus: Sequelize.BOOLEAN,
  userid: {
    type: Sequelize.STRING,
    references: {
      model: User,
      key: 'id'
    }  
  },
  listingid: {
    type: Sequelize.INTEGER,
    references: {
      model: Listing,
      key: 'id'
    }
  },
  paidStatus: Sequlize.BOOLEAN,
  length: Sequelize.STRING,
 });
 
  var Renter = sequelize.define('renters', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    address: Sequelize.STRING,
    phone: Sequelize.INTEGER,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
  });

