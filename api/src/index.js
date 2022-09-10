require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// A réactiver pour gestion token par cookie 
// on rend disdo la ref de app pour pouvoir l'utiliser dans notre middleware JWT
//exports.app = app;


// Setting CORS
// const cors = require('cors');
// const corsOptions = {
//   Credential:true,
//   //origin: 'http://localhost:3000',
//   origin: '*',
//   optionSucessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// app.use(cors(corsOptions));



// A réactiver pour gestion token par cookie 
//permet de positionner sur l'objet req une clé coockie (si il existe)
//app.use(cookieParser())
//a placer absolument après cookieParser, sinon on aura un pb de lecture de la clé cookies à l'interieur !
//on execute ( applique )ici la cette couche jwt.
//require('./middlewares/jwt_cookie');


app.use(express.json()) 


const router = require('./routes');
app.use(router)




if (process.env.DOCKER_ENV === 'true'){

const server = app.listen(80);

}else{

  
  const PORT = process.env.PORT || 3001;

  app.listen(PORT,()=>{
      console.log(`listening on http://localhost:${PORT}`)
  })

}

