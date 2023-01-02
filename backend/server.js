//run the app with command: node server.js.
//Open your browser with url http://localhost:8080/:

const express = require("express"); //Express is for building the Rest apis
const cors = require("cors");       //cors provides Express middleware to enable CORS
       
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

//db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Database with { force: true }');
    initial();
});

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/sclub.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.create({
        id: 1,
        name: "admin"
    });

    Role.create({
        id: 2,
        name: "student"
    });

    Role.create({
        id: 3,
        name: "chairperson"
    });
    Role.create({
        id: 4,
        name: "counselor"
    });
}