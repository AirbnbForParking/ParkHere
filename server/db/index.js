var app = require('./../server-config.js');
var Sequelize = require('sequelize');
var sequelize = require('./database');
var bcrypt   = require('bcrypt-nodejs'),
    Q        = require('q'),
    SALT_WORK_FACTOR  = 10;

/*
Database connection configuration for heroku. Refer to Local configuration for parameters.
*/
var sequelize = new Sequelize('dblrdt5bpjuuoo', 'ktpwgftmsyaivi', 'HdW64iUsOrICG4TNbYH_qU_Ml4', {
    host:     'ec2-75-101-162-243.compute-1.amazonaws.com',
    port:     5432,
    dialect: "postgres",
    native: true
  });
/*
Database connection configuration for Local host.
*/
// var sequelize = new Sequelize('database', 'user', 'password', {
//   host: 'localhost',
//   dialect: 'postgres',
//   port: 5432,
//   //schema: 'public'
//  });

/*
Establishes connection to database.
*/
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });


module.exports = function() {

/*
Schema.
*/

//################### USER SCHEMA #################################

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

User.methods.comparePasswords =  function(candidatePassword) {
  var defer = Q.defer();
  var savedPassword = this.password;
  bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(isMatch);
    }
  });
  return defer.promise;
};

//########################## Transaction ################################

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

//########################################## Renter #######################################

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

//################################## Listing #########################################

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
  }
});

//################################# Message ###########################################

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


/*
Set relationships between tables.
*/
User.hasOne(Transaction);
Transaction.belongsTo(User);

Listing.hasOne(Transaction);
Transaction.belongsTo(Listing, { foreignKey: 'id' });

Renter.hasMany(Message);
Message.belongsTo(Renter, { foreignKey: 'id'});

/*
Creates database structure.
*/
sequelize
  .sync({ force: true })
  .then(function(err) {
    console.log('It worked!');
  }, function (err) { 
    console.log('An error occurred while creating the table:', err);
  });

return {User:User, Transaction:Transaction, Listing:Listing, Renter:Renter};//, Renter:Renter, Transaction:Transaction, Listing:Listing, Message:Message};
};