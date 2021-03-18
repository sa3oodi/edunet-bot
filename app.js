const fetch = require('node-fetch');
const request = require('request');
var setCookie = require('set-cookie-parser');
var encrypt = require('./encrypt-decrypt');
// var https = require('https');
// const Axios = require("axios").default;
// var request = require('request');
const TOKEN = '1743354043:AAEMQezBuvTgvgcgo3CeJR-i_6jsdQedP54';
const TelegramBot = require('node-telegram-bot-api');
const options = {
    webHook: {
        port: process.env.PORT
    }
};

const url = 'https://powerful-refuge-93617.herokuapp.com:443';
const bot = new TelegramBot(TOKEN, options);
bot.setWebHook(`${url}/bot${TOKEN}`);

async function regex_hidden_token(response) {
    const is = /value="(.*?)" \/>/gm
    const finish = is.exec(response)
    return finish[1]
}
async function edunet_get_req_token() {
    return fetch('https://edunet.bh').then((res) => {
        // console.log(res.headers.get('set-cookie').split(';')[0])
        return res.text()


    })
}



// async function AWSALBCORS(response) {
//     const is = /AWSALBCORS=(.*?);/gm
//     const finish = is.exec(response)
//     return finish[1]
// }




// async function request_to_get_AWSALBCORS() {
//     return Axios.request({
//         method: "get",
//         url: "https://edunet.bh",
//         maxRedirects: 0,
//         validateStatus: function(status) {
//             return status >= 200 && status < 303;
//         },
//     }).then(res => {
//         return res.headers["set-cookie"];
//     });
// }

// // request_to_get_AWSALBCORS().then(nn => {
// //     console.log(nn)
// // })

// // request.post({
// //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
// //     url: 'https://edunet.bh/Account/Login',
// //     body: "mes=heydude"
// // }, function(error, response, body) {
// //     console.log(body);
// //     // return body
// // });



// // post().then(response => {
// //     console.log(response)
// // })

// async function web_token() {
//     return https.get('https://edunet.bh', function(res) {
//         var cookies = setCookie.parse(res, {
//             decodeValues: true, // default: true
//             map: true //default: false
//         });

//         // var desiredCookie = cookies['set-cookie'];
//         return cookies['set-cookie']
//     })
// }

// async function awsalb() {
//     return fetch('https://edunet.bh', {
//         headers: {
//             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
//         }
//     }).then((res) => {
//         // console.log(res.headers.get('set-cookie').split(';')[0])
//         var oses = res.headers.get('set-cookie')

//         return setCookie.parse(oses, {
//             decodeValues: true, // default: true
//             map: true //default: false
//         })
//     })
// }


// async function edunet_login_v2(body = {}, hdr = {}) {
//     return axios.post('https://edunet.bh/Account/Login', {
//             __RequestVerificationToken: body['__RequestVerificationToken'],
//             Username: body['Username'],
//             Password: body['Password'],
//         }, {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
//                 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
//                 'Sec-Fetch-Site': 'same-origin',
//                 'Sec-Fetch-Mode': 'navigate',
//                 'Sec-Fetch-User': '?1',
//                 'Sec-Fetch-Dest': 'document',
//                 'Referer': 'https://www.edunet.bh/',
//                 'Accept-Encoding': 'gzip, deflate, br',
//                 'Accept-Language': 'en',
//                 'Cookie': `__RequestVerificationToken=${body['__RequestVerificationToken']}; AWSALB=${hdr['AWSALB']}; AWSALBCORS=${hdr['AWSALBCORS']}`
//             }
//         }


//     ).then((res) => {

//         return res
//     })
// }

// // request.post({
// //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
// //     url: 'https://edunet.bh/',
// //     body: ``
// // }, function(error, response, body) {
// //     asp = setCookie.parse(response, {
// //             decodeValues: true, // default: true
// //             map: true //default: false
// //         })
// //         // console.log(cc['ASP.NET_SessionId'].value)
// // })

// // async function edunet_login(body = {}, hdr = {}) {
// //     console.log(body)
// //     console.log(hdr)
// //     return fetch('https://edunet.bh/', {
// //         method: 'POST',
// //         // body: JSON.stringify({
// //         //     __RequestVerificationToken: body['__RequestVerificationToken'],
// //         //     Username: body['Username'],
// //         //     Password: body['Password'],
// //         // })
// //         body: `__RequestVerificationToken=${body['__RequestVerificationToken']}&Username=${body['Username']}&Password${body['Password']}`,


