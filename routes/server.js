//configurações conexão MySQL
/* Em caso de teste, alterar as configurações do BD de sua preferência! */
const mysql= require('mysql')
const conn = mysql.createConnection ({
    host    :'localhost',
    user    :'root',
    password:'',
    database:'loja'
})

conn.connect((err)=>{
    if(err){
        console.log(err)
    } else {
        console.log('BD Connected...')
    }
})


module.exports = {mysql, conn}