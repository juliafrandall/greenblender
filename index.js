// yourModule.createLabels(customersArray, directoryPath);
const customersArray = require('./lib/data/customers.js');
const onTracHelpers = require('./lib/OnTracHelpers.js');
const fs = require('fs');
const request = require('request');
const createLabels = require('./JuliasModule').createLabels
const retrieveArray = require('./JuliasModule').retrieveArray

createLabels(customersArray, './PDFs/', retrieveArray)
