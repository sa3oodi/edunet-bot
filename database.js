var database = require('./database.json')
const fs = require('fs');

var output = {
    username: "oses",
    password: "oses123"
}

var mynotes = { "Id": "oses", "Title": "oses", "Description": "hi" };

fs.readFile('./database.json', 'utf8', function(err, data) {
    // console.log(data)
    var obj = JSON.parse(data);
    obj.push(mynotes);
    var strNotes = JSON.stringify(obj);
    fs.writeFile('./database.json', strNotes, function(err) {
        if (err) return console.log(err);
        console.log('Note added');
        // });

    })
})