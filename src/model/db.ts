import mysql from "mysql"

const e=process.env

export class DbItem{
	private static pool=mysql.createPool({
		connectionLimit : e.DB_CONNECTION_LIMIT,
		host            : e.DB_HOST,
		user            : e.DB_USER,
		password        : e.DB_PASSW,
		database        : e.DB_NAME
	})

	async query(q,p){
		let myPromise=new Promise((resolve,reject)=>{
			DbItem.pool.query(q,p,(error,result)=>{
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

	public getPool(){
		return DbItem.pool
	}
}