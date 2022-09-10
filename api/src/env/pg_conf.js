module.exports ={

        //ICI CONFIG et VARIABLES D'ENV POUR POSTGRES 
        DB_USER:`${process.env.POSTGRES_USER}`,
        DB_PASS:`${process.env.POSTGRES_PASSWORD}`,
        DB_HOST:'postgresql',
        DB_PORT:'5432',
        DB_NAME:`${process.env.POSTGRES_DB}`,
        JWT_SECRET:`${process.env.JWT_SECRET}`


}