/*jshint esversion: 6 */

const json2csv = require('json2csv');
const fs = require('fs');
const fields = ['shirt_page.title', 'shirt_page.price', 'imageURL', 'url', 'time']; // select which keys in the json to scan.
const fieldNames = ['Title', 'Price', 'ImageURL', 'URL', 'Time']; // This gives custom column names, different to the field names
const moment = require('moment'); // module for getting date and time

var date = moment().format('YYYY-MM-DD');
var fileName = `data/${date}.csv`; // Template literal to create file name with current date.

function makeCSV (obj) { // takes in returned object from xrayScraper function
  let shirtData = obj.shirts;
  let result = json2csv({ data: shirtData, fields: fields, fieldNames: fieldNames }); // run JSON2CSV
  var shirtsObj = obj;
  fs.writeFile(fileName, result, function(err) { //save file to data dir
    if (err) {
      errors(err); // run the errors function
    }
  });

}

module.exports.makeCSV = makeCSV; // makes the makeCSV function available globally
