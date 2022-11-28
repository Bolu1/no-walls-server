"use strict";
const userResolver = require('./user');
const postResolver = require('./post');
const classResolver = require('./class');
const assignmentResolver = require('./assignment');
const rootResolver = Object.assign(Object.assign(Object.assign(Object.assign({}, userResolver), postResolver), classResolver), assignmentResolver);
module.exports = rootResolver;
