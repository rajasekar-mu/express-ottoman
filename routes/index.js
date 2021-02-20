var express = require('express');
var router = express.Router();
var { model } = require('ottoman');
var { DepartmentModel } = require('../model/department.js');
const config = require('config');
const pagination_config = config.get('paginationConfig');
const PAGE_SIZE = pagination_config.department;

/* GET home page. */
router.get('/', async (req, res, next) => {
  
	let skip = 0;
	  if(req.query.page && req.query.page>1){
		skip = (req.query.page - 1) * PAGE_SIZE;
	  }
	  let DeptList = await DepartmentModel.find({$or:[{status:1},{status:0}]},{skip:skip,limit:PAGE_SIZE,select:'id,name,status,change_status',sort:{created_at:'DESC'}});
	  res.json({ status:200,data:DeptList.rows});
});

router.get('/add', async (req, res, next) => {
        let dept_info = {	name: 'Help',
                          status:1,
                          change_status:0,                         
                          sequence:0,
                          created_at: new Date()};
                         // console.log(dept_info);
        const department = await DepartmentModel.create(dept_info);
        res.json({ status:200,message:'Department has been added successfully'});
});

module.exports = router;
