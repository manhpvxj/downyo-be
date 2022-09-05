const express = require('express');
const cors = require('cors');
const mongooseConnect = require('./config/db');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 3001;
const initWebRoutes = require("./routes/webRoute");

mongooseConnect();

app.use(cors({origin : true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

initWebRoutes(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})