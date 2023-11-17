const express = require("express"),
    cors = require("cors"),
    app = express(),
    PORT = process.env.PORT || 3000,
    routers = require("./routes"),
    bodyParser = require("body-parser")

    require("dotenv").config()
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(routers)
app.listen(PORT, () => console.log(`App is running at PORT ${PORT}`))


