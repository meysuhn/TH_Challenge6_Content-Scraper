/*jshint esversion: 6 */

// This file to contain the command line application (entry point)

const Xray = require('x-ray');
const x = Xray();
const fs = require('fs');
const csv = require ('./csv.js');
const dir = './data'; // Set up data directory
const moment = require('moment'); // date & time module
const momentTZ = require('moment-timezone'); // timezone module


// NOTE Why is errors function easily available to csv file, but I have to export the xrayScraper one?


// Moment Data
let time = moment().format('H:mm:ss'); // display time in 24 hour format.
let day = moment().format('ddd');
let date = moment().format('MMM DD YYYY');
let guess = moment.tz.guess(); // get user's zone
let timezone = moment.tz(guess).format('z Z'); // Get zone info for user's zone
let timezoneAbbr = moment.tz().zoneAbbr();  // Zone name abbreviation


function errors(err){ // err object passed in from whichever function has failed
  var errorLog = '';
  if (err.code == 'ENOTFOUND') {
    errorLog = "["+`${day}`+ " " + `${date}` + " " + `${time}`+ " " + `${timezone}`+ " " + "("+`${timezoneAbbr}`+")" + "]" + " " + "There’s been a 404 error. Cannot connect to http://shirts4mike.com.";
  } else {
    errorLog = "["+`${day}`+ " " + `${date}` + " " + `${time}`+ " " + `${timezone}`+ " " + "("+`${timezoneAbbr}`+")" + "]" + " " + err.message;
  }

  fs.appendFile('scraper-error.log', '\r\n' + errorLog, function (err) {  // '\r\n' ensures the message is added to a new line in log file
    if (err) {
      // append failed
    } else {
      // done
    }
  });
}





// CHECK IF DATA DIRECTORY EXISTS
(function() {
  fs.open(dir, 'r', (err, fd) => { // try to open /data folder
    if (err) { // Check for ENOENT error (meaning folder doesn't exist)
      if (err.code === 'ENOENT') { // If directory doesn't exist then create one
      errors(err); // run the errors function
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
        errors(err); // run the errors function
    }
    else {
      for(var i=0; i<obj.shirts.length; i++){
          obj.shirts[i].time  = time;
         }
         csv.makeCSV(obj); // fun the makeCSV function in csv module
      }
    }); // end of callback

} // end of xrayScraper function

module.exports.xrayScraper = xrayScraper; // makes the xrayScraper function available globally
