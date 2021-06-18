import express from 'express'
import fileUpload from 'express-fileupload'
import path from "path"
import dotenv from "dotenv"
import shell from "shelljs"
import { ToadScheduler, SimpleIntervalJob, Task } from "toad-scheduler"


dotenv.config({path: './src/.env'})


//scheduler
const scheduler = new ToadScheduler()

//creating a task for the scheduler
const task = new Task('simple task', scheduledTask)
const job = new SimpleIntervalJob({ days: 1 }, task)

scheduler.addSimpleIntervalJob(job)

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


function scheduledTask(){
	//delete all pics from the last day
	let res=shell.exec(`find ${__dirname+ "/../public/files/"} -type f -mtime +1 -delete`,{silent:true, shell:"/bin/bash"})
	if(res.code != 0){
		console.error(`Scheduler failed to delete some files, return code ${res.code}, output: ${res.stdout}`)
	}else{
		console.log(`Scheduler successfully deleted the older files, output: ${res.stdout}`)
	}
}

export {app}
