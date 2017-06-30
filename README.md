# th_scraper
TH Challenge 6 Scraper

//////////////////////
// Study Notes
//////////////////////

// Requiring files.
// When you're creating a module, you need to explicitly state what you want to have available to someone who requires it.
// module.exports.[Give a name to this API (i.e. this will be what you type to call the function being made available)] = [wire it up to something (i.e. the name of function you want to make available)];
  // e.g. "module.exports.makeCSV2 = makeCSV" in the csv.js file makes the makeCSV function available globally by calling makeCSV2 from any other module that has "require ('./csv.js');"
// .js is optional, but the path to the JavaScript is mandatory. If you don't include ./, it will not work.
// if you have more than one export from a module, you can use the following pattern:
    // module.exports = {
    //   get: getProfile,
    //   something: something
    // }
