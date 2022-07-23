//const conexion = require('../conexion')
const { json } = require('body-parser');
const { Pool } = require('pg')
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt')

//conexion con la base de datos
const conexion = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: '112358',
    port: 5432,
})

//como saber errores que se validen en el front o en el back algunas cosas aclaradas pero no del todo watson


const obtener = async(req, res) =>{ 

    try{
    const resultado = await conexion.query('select * from usuarios');
    console.log(resultado.rows);
    return res.status(200).json(resultado.rows);
    
    }
    catch(error){
        res.status(400).json({
            ok: false,
            message:error.message
        })
    }

}

const update = async(req, res)=>{
    const id= req.params.id;
    const {name, password}= req.body
    
    try{
    const data = await conexion.query('select * from usuarios where id=$1', [id])
    if(data.rows.length ==0){
        return res.status(404).json({
            error: "the users dont exits",
        });
    }

    const resultado = await conexion.query('update usuarios set name=$1, password=$2 where id=$3', [name, password, id]);
    res.json('Users updated successfully');

    }
    catch(error){
        res.status(400).json({
            ok: false,
            message:error.message
        })
    }

}
 
const updateJugador= async(req,res)=>{
    
    const id= req.params.id;
    const {name, password, grupo, deporte, sexo}= req.body
    
    try{
    const data = await conexion.query('select * from plantillas where id=$1', [id])
    if(data.rows.length ==0){
        return res.status(404).json({
            error: "the users dont exits",
        });
    }

    const resultado = await conexion.query('update plantillas set name=$1, password=$2, grupo=$4, deporte=$5, sexo=$6 where id=$3', [name, password, id, grupo, deporte, sexo]);
    res.json('Users updated successfully')

    }
    catch(error){
        res.status(400).json({
            ok: false,
            message:error.message
        })
    }
    
}
const updateSolicitud= async(req,res)=>{
    
    const id= req.params.id;
    const {deporte, confirmar_solicitud}= req.body
    
    try{
    const data = await conexion.query('select * from solicitudes where id=$1 and deporte=$2', [id, deporte])
    if(data.rows.length ==0){
        return res.status(404).json({
            error: "the users dont exits",
        });
    }

    
    const resultado = await conexion.query('update solicitudes set confirmar_solicitud=$3 where id=$1 and deporte=$2', [id, deporte, confirmar_solicitud]);
    res.json('Users updated successfully')

    }
     catch(error){
        console.log('nooo')
        res.status(400).json({
            ok: false,
            message: error.message
        })
    } 
    
}
 

const insertar= async(req, res) =>{
    const {name, password }= req.body;
    
    try{
    //no name repetidos
    const data = await conexion.query('select * from usuarios where name=$1', [name])

    if(data.rows.length !=0){
        return res.status(400).json({
            error: "no tienes q registrarte de nuevo",
        });
    }    

    const resultado =await conexion.query('insert into usuarios (name, password) values ($1,$2)', [name, password])
    const consulta =await conexion.query('select * from usuarios where name=$1', [name])

    let payload ={subject: consulta.rows[0].id}
    let token = jwt.sign(payload, 'clave secreta')
    ;res.send({token})
    }
    catch(error){
        res.status(400).json({
            ok: false,
            message:error.message
        })
    }

}

