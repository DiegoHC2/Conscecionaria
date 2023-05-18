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

app.post('/register', (req, res)=>{
    const errormanu = []
    const errormodel =[]
    const errorprice = []
    
    const fabricante = req.body.fabricante
    const modelo = req.body.modelo
    const preço = req.body.preço
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
        } else{
        const manu = req.body.fabricante
        const model = req.body.modelo
        const price = req.body.preço
        const SQL = 'INSERT INTO veiculos (??, ??, ??) VALUES (?, ?, ?)'
        const data = ['fabricante', 'preco', 'modelo', fabricante, price, model]

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

 app.listen(port, ()=>{
    console.log(`Server running in port ${port}... `)
 })
 