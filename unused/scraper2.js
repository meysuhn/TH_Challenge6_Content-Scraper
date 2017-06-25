/*jshint esversion: 6 */

const Xray = require('x-ray');
const x = Xray();
const fs = require('fs');
const csv = require ('./csv2.js');
const dir = './data'; // prep a new data folder
const moment = require('moment');

var time = moment().format('HH:MM:SS');
let JSONString = '';

// According to https://nodejs.org/api/fs.html#fs_fs_access_path_mode_callback the approach below is better practice
  // i.e. trying to open the file rather than checking its existance.
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


(function() {
  x('http://shirts4mike.com/shirts.php',  {
    shirts: x('.products li', [{ // all list items under the .products scope
      url: 'a@href', // the individual shirt page links
      imageURL: 'img@src', // individual shirt image
      shirt_page: x('a@href', { // traverse to the individual shirt page link
        price: 'span.price',
        title: 'title',
      })
    }])

  }).write(JSONString); // write the results to JSON string variable
let parsedData = JSON.stringify(JSONString);
let shirtData = parsedData.shirts;

return shirtData;
})();
csv.convert(shirtData);
//module.exports = shirtData;
