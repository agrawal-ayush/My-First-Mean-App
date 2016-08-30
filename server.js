var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/test');
var UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	email: String, 
	firstName: String,
	lastName: String,
	roles: [String]
});
var UserModel = mongoose.model("UserModel",UserSchema);
// var admin = new UserModel({username:"alice", password:"alice", firstName:"Alice",lastName:"Wonderland",
// 							roles: ["admin"]});
// admin.save();
// var student = new UserModel({username:"bob", password:"bob", 
// 							firstName:"Bob",lastName:"Marley",
// 							roles: ["student"]});
// student.save();


var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

passport.use(new LocalStrategy(
	function(username,password, done)
	{
		UserModel.findOne({username: username, password: password}, function(err,user){
			if(user){
				return done(null, user);
			}
			return done(null, false, {message: 'Unable to Login'});
			});
}));

passport.serializeUser(function(user,done){
	done(null,user);
});

passport.deserializeUser(function(user,done){
	done(null,user);
});

app.post("/login", passport.authenticate('local'), function(req,res){
	console.log("/login");
	console.log(req.user);
	res.json(req.user);
});



app.listen(3000);