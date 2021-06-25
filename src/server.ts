import {app} from './app'
import shell from "shelljs"
import { ToadScheduler, SimpleIntervalJob, Task } from "toad-scheduler"

//scheduler
const scheduler = new ToadScheduler()

//creating a task for the scheduler
const task = new Task('simple task', scheduledTask)
const job = new SimpleIntervalJob({ days: 1 }, task)

scheduler.addSimpleIntervalJob(job)

app.listen(process.env.PORT, () => {
 	console.log(`⚡️: Server is running at https://localhost:${process.env.PORT}`);
})


process.on('SIGINT',()=>{
	console.log("\nRicevuto SIGINT, chiudo lo scheduler e termino in pace...")
	//chiudo lo scheduler
	scheduler.stop()
	process.exit(0)
})


function scheduledTask(){
	let dir = shell.exec(`find ${__dirname + "/../public/files/"} -type d -mtime +1 -exec rm -rf {} +`);
	if(dir.code != 0)
		console.error(`scheduler failed to delete directories return code ${dir.code}, output: ${dir.stdout}`);
	else{
		console.log(`Scheduler successfully deleted older directories, output: ${dir.stdout}`);
	}
	//delete all pics from the last day
	let res=shell.exec(`find ${__dirname+ "/../public/files/"} -type f -mtime +1 -delete`,{silent:true, shell:"/bin/bash"})
	if(res.code != 0){
		console.error(`Scheduler failed to delete some files, return code ${res.code}, output: ${res.stdout}`)
	}else{
		console.log(`Scheduler successfully deleted the older files, output: ${res.stdout}`)
	}
}
