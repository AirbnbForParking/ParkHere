var app = require('./../server-config.js');
var db = require('./database');
var Sequelize = require('sequelize');

// sequelize = new Sequelize('d480hpcc0j9jp0', 'vbanomqzrljvvv', 'Gs8_u4RIDhHNTmhk4zOBdsNrAc', {
//     host:     'ec2-54-227-254-13.compute-1.amazonaws.com',
//     port:     5432,
//     dialect: "postgres",
//     native: true
//   });

var sequelize = new Sequelize('airbnbparking', 'user', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  //schema: 'public'
 });

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });


module.exports = function() {
var User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  address: Sequelize.STRING,
  phone: Sequelize.INTEGER,
  username: Sequelize.STRING,
  password: Sequelize.STRING  
});


var Transaction = sequelize.define('transactions', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  transactionDate: Sequelize.DATE,
  occupiedStatus: {
    type: Sequelize.INTEGER,
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }  
  },
  paidStatus: Sequelize.BOOLEAN,
  length: Sequelize.STRING
 });


var Renter = sequelize.define('renters', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  address: Sequelize.STRING,
  phone: Sequelize.INTEGER,
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

var Listing = sequelize.define('listings', {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
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
});

var Message = sequelize.define('messages', {
  message: Sequelize.STRING,
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
});

User.hasOne(Transaction);
Transaction.belongsTo(User);

Listing.hasOne(Transaction);
Transaction.belongsTo(Listing, { foreignKey: 'id' });
// Renter.hasMany(Listing);
// Listing.belongsTo(Renter);
// User.hasMany(Message);
Renter.hasMany(Message);
// Message.belongsTo(User);
Message.belongsTo(Renter, { foreignKey: 'id'});

sequelize
  .sync({ force: true })
  .then(function(err) {
    console.log('It worked!');
  }, function (err) { 
    console.log('An error occurred while creating the table:', err);
  });
  return {User:User, Transaction:Transaction, Listing:Listing, Renter:Renter};//, Renter:Renter, Transaction:Transaction, Listing:Listing, Message:Message};
};