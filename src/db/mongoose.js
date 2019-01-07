/**
 * Import 
 * source: config files
 * dtart
 */
var {PORT} = require('../config/config');
var {MONGODB_URI} = require('../config/config');
 /**
 * Import 
 * source: config files
 * end
 */

var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

module.exports = { mongoose };

// db.close();