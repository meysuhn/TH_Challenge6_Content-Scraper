/*jshint esversion: 6 */

const json2csv = require('json2csv');
const fs = require('fs');
const fields = ['shirt_page.title', 'shirt_page.price', 'imageURL', 'url', 'time']; // select which keys in the json to scan.
const fieldNames = ['Title', 'Price', 'ImageURL', 'URL', 'Time']; // This gives custom column names, different to the field names
const moment = require('moment'); // module for getting date and time

var date = moment().format('YYYY-MM-DD');
var fileName = `data/${date}.csv`; // Template literal to create file name with current date.

////////////////////////////////////////////////////
// The below code works via the .JSON file
const shirtJSON = require('./results.json'); // store the JSON file as a variable
let shirtData = shirtJSON.shirts; // This is from the ./results/json file. Shirts is the array name.
///////////////////////////////////////////////////


let result = json2csv({ data: shirtData, fields: fields, fieldNames: fieldNames }); // run JSON2CSV
//console.log(result);

function makeCSV () {
  //console.log("makeCSV has run");
  fs.writeFile(fileName, result, function(err) { //save file to data dir
    console.log('file saved');
    if (err) throw err;
  });

}

module.exports.makeCSV = makeCSV; // makes the makeCSV function available globally
