import express from 'express'
import fileUpload from 'express-fileupload'
import path from "path"
import dotenv from "dotenv"

dotenv.config({path: './src/.env'})

//routing
import home_routes from './routes/home_routes';
const app = express();
var bodyParser = require('body-parser')

//no needed atm
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(fileUpload())

//routing
app.use(home_routes);

app.use(express.static(__dirname + "/../public"));
app.use(express.static(__dirname + "/view"));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view/'));

export {app}
