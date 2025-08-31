require("dotenv").config();
const express = require("express");
const cors=require("cors");
const path=require("path");

const app = express();

//Middlewares to handle cors and json data
app.use(cors({
    origin:"*",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}))

//Middleware to parse JSON bodies
app.use(express.json());

//Routes 

//Serve upload folders
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//start the sever

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=> {
    console.log(`Server is running on port ${PORT}`);
})