// Requisições
 const express = require('express')
 const app = express()
 const port = 3000
 const path = require('path')
 const {engine} = require('express-handlebars')
 const server = require('./routes/server')
 const {conn} = require('./routes/server')
 const { urlencoded } = require('body-parser')
 const { type } = require('os')
 const upload = require('./views/src/scripts')
 //Configurações de path
 
 

 // vamos criar uma pasta estática e utilizar o server.js e as imagens
 app.use(express.static('public'))
 
 

 //configurando o Body
app.use(express.json())
app.use(urlencoded({
    extended:true
}))
 
 // configurando o handlebars
 app.engine('handlebars', engine())
 app.set('view engine', 'handlebars')
 app.set('views', './views')
 
 
 // Rotas

app.get('/', (req, res)=>{
    res.render("home");
})

app.get('/register', (req, res)=>{

    res.render('register')
    
})

app.get('/remove', (req, res)=>{
    const query = "SELECT * FROM veiculos"
    conn.query(query, (err, resultsRemove, fields)=>{
        res.render('remove', {resultsRemove})
    })
})

app.post('/register', upload.upload.single('file'), (req, res)=>{
    const errormanu = []
    const errormodel =[]
    const errorprice = []
    
    const fabricante = req.body.fabricante
    const modelo = req.body.modelo
    const preço = req.body.preco

    
        if(!fabricante || typeof fabricante == undefined || typeof fabricante == null) {
            errormanu.push({texto:'favor inserir fabricante'})
        }
        if(!modelo || typeof modelo == undefined || typeof modelo == null){
            errormodel.push({texto: 'favor inserir o modelodo do veiculo'})
        }
        if(!preço || typeof preço == undefined || typeof preço == null){
            errorprice.push({texto: 'favor inserir valor do veiculo'})
        }
        if(errormanu.length>0 || errormodel.length>0 || errorprice.length>0){
            res.render('register', {errormanu, errormodel, errorprice})
            console.log(errormanu)
            console.log(errormodel)
            console.log(errorprice)
            module.exports = {errormanu, errormodel, errorprice}
        } else{
        const manu = req.body.fabricante
        const model = req.body.modelo
        const price = req.body.preco
        const SQL = 'INSERT INTO veiculos (??, ??, ??) VALUES (?, ?, ?)'
        const data = ['fabricante', 'preco', 'modelo', manu, price, model]

        conn.query(SQL, data, (err)=>{
            if(err){
                console.log(err)
            }
            else {
                console.log('Injected...')
                res.render('register')
                
            }
        })}
})

app.get('/cars', (req, res)=>{
    console.log(req.query)
    const query = "SELECT * FROM veiculosdb";
    conn.query(query, (err, results, fields)=>{
        if(err){ console.log(err)
        } else {
            res.render('cars', {results})
        }
            
    })
    
})

app.get('/sucess', (req, res)=>{
    let id = req.query.id
    let query = "DELETE FROM veiculos WHERE veiculos.id=?"
    let data = [id]
    conn.query(query, data, (err)=>{
        if(err) {
            console.log(`error in injection:${err} `)
        }
    })
    res.render('sucess')
})
 app.listen(port, ()=>{
    console.log(`Server running in port ${port}... `)
 })
 