var app = require('./../server-config.js');
var db = require('./database');
var Sequelize = require('sequelize');

// sequelize = new Sequelize('d480hpcc0j9jp0', 'vbanomqzrljvvv', 'Gs8_u4RIDhHNTmhk4zOBdsNrAc', {
//     host:     'ec2-54-227-254-13.compute-1.amazonaws.com',
//     port:     5432,
//     dialect: "postgres",
//     native: true
//   });

module.exports = function() {
var User = sequelize.define('users', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  address: Sequelize.STRING,
  phone: Sequelize.INTEGER,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  created_at: {
    type: Sequelize.DATE
  },
  updated_at: {
    type: Sequelize.DATE
  }
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
   created_at: {
    type: Sequelize.DATE
  },
  updated_at: {
    type: Sequelize.DATE
  },
  paidStatus: Sequelize.BOOLEAN,
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
  created_at: {
    type: Sequelize.DATE
  },
  updated_at: {
    type: Sequelize.DATE
  }
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
   created_at: {
    type: Sequelize.DATE
  },
  updated_at: {
    type: Sequelize.DATE
  }
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
  },
   created_at: {
    type: Sequelize.DATE
  },
  updated_at: {
    type: Sequelize.DATE
  }
});

User.hasOne(Transaction);
Transaction.belongsTo(User);

Listing.hasOne(Transaction);
Transaction.belongsTo(Listing);

Renter.hasMany(Listing);
Listing.belongsTo(Renter);
User.hasMany(Message);
Renter.hasMany(Message);
Message.belongsTo(User);
Message.belongsTo(Renter);

db.sync();
  return {User:User, Renter:Renter, Transaction:Transaction, Listing:Listing, Message:Message};
};