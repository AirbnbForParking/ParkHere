var bodyParser = require('body-parser');

module.exports = function (app, express) {
  var UserRouter = express.Router();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use('/api/login', userRouter); // for all login requests

  // inject our routers into their respective route files
  require('../users/userRoutes.js')(userRouter);
};