const fetch = require('node-fetch');
const request = require('request');
var setCookie = require('set-cookie-parser');
var encrypt = require('./encrypt-decrypt');
var database = require('./database')
const TOKEN = '1743354043:AAEMQezBuvTgvgcgo3CeJR-i_6jsdQedP54';
const TelegramBot = require('node-telegram-bot-api');
const { check_user, get_info } = require('./database');
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

async function quiz(headers, link) {
    return fetch(`${link}`, {
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

async function edunet_login(username, password) {
    return new Promise(function(resolve, reject) {
        request.post({
            url: 'https://www.edunet.bh/',
            form: {
                __RequestVerificationToken: '0-rAn9F4_w_222Rg03OHhxE9JgGRDZTGDcT1dP0YQd1Wy_XE6YGPld6YvTjkqoCjMnSaloYJ2y_KJxynJoL69qiCIxjk9HLRvr6BMLlIsDw1',
                Username: username,
                Password: password
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

        if (msg.text.toLocaleLowerCase() === '/start') {
            bot.sendMessage(msg.chat.id, `Welcome Back ${msg.from.username} 😝,\n\nThis Bot Allows You To Get\nEdunet.bh Quiz Answers For Free 😎.\n\nFor More Helps Send (/help)`)
        } else if (msg.text.toLocaleLowerCase() === '/help') {
            bot.sendMessage(msg.chat.id, 'Edunet Quiz Commands.\n\nFor login To Edunet.bh;\nSend (/login username:password)\n\nMake sure Enter the Command Correctly!\n\n\nFor Get The Quiz Answers\nPlease Send The Quiz Link To The Bot,\nif You Are Already Logged In Before!')
        } else if (msg.text.includes('/login')) {
            var username2 = msg.text.split(':')[0]
            var username = username2.split('/login ')[1]
            var password = msg.text.split(':')[1]
            database.check_user(username).then(check_user_response => {
                if (check_user_response.success === true) {
                    if (check_user_response.message === "This Username Already On Database") {
                        bot.sendMessage(msg.chat.id, check_user_response.message)
                    } else if (check_user_response.message === "Available") {
                        edunet_login(username, password).then(response => {
                            if (response['response'].includes('/Account/UserType')) {
                                var headers = `AWSALB=${rs['headers']['AWSALB'].value}; AWSALBCORS=${rs['headers']['AWSALBCORS'].value}; .AspNet.ApplicationCookie=${rs['headers']['.AspNet.ApplicationCookie'].value}; __RequestVerificationToken=esQwShPDE3KGqgrHG0RIObbTGGTwBoL49P6vfhbZ-oGF8Xg5gnS62L3O2oW5KiUXSyOKewvBlqK1kAPVibReTGMKCTfoFp_XW08OP9vwD4w1; ASP.NET_SessionId=btbp1ifxs0imrr3u4gcf32yh; zoom=1.7999999999999998`
                                set_session(headers).then(set_session_response => {
                                    encrypt.encrypt(username).then(username_encrypt => {
                                        encrypt.encrypt(password).then(password_encrypt => {
                                            database.add_user(username_encrypt, password_encrypt, msg.chat.id).then(add_user_reponse => {
                                                if (add_user_reponse.seccess === true) {
                                                    bot.sendMessage(msg.chat.id, "Logged in Successfully...")
                                                } else {
                                                    bot.sendMessage(msg.chat.id, add_user_reponse.message)
                                                }
                                            })
                                        })
                                    })
                                })
                            } else {
                                bot.sendMessage(msg.chat.id, "Username Or Password Dosen't Match!")
                            }
                        })
                    }
                }
            })

        } else {
            if (validUrl.isUri(msg.text)) {
                if (msg.text.includes('https://edunet.bh/Quiz/TakeQuiz?q=')) {
                    database.get_info(msg.chat.id).then(get_info_response => {
                        if (get_info_response.username === null) {
                            bot.sendMessage(msg.chat.id, "You have Not logged in yet,\nplease sign in...\n\nFor More Helps(/help)")
                        } else {
                            database.get_info(msg.chat.id).then(get_info_response => {
                                encrypt.decrypt(get_info_response.username).then(username_decrypt => {
                                    encrypt.decrypt(get_info_response.password).then(password_decrypt => {
                                        edunet_login(username_decrypt, password_decrypt).then(response => {
                                            if (response['response'].includes('/Account/UserType')) {
                                                var headers_login = `AWSALB=${rs['headers']['AWSALB'].value}; AWSALBCORS=${rs['headers']['AWSALBCORS'].value}; .AspNet.ApplicationCookie=${rs['headers']['.AspNet.ApplicationCookie'].value}; __RequestVerificationToken=esQwShPDE3KGqgrHG0RIObbTGGTwBoL49P6vfhbZ-oGF8Xg5gnS62L3O2oW5KiUXSyOKewvBlqK1kAPVibReTGMKCTfoFp_XW08OP9vwD4w1; ASP.NET_SessionId=btbp1ifxs0imrr3u4gcf32yh; zoom=1.7999999999999998`
                                                set_session(headers_login).then(set_session_response => {
                                                    quiz(headers, link).then(qu => {
                                                        get_id_of_quize(qu).then(quize_id => {
                                                            get_id_of_cource(qu).then(cource_id => {
                                                                edunet_quiz(quize_id, cource_id).then(respon => {
                                                                    respon.forEach(element => {
                                                                        var choice = element['ChoicesList'];
                                                                        choice.forEach(ans => {
                                                                            var is_correct = ans['Correct_Choice'];
                                                                            if (is_correct === true) {
                                                                                bot.sendMessage(msg.chat.id, `Question : ${removeTags(element['Question_Text'])}\n\nAnswer : ${ans['ChoiceText']}\n\nQuiz Cheat By Anonymous (:`);
                                                                            }
                                                                        });
                                                                    });
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            } else {
                                                bot.sendMessage(msg.chat.id, "Username Or Password Dosen't Match!")
                                            }
                                        })
                                    })
                                })
                            })
                        }
                    })
                } else {
                    bot.sendMessage(msg.chat.id, "Not Valid Link 😅...")
                }
            } else {
                bot.sendMessage(msg.chat.id, "Not Valid Link 😅...")
            }





        }
    })
    // var mssg = msg.text
    // var username = mssg.split(':')[0]
    // var password1 = mssg.split(':')[1]
    // var password = password1.split(' ')[0]
    // var link = mssg.split(' ')[1]

// login(username, password).then(rs => {
//         if (rs['response'].includes('/Account/UserType')) {
//             // database.add_to_database(username_encrypt, password_encrypt)
//             var headers = `AWSALB=${rs['headers']['AWSALB'].value}; AWSALBCORS=${rs['headers']['AWSALBCORS'].value}; .AspNet.ApplicationCookie=${rs['headers']['.AspNet.ApplicationCookie'].value}; __RequestVerificationToken=esQwShPDE3KGqgrHG0RIObbTGGTwBoL49P6vfhbZ-oGF8Xg5gnS62L3O2oW5KiUXSyOKewvBlqK1kAPVibReTGMKCTfoFp_XW08OP9vwD4w1; ASP.NET_SessionId=btbp1ifxs0imrr3u4gcf32yh; zoom=1.7999999999999998`
//             set_session(headers).then(sp => {
//                 quiz(headers, link).then(qu => {
//                     get_id_of_quize(qu).then(quize_id => {
//                         get_id_of_cource(qu).then(cource_id => {
//                             edunet_quiz(quize_id, cource_id).then(respon => {
//                                 respon.forEach(element => {
//                                     var choice = element['ChoicesList'];
//                                     choice.forEach(ans => {
//                                         var is_correct = ans['Correct_Choice'];
//                                         if (is_correct === true) {
//                                             bot.sendMessage(msg.chat.id, `Question : ${removeTags(element['Question_Text'])}\n\nAnswer : ${ans['ChoiceText']}\n\nQuiz Cheat By Anonymous (:`);
//                                         }
//                                     });
//                                 });
//                             })
//                         })
//                     })
//                 })
//             })
//         }
//     })
//     } else {
//         bot.sendMessage(msg.chat.id, "Username Or Password Dosen't Match!")
//     }
// })
// })