// //         headers: {
// //             'Content-Type': 'application/x-www-form-urlencoded',
// //             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
// //             'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
// //             'Sec-Fetch-Site': 'same-origin',
// //             'Sec-Fetch-Mode': 'navigate',
// //             'Sec-Fetch-User': '?1',
// //             'Sec-Fetch-Dest': 'document',
// //             // 'Referer': 'https://www.edunet.bh/',
// //             'Accept-Encoding': 'gzip, deflate, br',
// //             'Accept-Language': 'en',
// //             'Cookie': `__RequestVerificationToken=${body['__RequestVerificationToken']}; AWSALB=${hdr['AWSALB']}; AWSALBCORS=${hdr['AWSALBCORS']}`
// //         },
// //     }).then(res => {
// //         return setCookie.parse(res, {
// //                 decodeValues: true, // default: true
// //                 map: true //default: false
// //             })
// //             // return res.text()
// //     })

// // }

// edunet_get_req_token().then((response) => {
//     // console.log(response)
//     awsalb().then(tk_aw => {
//         var tk_tokens = tk_aw['AWSALB'].value
//             // console.log(`sw : ${tk_tokens}`)
//         request_to_get_AWSALBCORS().then(all_header => {
//             AWSALBCORS(all_header).then(AWSALBCORS => {
//                 regex_hidden_token(response).then((res) => {
//                     // console.log(res)
//                     var bdy = {
//                         __RequestVerificationToken: res,
//                         Username: '030200482',
//                         Password: '03020048235119254Saeed',

//                     }

//                     var hdr = {
//                             __RequestVerificationToken: res,
//                             AWSALBCORS: AWSALBCORS,
//                             AWSALB: tk_tokens
//                         }
//                         // edunet_login(bdy, hdr).then(http_reponse => {
//                         //     console.log(http_reponse)
//                         // })
//                     request.post({
//                         headers: { 'content-type': 'application/x-www-form-urlencoded' },
//                         url: 'https://edunet.bh',
//                         body: ``
//                     }, function(error, response, body) {
//                         var asp = setCookie.parse(response, {
//                                 decodeValues: true, // default: true
//                                 map: true //default: false
//                             })
//                             // console.log(asp['ASP.NET_SessionId'].value)
//                         request.post({
//                             headers: { 'content-type': 'application/x-www-form-urlencoded', 'cookie': `__RequestVerificationToken=${bdy['__RequestVerificationToken']}; AWSALB=${hdr['AWSALB']}; AWSALBCORS=${hdr['AWSALBCORS']}; ASP.NET_SessionId=${asp['ASP.NET_SessionId'].value}` },
//                             url: 'https://edunet.bh/Account/Login',
//                             body: `__RequestVerificationToken=${bdy['__RequestVerificationToken']}&Username=${bdy['Username']}&Password=${bdy['Password']}`
//                         }, function(error, response, body) {
//                             // var cc = setCookie.parse(response, {
//                             //         decodeValues: true, // default: true
//                             //         map: true //default: false
//                             //     })
//                             // console.log(body.get.headers('set-cookie'));
//                             // return body
//                             console.log(body)
//                         });
//                     })


//                 })
//             })
//         })

//     })

// })


// // web_token().then(es => {
// //     console.log(es)
// // })

function removeTags(str) {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, '');
}

async function get_id_of_quize(response) {
    const is = /"ID": (.*?),/gm
    const finish = is.exec(response)
    return finish[1]
}

async function get_id_of_cource(response) {
    const is = /"Course_Id": "(.*?)"},/gm
    const finish = is.exec(response)
    return finish[1]
}

async function edunet_quiz(ID, Course_Id) {
    return fetch('https://www.edunet.bh/Quiz/GetQuizQuestions', {
        method: 'POST',
        body: `ID=${ID}&Course_Id=${Course_Id}`,
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
    }).then(res => {
        return res.json()
    }).catch(console.log)
}


async function quiz(headers) {
    return fetch(`https://www.edunet.bh/Quiz/TakeQuiz?q=2QHueY5vMvFzh4CsXk4qq4GMNrhYTqcFksSI/Mk2jtk=`, {
        headers: {
            'Cookie': headers,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
        }
    }).then(response => {

        return response.text().then(d => {
            return d
        })
    }).catch(rs => {
        console.log('err')
    })
}

