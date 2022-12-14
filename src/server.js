const express = require('express');
const cors = require('cors');
const mongooseConnect = require('./config/db');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 3001;
const initWebRoutes = require("./routes/webRoute");

mongooseConnect();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit:'50mb', extended: false }));

initWebRoutes(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})