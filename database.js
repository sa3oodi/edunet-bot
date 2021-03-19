var fetch = require('node-fetch');



async function check_user(username) {
    return fetch(`https://cutr.ga/edunet.bh/check_database.php?username=${username}`, {
        Headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0'
        }
    }).then(response => {
        return response.json()
    })
}

async function add_user(username, password, chat_id) {
    return fetch(`https://cutr.ga/edunet.bh/add_to_database.php?username=${username}&password=${password}&chat_id=${chat_id}`, {
        Headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0'
        }
    }).then(response => {
        return response.json()
    })
}

async function get_info(chat_id) {
    return fetch(`https://cutr.ga/edunet.bh/get_result.php?chat_id=${chat_id}`, {
        Headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0'
        }
    }).then(response => {
        return response.json()
    })
}


module.exports = {
    check_user: check_user,
    add_user: add_user,
    get_info: get_info
}