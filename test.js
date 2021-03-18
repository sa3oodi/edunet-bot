// var encrypt = require('./encrypt-decrypt');

// encrypt.encrypt('Hello World!').then(res => {
//     if (res === '2c8bd89c2e314f7f2245e04c') {
//         console.log(res)
//         encrypt.decrypt(res).then(res2 => {
//             console.log(res2)
//         })
//     }


// })


var database = require('./database')


// database.check("030200482").then(result => {
//     if (result == false) {
database.add(database.user("030200482", "03020048235119254Saeed")).then(console.log(`New User Added`))
    // }

// })