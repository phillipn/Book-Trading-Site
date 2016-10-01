var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.changePassword = function(req, res){
  if(!req.body.password || !req.body.newPassword || !req.body.email) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }
  
  passport.authenticate('local', function(err, user, info){
    if (err) {
      sendJSONresponse(res, 404, err);
      return;
    }

    if(user){
      user.setPassword(req.body.newPassword);
      
      user.save(function(err) {
        if (err) {
          sendJSONresponse(res, 404, err);
        } else {
          sendJSONresponse(res, 200, 'Password changed');
        }
      });
    } else {
      sendJSONresponse(res, 401, info);
    }
  })(req, res);
}

module.exports.changeLocation = function(req, res) {
  if(!req.body.city || !req.body.state || !req.body.email) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }
  User.findOne({email: req.body.email}).exec(function(err, user) {
    if (!user) {
      sendJSONresponse(res, 404, {
        "message": "user not found"
      });
      return;
    } else if (err) {
      console.log(err);
      sendJSONresponse(res, 404, err);
      return;
    }

    user.city = req.body.city;
    user.state = req.body.state;
    user.save(function(err, success){
      if(err){
        sendJSONresponse(res, 404, err)
      } else {
        sendJSONresponse(res, 200, 'success');
      }
    })
  });
}

module.exports.register = function(req, res) {
  if(!req.body.name || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;
  user.city = req.body.city;
  user.state = req.body.state;
  user.requests = [];

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    if (err) {
      sendJSONresponse(res, 404, err);
    } else {
      token = user.generateJwt();
      sendJSONresponse(res, 200, {
        "token" : token
      });
    }
  });

};

module.exports.login = function(req, res) {
  if(!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  passport.authenticate('local', function(err, user, info){
    var token;

    if (err) {
      sendJSONresponse(res, 404, err);
      return;
    }

    if(user){
      console.log(user);
      token = user.generateJwt();
      sendJSONresponse(res, 200, {
        "token" : token
      });
    } else {
      sendJSONresponse(res, 401, info);
    }
  })(req, res);

};