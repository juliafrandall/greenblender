const customersArray = require('./lib/data/customers.js');
const onTracHelpers = require('./lib/OnTracHelpers.js');
const fs = require('fs');
const request = require('request');

//function to create file from base64 encoded string
let base64_decode = function(base64str, file) {
  //create buffer object from base64 encoded string, it is important to tell the constructor
  //that the string is base64 encoded
  var pdf = new Buffer(base64str, 'base64');
  //write buffer to file
  fs.writeFileSync(file, pdf);
    console.log('++++++++++++ File created from base64 encoded string ++++++++++++')
}

let retrieveArray = function(error, arrayOfPDFs) {
  if(error){console.log('error')}
  else {
    arrayOfPDFs.sort()
    console.log(arrayOfPDFs)}
}

//function that sends customer data to createShipObject
//return getInfoFromResponse

let createLabels = function(customersArray, directoryPath, retrieveArray){
    let arrayOfPDFs  = [];
    for(let i = 0; i < customersArray.length; i++){
      let customer     = customersArray[i];
      let customerId   = (customer.id < 10) ? `0${customer.id}` : customer.id
      let information  = onTracHelpers.createShipObject(customer)
      let requestInput = {
        url: onTracHelpers.apiUrl,
        method: 'POST',
        headers: {'Content-Type': 'text/xml'},
        body: information
      }

      request(requestInput, function(error, response, body){
        if(error) {console.log(error)}
        else {
          onTracHelpers.getInfoFromResponse(response.body, function(error, onTracResponse){
            if(error) {console.log(error)}
            else {
              let path = `${directoryPath} ${customerId} - ${onTracResponse.tracking}.pdf`;
              base64_decode(onTracResponse.label,path);
              arrayOfPDFs.push(path);
              if(arrayOfPDFs.length === customersArray.length){
                retrieveArray(error, arrayOfPDFs)
              }
            }
          })
        }
      })
    }
  }

module.exports = {createLabels, retrieveArray, base64_decode}
