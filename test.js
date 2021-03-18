// const JsonRecords = require('json-records');
// const jr = new JsonRecords('database.json');

// // Add 2 records.
// jr.add({ a: 1, c: 3 });


var text = "oses:123 link"


var username = text.split(':')[0]
var password1 = text.split(':')[1]
var password = password1.split(' ')[0]
var link = text.split(' ')[1]


console.log(`${username}\n${password}\n${link}`)