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
    //r stands for ´read´. fd stands for 'file descriptor' and is the second param in this callback
    if (err) { // Check for ENOENT error (meaning folder doesn't exist)
      if (err.code === 'ENOENT') { // If directory doesn't exist then create one
        //ENOENT is an abbreviation of Error NO ENTry (or Error NO ENTity), and can actually be used for more than files/directories.
        //console.log("error code: " + err.code + " /data folder didn't exist but one has been created");
        fs.mkdir(dir); // create the missing directory
      } // end of ENOENT if block
    } // end of  error if block
    // data folder exists. No need to create one
  });
  xrayScraper();
})();

// X-ray Scraper
function xrayScraper() {
  try {
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
      try {
        let time = moment().format('HH:MM:SS');
        console.log("The time is: " + time);
        for(var i=0; i<obj.shirts.length; i++){
            obj.shirts[i].time  = time;
           }
           csv.makeCSV(obj); // fun the makeCSV function in csv module
      } catch (err) {
        console.error(err); // This just returns a stack trace
        console.error("Error code: " + err.code); // This returns undefined
        console.log("There’s been a 404 error. Cannot connect to http://shirts4mike.com.");
      }
    }); // end of callback
  } catch (error){
  }// end of main try/catch block
} // end of xrayScraper function

module.exports.xrayScraper = xrayScraper; // makes the xrayScraper function available globally

// Pre-Submission Question
  // What is going on with moment.js

  // Error messages.
  // I've put a try/catch block around the scraper request to catch an error when when shirts4mike is down.
  // When I test with the wifi turned off a stack trace is returned, but I can't access any specific error code on the err object.
   // I've followed Andrew's 'Handling the Error Event in Node' vids and _think_ I've set it up the same way...The only difference I can see
    // is that I'm not using an http module therefore maybe the error object doesn't come back the same?
   // Is it OK to simply write in a message for when an unspecified error occurs to fulfill this challenge's requirement? (as one line 51)
   // or if there is something I've not done quite right any tips greatly appreciated!
