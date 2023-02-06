const mysql = require("promise-mysql")
const config = require("./config")



const connection = mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    



})


const getConnection =()=> {


    return connection;
}


module.exports = {

getConnection


}