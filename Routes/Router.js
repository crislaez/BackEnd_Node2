const express = require('express');
const Product = require('../Modules/models')
//para el correo
const EmailCtrl = require('../Email');


const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: './img'}); // ./img es pa carpeta donde se subira la foto
//********************************

function endPoint(app){
     const router = express.Router();

     app.use('/api', router);

     //todos los productos
     router.get('/allProduct', (req, res) => {

        Product.find({}, (err, product) => {
            if(err) return res.status(500).json({message:`error al realizar la peticion: ${err}`});
            if(!product) return res.status(404).json({message: `No existen los productos`});

            res.status(200).json({data:product})
        })
     })

     //productos por id
     router.get('/:id', (req, res) => {
         let id = req.params.id;
         
         Product.findById(id, (err, product) => {
            if(err) return res.status(500).json({message:`error al realizar la peticion: ${err}`});
            if(!product) return res.status(404).json({message: `No existen los productos`});

            res.status(200).json({data:product})
         })
     })

     //subir producto
     router.post('/addProduct',multipartMiddleware, (req, res) => {
         let product = new Product();
         let aux = req.files.picture.path.split('\\');

         product.name = req.body.name;
         product.picture = 'http://localhost:3001/img/'+aux[1];
         product.price = req.body.price;
         product.description = req.body.description;
         product.quantity = req.body.quantity

         product.save((err, productSave) => {
            if(err) return res.status(500).json({message:`error al realizar la peticion: ${err}`});
            // EmailCtrl.sendEmail(req, res);
            res.status(200).json({data: productSave});
         })
     })

     //actualizar producto
    router.put('/update/:id', (req, res) => {
        let id = req.params.id;
        let update = req.body;
        
        console.log(id)
        console.log(req.body)

        Product.findByIdAndUpdate(id, update, (err, productUpdate) => {
            if(err) return res.status(500).json({message:`error al realizar la peticion: ${err}`});

            if(!productUpdate) return res.status(500).send({message: 'No retornó objeto actualizado'})

            res.status(200).json({data: productUpdate});
        })
    })     

     //borrar porducto
     router.delete('/delete/:id', (req, res) => {
         let id = req.params.id;

         Product.findById(id, (err, product) => {
            if(err) return res.status(500).json({message:`error al realizar la peticion: ${err}`});

            product.remove((err) => {
                if(err) return res.status(500).json({message:`error al realizar la peticion: ${err}`});

                res.status(200).json({data: `Producto borrado`});
            })
            
         })
     })
}

module.exports = endPoint;