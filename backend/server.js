const express = require ('express');
const app = express();
const dotenv = require ('dotenv');
const mongoose = require ('mongoose');
const Products = require ('./routes/router')
dotenv.config({path:'config/config.env'});
const errors = require("./middleware/errors");
const Users = require("./routes/authRouter");
const cookieParser = require("cookie-parser")


app.use(express.json())
app.use(cookieParser())
app.use('/products',Products)
app.use("/auth",Users)
app.use(errors)  

async function main(){
    await mongoose.connect(process.env.DB_LOCAL_URI)
    .then((db)=> console.log(`DB is connect to the host : ${db.connection.host}`))
}
main()

const serevr = app.listen(process.env.PORT , ()=>{
    console.log(`port listening on ${process.env.PORT }`)
})

process.on("unhandledRejection", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled rejection");
    serevr.close(()=>{
        process.exit(1);
    })
});                     

process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught Exception");
    serevr.close(()=>{
        process.exit(1);
    })
});