const app = require("./app");



const cloudinary = require("cloudinary");

const connectDatbase=require("./config/database");

//handling uncaught exception
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to handling uncaught exception`);
    process.exit(1);
});

//config
if (process.env.NODE_ENV !=="PRODUCTION"){
    require("dotenv").config({path:"backend/config/config.env"});
}


//connecting to database
connectDatbase()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  




const server = app.listen(process.env.PORT,()=>{

    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

//unhandled promise rjeection

process.on("unhandledRejection", err=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to unhandled promise rejection`);

    server.close(()=>{
        process.exit(1);
    });
});