const express=require('express');
const {handlegenerateNewShortURL}= require('../controller/url')
const { post } = require('server/router');
const router=express.Router();
router.post("/", handlegenerateNewShortURL);
module.exports=router