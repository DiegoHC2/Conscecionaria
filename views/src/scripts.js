const multer = require('multer')
const {conn }= require('../../routes/server')
const path = require('path')
const storage = multer.diskStorage({

    destination: (req, file, cb)=>{
        cb(null, 'public/images/bdimgs');
    },
    filename: (req, file, cb)=>{
    const queryI = "SELECT * FROM veiculos ORDER BY id DESC LIMIT 1"
    console.log('entrou aqui')
        conn.query(queryI, (err, results, fields)=>{
            if(err) { console.log('err injection...')}
                else {
        
            const id = results[0].id+1
            cb(null, `image_${id}${path.extname(file.originalname)}`)
    
                    }
                   
                        })     
            }
        })

const upload = multer({storage});


// script footer hidden



module.exports = {storage, upload}