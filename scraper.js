/*jshint esversion: 6 */

// This file to contain the command line application (entry point)

const Xray = require('x-ray');
const x = Xray();
const fs = require('fs');
const csv = require ('./csv.js');
const dir = './data'; // Set up data directory
const moment = require('moment'); // date & time module

// CHECK IF DATA DIRECTORY EXISTS
(function() {
  fs.open(dir, 'r', (err, fd) => { // try to open /data folder
    if (err) { // Check for ENOENT error (meaning folder doesn't exist)
      if (err.code === 'ENOENT') { // If directory doesn't exist then create one
        fs.mkdir(dir); // create the missing directory
      }
    }
    // data folder exists. No need to create one
  });
  xrayScraper();
})();

// X-ray Scraper
function xrayScraper() {
    x('http://shirts4mike.com/shirts.php', {
      shirts: x('.products li', [{ // all list items under the .products scope
        url: 'a@href', // the individual shirt page links
        imageURL: 'img@src', // individual shirt image
        shirt_page: x('a@href', { // traverse to the individual shirt page link
          price: 'span.price',
          title: 'title',
        })
      }])
    })(function(err, obj) { // Callback function to add in time key and value to object.
      if(err) {
      console.log("There’s been a 404 error. Cannot connect to http://shirts4mike.com.");
    }
    else {
      let time = moment().format('H:mm:ss'); // display time in 24 hour format.
      console.log("The time is: " + time);
      for(var i=0; i<obj.shirts.length; i++){
          obj.shirts[i].time  = time;
         }
         csv.makeCSV(obj); // fun the makeCSV function in csv module
      }
    }); // end of callback

} // end of xrayScraper function

module.exports.xrayScraper = xrayScraper; // makes the xrayScraper function available globally
