/*jshint esversion: 6 */

const fs = require('fs');
const moment = require('moment');
const scraper = require ('./scraper2.js');
const json2csv = require('json2csv');
const fields = ['shirt_page.title', 'shirt_page.price', 'imageURL', 'url', 'time']; // select which keys in the json to scan.
const fieldNames = ['Title', 'Price', 'ImageURL', 'URL', 'Time']; // This gives custom column names, different to the field names


var time = moment().format('HH:MM:SS');
var date = moment().format('YYYY-MM-DD');

var fileName = `data/${date}.csv`; // Template literal to create file name with current date.

//var shirtData = scraper2.shirtData;


function convert(shirtData){
  var csv = json2csv({ data: shirtData, fields: fields, fieldNames: fieldNames });



}

function makeCSV () {
  console.log("makeCSV has run");
  fs.writeFile(fileName, csv, function(err) { //save file to data dir
    if (err) throw err;
    console.log('file saved');
  });

}


module.exports.makeCSV = makeCSV; // makes the makeCSV function available globally
