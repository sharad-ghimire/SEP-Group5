## Mongoose


## EJS

## Passport

**http://www.passportjs.org/**

- Simple, unobtrusive authentication for Node.js
- Can be dropped into almost anny Express app
- Multiple authentication strategies
- Advantages
  - 300+ authentication strategies
  - Use ant database and ORMs
  - Easily handle success and failure
  - Supports persistent sessions
  - Lightweight code base
  - Easily integrate Bcrypt (encrpytion module for passwords)
- Authentication
  - Call `passport.authenticate()` along with which strategy to employ **Local strategy** in this case.
  - By default if auth fails, a 401 status will be returned
  - We can create additional handlers as well (eg. below).

```javascript
app.post('/login', passport.authenticate('local'), (req, res) => {
  //If the function gets called, authentication was succesful
  //'req.user' contains the authenticated user
  res.redirect('/user/' + req.user.username);
});

app.post('/login', passport.authenticate('local'), {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
});
```

### Strategies

- Used to authenticate requests
- Range from verifying user/pass to delegatd authentication using Oauth or federated auth using OpenID

```javascript
//Example of Local Strategy using Mongoose
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      //validPassword is our own function
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    });
  })
);
```

### Serialization

- Used to establish and maintain a session
- Each request will contain a unique cookie to identify the session
- Passport will serialize and deserialize user instances to and from the session.

```js
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
```