const insertarJugador= async(req, res) =>{
    const {grupo, deporte, name, password, sexo }= req.body;
    
    
    try{
    //no name repetidos en el mismo deporte y la misma grupo
    const data = await conexion.query('select * from plantillas where name=$3 and grupo=$1 and deporte=$2 and password=$4 and sexo=$5' , [grupo, deporte, name, password, sexo])

    if(data.rows.length !=0){
        return res.status(400).json({
            error: "no tienes q registrarte de nuevo en ese deporte",
        });
    }    

    const resultado =await conexion.query('insert into plantillas values ($1, $2, $3, 1, $4, $5)', [grupo, deporte, name, password, sexo])
    const consulta =await conexion.query('select * from plantillas where name=$3 and grupo=$1 and deporte=$2 and password=$4 and sexo=$5', [grupo, deporte, name, password, sexo])

    let payload ={subject: consulta.rows[0].id}
    let token = jwt.sign(payload, 'clave secreta')
    ;
    res.send({token});

    }
    catch(error){
        res.status(400).json({
            ok: false,
            message:error.message
        })
    }


}
const insertarSolicitud= async(req, res) =>{
    const {grupo, deporte, name, password, sexo }= req.body;
    
    
    try{
    //no name repetidos en el mismo deporte y la misma grupo
    const data = await conexion.query('select * from solicitudes where name=$3 and grupo=$1 and deporte=$2 and password=$4 and sexo=$5' , [grupo, deporte, name, password, sexo])

    if(data.rows.length !=0){
        return res.status(400).json({
            error: "no tienes q mandar la solicitud de nuevo en ese deporte",
        });
    }    

    const resultado =await conexion.query('insert into solicitudes values ($1, $2, $3, 1, $4, $5)', [grupo, deporte, name, password, sexo])
    const consulta =await conexion.query('select * from solicitudes where name=$3 and grupo=$1 and deporte=$2 and password=$4 and sexo=$5', [grupo, deporte, name, password, sexo])

    let payload ={subject: consulta.rows[0].id}
    let token = jwt.sign(payload, 'clave secreta')
    ;
    res.send({token});

    }
    catch(error){
        res.status(400).json({
            ok: false,
            message:  error.message
        })
    }


}

const eliminar= async(req, res)=>{
         
    try{
    const data = await conexion.query('select * from usuarios where id=$1', [req.params.id])
    if(data.rows.length ==0){
        return res.status(404).json({
            error: "the users dont exits",
        });
    }
    
    const resultado = await conexion.query('delete from usuarios where id=$1', [req.params.id]);
    console.log(resultado);
    res.json(`users ${req.params.id} deleted `);

    }
    catch(error){
        res.status(400).json({
            ok: false,
            message:error.message
        })
    }


}

const eliminarJugador= async(req, res)=>{
    

     try{
       
         const data = await conexion.query('select * from plantillas where id=$1 and deporte=$2', [req.params.id, req.params.deporte])
         if(data.rows.length ==0){
            return res.status(404).json({
                error: "the users dont exits",
            });
        }
         
        console.log('back eliminar')
        const resultado = await conexion.query('delete from plantillas where id=$1 and deporte=$2', [req.params.id, req.params.deporte]);
        console.log(req.params.deporte);
        res.json(`users ${req.params.id} deleted `);

    }
    
    catch(error){
        res.status(400).json({
            ok: false,
            message: error.message
        })
    }

     
}
const eliminarSolicitud= async(req, res)=>{
    

    try{
      
        const data = await conexion.query('select * from solicitudes where id=$1 and deporte=$2', [req.params.id, req.params.deporte])
        if(data.rows.length ==0){
           return res.status(404).json({
               error: "the users dont exits",
           });
       }
        
       
       const resultado = await conexion.query('delete from solicitudes where id=$1 and deporte=$2', [req.params.id, req.params.deporte]);
       console.log(req.params.deporte);
       res.json(`users ${req.params.id} deleted `);

   }
   
   catch(error){
        console.log(req.params.deporte);
        res.status(400).json({
           ok: false,
           message: error.message
       })
   }

    
}



const login =async (req,res)=>{
    const {name, password}= req.body;
    
    const resultado= await conexion.query('select * from usuarios where name=$1',[name]);
    const users = resultado.rows;
    if(users.length ==0){
        return res.status(404).send("users no registered, not found");
    }
    else{
        if(password !== resultado.rows[0].password){
            
          return res.status(401).send("wrong password or username");
        }
    }
    let payload ={subject: resultado.rows[0].id}
    let token = jwt.sign(payload, 'clave secreta ')
    return res.status(200).send({token});

        
    
}

