var database = require('./database')



database.check_user("username").then(result => {

})



database.add_user("username", "password", "chat_id").then(result => {

})

database.get_info("chat_id").then(result => {

})