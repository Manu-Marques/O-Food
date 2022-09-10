const { Client } = require("pg");

const env = require(`../env/${process.env.NODE_ENV}`)
const client = new Client(`postgresql://${env.DB_USER}:${env.DB_PASS}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`);



if (process.env.NODE_ENV === 'pg_conf'){

    
    client.connect()
            .then(()=>{
                console.log('connexion db postgres de dev ok ');
            })
            .catch((err)=>{
                
                console.log(err);
            })

            
 }else {
            
            client.connect()
            .then(()=>{
                console.log('connexion db prod ok ');
            })
            .catch((err)=>{
                
                console.log(err);
            })
            
 }
    
 
 
 if (process.env.NODE_ENV === 'heroku'){
     
     
         const client = new Client({
             user :`${env.DB_USER}`,
             password:`${env.DB_PASS}`,
             host:`${env.DB_HOST}`,
    database:`${env.DB_NAME}`,
    port:5432,
    ssl: {
            rejectUnauthorized: false,
    },
    });

    client.connect()
            .then(()=>{
                    console.log('connexion db distante heroku ok ');
                })
                .catch((err)=>{
        
                console.log(err);
            })


}



module.exports = client;