async function set_session(headers) {
    return fetch(`https://www.edunet.bh/Account/SetOracleUserSessionInfo?q=nabXRAJ Wa/g3mChDtWxyWiIQg3A6fXX13Tk5vlskzAP06ru0K3oW5aOYeziug1K`, {
        headers: {
            'Cookie': headers,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
        }
    }).then(response => {

        return response.text().then(d => {
            return d
        })
    }).catch(rs => {
        console.log('err')
    })
}



async function login() {

    return new Promise(function(resolve, reject) {

        request.post({
            url: 'https://www.edunet.bh/',
            form: {
                __RequestVerificationToken: '0-rAn9F4_w_222Rg03OHhxE9JgGRDZTGDcT1dP0YQd1Wy_XE6YGPld6YvTjkqoCjMnSaloYJ2y_KJxynJoL69qiCIxjk9HLRvr6BMLlIsDw1',
                Username: '030200482',
                Password: '03020048235119254Saeed'
            },
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Cookie': 'AWSALB=BIJN6SKiPcShhwqF5lb9wIZbWE1eKhrflutlF1DUBQeNcggo73qo0ZvvS0ejVR7o0I4IdAIaaJmV3Zft7eUertwe4AMGP0kZXboki82tymshOmMJYrIJ0j7PCymq; AWSALBCORS=BIJN6SKiPcShhwqF5lb9wIZbWE1eKhrflutlF1DUBQeNcggo73qo0ZvvS0ejVR7o0I4IdAIaaJmV3Zft7eUertwe4AMGP0kZXboki82tymshOmMJYrIJ0j7PCymq; _ga=GA1.2.844371031.1603007674; zoom=1.7999999999999998; _culture=ar-BH; _gid=GA1.2.643069789.1613142921; __RequestVerificationToken=esQwShPDE3KGqgrHG0RIObbTGGTwBoL49P6vfhbZ-oGF8Xg5gnS62L3O2oW5KiUXSyOKewvBlqK1kAPVibReTGMKCTfoFp_XW08OP9vwD4w1; ASP.NET_SessionId=btbp1ifxs0imrr3u4gcf32yh'
            }
        }, function(err, httpResponse, body) {


            if (err) {
                reject(err);
            } else {
                var headers = setCookie.parse(httpResponse, {
                    decodeValues: true,
                    map: true
                })
                var response_data = {
                    response: body,
                    headers: headers
                }
                resolve(response_data);
            }

        })




    })
}




bot.on('message', function onMessage(msg) {

    if (msg.text === '/start') {
        bot.sendMessage(msg.chat.id, "I'm listening for you...")
    } else {
        // login().then(rs => {
        //     if (rs['response'].includes('/Account/UserType')) {

        //         var headers = `AWSALB=${rs['headers']['AWSALB'].value}; AWSALBCORS=${rs['headers']['AWSALBCORS'].value}; .AspNet.ApplicationCookie=${rs['headers']['.AspNet.ApplicationCookie'].value}; __RequestVerificationToken=esQwShPDE3KGqgrHG0RIObbTGGTwBoL49P6vfhbZ-oGF8Xg5gnS62L3O2oW5KiUXSyOKewvBlqK1kAPVibReTGMKCTfoFp_XW08OP9vwD4w1; ASP.NET_SessionId=btbp1ifxs0imrr3u4gcf32yh; zoom=1.7999999999999998`
        //         console.log(headers)
        //         set_session(headers).then(sp => {
        //             quiz(headers).then(qu => {
        //                 // console.log(qu)
        //                 get_id_of_quize(qu).then(quize_id => {
        //                     get_id_of_cource(qu).then(cource_id => {
        //                         edunet_quiz(quize_id, cource_id).then(respon => {
        //                             respon.forEach(element => {
        //                                 var choice = element['ChoicesList'];
        //                                 choice.forEach(ans => {
        //                                     var is_correct = ans['Correct_Choice'];
        //                                     if (is_correct === true) {
        //                                         bot.sendMessage(msg.chat.id, `Question : ${removeTags(element['Question_Text']) }\nAnswer : ${ans['ChoiceText']}\n\nQuiz cheat by S.SAEED (:`);
        //                                     }
        //                                 });
        //                             });
        //                         })
        //                     })
        //                 })
        //             })
        //         })
        //     } else {
        //         console.log("Username Or Password Dosen't Match!")
        //     }
        // })
    }

})