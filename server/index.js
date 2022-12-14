const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require("./routes/userRoutes");
const dotenv = require('dotenv');

const app = express();

dotenv.config();

app.use(cors()); //For cors request
app.use(express.json());

//Database connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to the database Successfully");
}).catch((error) => {
    console.log(error);
});

app.use("/api/user", userRoutes);



app.listen(5000, () => {
    console.log("Server Running");
});