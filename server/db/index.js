var pg = require('pg');
var Sequelize = require('sequelize');

sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
    
    dialect: "postgres",
    protocol: 'postgres',
    port:     match[4],
    host:     match[3],
    logging: true
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

var Listing = sequelize.define('listings', {
  listingAddress: Sequelize.STRING,
  description: Sequelize.STRING,
  status: Sequelize.BOOLEAN,
  duration: Sequelize.INTEGER,
  renterid:  {
    type: Sequelize.INTEGER,
    references: {
      model: Renter,
      key: 'id'
    }  
  },
  statusid:  {
    type: Sequelize.BOOLEAN,
    references: {
      model: Transaction,
      key: 'occupiedStatus'
    }  
  },
});

var Message = sequelize.define('messages', {
  message: Sequelize.STRING,
  userid: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  renterid: {
    type: Sequelize.INTEGER,
    references: {
      model:Renter,
      key: 'id'
    }
  }
});

