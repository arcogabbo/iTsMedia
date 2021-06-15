import mysql from "mysql"

const e=process.env

//create a pool of db connections
var pool=mysql.createPool({
	connectionLimit : e.DB_CONNECTION_LIMIT,
	host            : e.DB_HOST,
	user            : e.DB_USER,
	password        : e.DB_PASSW,
	database        : e.DB_NAME
})

export async function query(q,p){
	let myPromise=new Promise((resolve,reject)=>{
		pool.query(q,p,(error,result)=>{
			if(error){
				console.error("ERRORE QUERY: "+error)
				reject(false)
			}
			resolve(result)
		})
	})

	let result=await myPromise
	return result ? result:undefined
}