const event= async (req, res)=>{
    let eventos=[
        {
            "_id":"1",
            "name":"-",
            "descr":"sin descripcion"
        },
        {
            "_id":"2",
            "name":"-",
            "descr":"sin descripcion"
        },
        {
            "_id":"3",
            "name":"-",
            "descr":"sin descripcion"
        },
        {
            "_id":"4",
            "name":"-",
            "descr":"sin descripcion"
        },
        {
            "_id":"5",
            "name":"-",
            "descr":"sin descripcion"
        },
        {
            "_id":"6",
            "name":"-",
            "descr":"sin descripcion"
        },
        {
            "_id":"7",
            "name":"-",
            "descr":"sin descripcion"
        },
        {
            "_id":"8",
            "name":"-",
            "descr":"sin descripcion"
        },
        {
            "_id":"9",
            "name":"-",
            "descr":"sin descripcion"
        },
        {
            "_id":"10",
            "name":"-",
            "descr":"sin descripcion"
        },
        {
            "_id":"11",
            "name":"-",
            "descr":"sin descripcion"
        },
        {
            "_id":"12",
            "name":"-",
            "descr":"sin descripcion"
        }
    ];
    return res.json(eventos);
}

const tablaPlantilla= async (req, res)=>{
    //const { deporte }= req.body;
    /* 
    if(deporte==''){
        const resultado = await conexion.query('select * from plantillas');    
        
        return res.status(200).json(resultado.rows);
    }else{
        const resultado = await conexion.query('select * from plantillas where deporte =$1',[deporte] );
        

        return res.status(200).json(resultado.rows);
    } */

    try{
    const resultado = await conexion.query('select * from plantillas');    
        
    return res.status(200).json(resultado.rows);
    
    }
    catch(error){
        res.status(400).json({
            ok: false,
            message:error.message
        })
    }

}
const tablaSolicitudes= async (req, res)=>{
    //const { deporte }= req.body;
    /* 
    if(deporte==''){
        const resultado = await conexion.query('select * from plantillas');    
        
        return res.status(200).json(resultado.rows);
    }else{
        const resultado = await conexion.query('select * from plantillas where deporte =$1',[deporte] );
        

        return res.status(200).json(resultado.rows);
    } */
    //poner deporte por url
    try{
    const resultado = await conexion.query('select * from solicitudes where deporte=$1', [req.params.deporte]);   
   
        
    return res.status(200).json(resultado.rows);
    
    }
    catch(error){
        res.status(400).json({
            ok: false,
            message:error.message
        })
    }

}


const deportes= async (req, res)=>{
   // const {deporte, sexo}= req.body
    
    try{
    const resultado= await conexion.query("select * from deporte order by deporte", );
   
    return res.status(200).json(resultado.rows);

    }
    catch(error){
        res.status(400).json({
            ok: false,
            message:error.message
        })
    }


}

const capitanDeporte= async(req, res)=>{
    const {name}= req.body
    
    try{
    const resultado= await conexion.query("select deporte from deporte where capitan=$1 ", [name] );
   
    return res.status(200).json(resultado.rows);

    }
    catch(error){
        res.status(400).json({
            ok: false,
            message:error.message
        })
    }
}

const dameRol= async(req, res)=>{
    
    //poner id por url
    try{
    const resultado= await conexion.query("select rol from usuarios where id=$1 ", [req.params.id] );
    return res.status(200).json(resultado.rows);

    }
    catch(error){
        res.status(400).json({
            ok: false,
            message:error.message
        })
    }

}


module.exports ={
    login,
    obtener,
    insertar,
    eliminar,
    update,
    event,
    tablaPlantilla,
    insertarJugador,
    eliminarJugador,
    updateJugador,
    deportes,
    capitanDeporte,
    dameRol, //url id
    insertarSolicitud,
    updateSolicitud,
    eliminarSolicitud,
    tablaSolicitudes //url deporte
    
}

/* module.exports ={
    async insertar(_name, _password){
        await conexion.connect();
        let resultado= await conexion.query(`insert into usuarios 
            (name, password)
            values ($1, $2)`, [_name, _password]); 
        await conexion.end();       
        return resultado;
    },
    async obtener(){
        await conexion.connect();
        const resultado = await conexion.query('select name, password from usuarios');
        await conexion.end();
        console.log(resultado.rows)
        return res.status(200).json(resultado.rows);
    },
    async actualizar(_id, _name, _password){
        await conexion.connect();
        const resultado = conexion.query(`update usuarios set name =$1, precio =$2
        where id=$3`, [_name, _password, id]);
        await conexion.end();
        return resultado;
    },
    async eliminar(_id){
        await conexion.connect();
        const resultado =conexion.query(`delete form usuarios
        where id=$1`, [_id]);
        await conexion.end();
        return resultado;
    }
}
 */

