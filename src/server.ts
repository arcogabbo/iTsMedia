import express from 'express';
import fileUpload from 'express-fileupload';
import path from "path";
import shell from "shelljs";

var bodyParser = require('body-parser')

//routing
import home_routes from './routes/home_routes';
import img_routes from "./routes/img_routes";
const app = express();
const PORT = 8000;

//no needed atm
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(fileUpload())

//routing
app.use(home_routes);
app.use(img_routes);

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/view"));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view/'));

app.listen(PORT, () => {
 	console.log(`⚡️: Server is running at https://localhost:${PORT}`);
})

