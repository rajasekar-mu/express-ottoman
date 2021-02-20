var { ottomanConnection } = require('../database/dbConnection.js');

var UsersModel = ottomanConnection.model('Users', {
	tsid:String,
	name:{first:String,last:String},
	emp_id:String,
	email:String,
	role:String,
	is_disabled:Number,
	created_by:String,
	updated_on:Date,
	created_at:Date,
	jwt_token:String,
	claims:String
},{strict:false}
);

module.exports={UsersModel};