   const getConnection = require("../conts_database/database")
   const mysql = require("promise-mysql")
   const config = require("../config")



const connection = mysql.createConnection({
    host: localhost,
    database: node_express_example,
    user: root
    

})




 const getLanguajes = async (req, res)=>{

     res.json("Hello controler")
      const results = await connection.query("SELECT id, name, programers FROM language")
    console.log(results)
    res.json(results)
   
    };

    const methods = {

    getLanguajes

    }


   module.exports = methods;



