const express = require('express');
const router = express.Router();

const IndexModel = require('../models/indexModel');

exports.home = (req, res) => {
    res.render('index', { 
        user: req.session.user || null 
    }); 
};