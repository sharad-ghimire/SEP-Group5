const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const config = require('../config/config');

//Setting up global middlewares
module.exports = (app) => {


  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());

  app.use(cookieParser());

  app.use(session({
    secret: 'reallydoesntmatter'
  }));

  require('../config/passport')(app);
  
  //Express Validator -- From githib documentation [error formatter]
  app.use(
    expressValidator({
      errorFormatter: (param, msg, value) => {
        var namespace = param.split('.'),
          root = namespace.shift(),
          formParam = root;

        while (namespace.length) {
          formParam += '[' + namespace.shift() + ']';
        }
        return {
          param: formParam,
          msg: msg,
          value: value
        };
      }
    })
  );
}