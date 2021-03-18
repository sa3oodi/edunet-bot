const JsonRecords = require('json-records');
const jr = new JsonRecords('database.json');

async function add_to_database(username, password, chat_id) {
    return jr.add({ username: username, password: password, chat_id: chat_id });
}


async function all_records() {
    return jr.get();
}

module.exports = {
    add_to_database: add_to_database,
    all_records: all_records
}