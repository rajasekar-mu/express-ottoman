var {model,Schema } = require('ottoman');
var { ottomanConnection } = require('../database/dbConnection.js');

var DepartmentModel = ottomanConnection.model('Departments', {
	name:String,	
    status:Number,
    sequence:Number,
    seq_status: Number,
    change_status : Number,
    created_at: Date,
    updated_at: Date,
    updated_by: {type:String,ref:'Users'}
},{strict:false});

module.exports={DepartmentModel};