import {app} from './app'

app.listen(process.env.PORT, () => {
 	console.log(`⚡️: Server is running at https://localhost:${process.env.PORT}`);
})