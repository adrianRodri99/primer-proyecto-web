const express =require('express');
const jwt = require('jsonwebtoken');


const router = express.Router()

const usuarios= require('../modelos/usuarios')
 
router.get('/verUsers',usuarios.obtener);
router.get('/event',usuarios.event);
router.get('/tablaPlantilla',usuarios.tablaPlantilla);
router.post('/register', usuarios.insertarJugador);//postman ok
router.post('/registerUsers', usuarios.insertar);
router.post('/login', usuarios.login);//  postman ok--- why post 
router.delete('/users/:id', usuarios.eliminar);//postman ok
router.delete('/deportista/:id/:deporte', usuarios.eliminarJugador)
router.put('/deportista/:id', usuarios.updateJugador);
router.put('/users/:id', usuarios.update);//postman ok

router.get('/deportes', usuarios.deportes)
router.post('/capitanDeporte', usuarios.capitanDeporte)
router.put('/dameRol/:id', usuarios.dameRol)

router.post('/registerSolicitud', usuarios.insertarSolicitud);
router.get('/tablaSolicitudes/:deporte',usuarios.tablaSolicitudes);
router.delete('/solicitudes/:id/:deporte', usuarios.eliminarSolicitud)
router.put('/solicitud/:id', usuarios.updateSolicitud);



router.get('/', (req,res)=>{
     res.send('usuarios')
});

module.exports= router;
