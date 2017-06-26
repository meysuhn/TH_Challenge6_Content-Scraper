/*jshint esversion: 6 */

// This file to contain the command line application (entry point)

const Xray = require('x-ray');
const x = Xray();
const fs = require('fs');
const csv = require ('./csv.js');
const dir = './data'; // Set up data directory
const moment = require('moment');


//var time = moment().format('HH:MM:SS'); // The time becomes incorrect when running code more than once.


// Check if data directory exists.
fs.open(dir, 'r', (err, fd) => { //r stands for ´read´. fd stands for 'file descriptor' and is the second param in this callback
  if (err) {
    // If a specific error is returned...
    if (err.code === 'ENOENT') { //ENOENT is an abbreviation of Error NO ENTry (or Error NO ENTity), and can actually be used for more than files/directories.
      console.log(err.code);
      console.error('dir does not exist but it will in a sec...');
      fs.mkdir(dir);
      console.error('now dir does exist');
      return;
    } // Else, if an undefined error...
    console.log("UNDEFINED ERROR THROWN");
    throw err;
  } // end of primary error if block

  console.log("folder exists");
});


// Scraper function (x-ray)
// (function() {
//   try {
//     x('http://shirts4mike.com/shirts.php',  {
//       shirts: x('.products li', [{ // all list items under the .products scope
//         url: 'a@href', // the individual shirt page links
//         imageURL: 'img@src', // individual shirt image
//         shirt_page: x('a@href', { // traverse to the individual shirt page link
//           price: 'span.price',
//           title: 'title',
//         })
//       }])
//     }).write('results.json'); // write the results to JSON file

// None-Functioning Callback function.
// Instead of .write('results.json'); above the callback function to manipulate data in order to add time would be:
// (function(shirtData){ //x-ray callback function. shirts is the data from x-ray scrape
// for(var i=0; i<shirtData.shirts.length; i++){
//     shirtData.shirts[i].time  = 'time'; // = shirts[i].time;
//     shirtData[i].time = 'time';
//      fs.writeFile('results.json', JSON.stringify(shirtData));
// }});

//   csv.makeCSV(); // fun the makeCSV function in csv module
//   }
//   catch (err) {
//     // human-readable error statement to go in here.
//     console.error(err);
//   }
//
// })();

///////////////////////////////////////////

x('http://shirts4mike.com/shirts.php', {
  shirts: x('.products li', [{ // all list items under the .products scope
    url: 'a@href', // the individual shirt page links
    imageURL: 'img@src', // individual shirt image
    shirt_page: x('a@href', { // traverse to the individual shirt page link
      price: 'span.price',
      title: 'title',
    })
  }])
})(function(err, obj) {
//console.log(obj);
var time = moment().format('HH:MM:SS');
console.log("The time is: " + time);

for(var i=0; i<obj.shirts.length; i++){
    obj.shirts[i].time  = time; // = shirts[i].time;
    //shirtData[i].time = 'time';
     //fs.writeFile('results.json', JSON.stringify(shirtData));
     csv.makeCSV(obj); // fun the makeCSV function in csv module

}

//return obj;
}); //.write('results.json'); // write the results to JSON file

module.exports.x = x; // makes the makeCSV function available globally
// Problem here is order of execution I think.
